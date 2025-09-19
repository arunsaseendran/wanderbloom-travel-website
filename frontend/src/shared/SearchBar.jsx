import React, { useRef, useState } from "react";
import "../styles/search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

// 🔹 Import JSON directly
import toursData from "../assets/data/tours.json";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(null);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const [locationInput, setLocationInput] = useState("");
  const [locationInput1, setLocationInput1] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocationInput(value);
    setLocationInput1(value);

    if (value.length > 0) {
      // filter tours by title
      const filtered = toursData.filter((tour) =>
        tour.title.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (tour) => {
    setLocationInput(tour.city);
    setLocationInput1(tour.title);
    setSuggestions([]);

    // 🔹 Auto-fill distance
    if (distanceRef.current) {
      distanceRef.current.value = tour.distance;
    }

    if (maxGroupSizeRef.current) {
      maxGroupSizeRef.current.value = 1;
    }

  };

  const searchHandler = async () => {
    const location = locationInput;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("Please fill all fields");
    }

    try {
      const res = await fetch(
        `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
      );

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      const result = await res.json();

      navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        { state: result.data }
      );
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data");
    }
  };

  return (
    <Col lg="12" md="12" sm="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          {/* Location */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div style={{ position: "relative" }}>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Search by title..."
                value={locationInput1}
                onChange={handleLocationChange}
                ref={locationRef}
                autoComplete="off"
              />

              {/* Suggestions dropdown */}
              {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((tour, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSuggestionClick(tour)}
                      className="suggestion-item"
                    >
                      {tour.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormGroup>

          {/* Distance */}
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
              />
            </div>
          </FormGroup>

          {/* Max People */}
          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          {/* Search button */}
          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
