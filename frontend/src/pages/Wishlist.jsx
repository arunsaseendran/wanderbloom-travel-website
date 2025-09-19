import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import { BASE_URL } from "../utils/config";
import "../styles/wishlist.css";
import { Row } from "reactstrap";

export default function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE_URL}/wishlist`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setItems(data?.tours || []);
      } catch (e) {
        console.error("Error fetching wishlist:", e);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <section className="wish">
      
      {/* <CommonSection title={"Your Wishlist"} /> */}

      <h1 align='center'>
  <br/>
<span className="gradient-text">
            Your Wishlists</span>
            </h1>
      <br/>
      <div className="container">
        <div className="row">
          {items.length === 0 && <p className="text-center mt-4">No favorites yet.</p>}
          {items.map(t => (
            <div className="col-12 col-md-6 col-lg-3 col-md-6 mb-4" key={t._id}>
              <TourCard tour={t} wishlistIds={items.map(tt => tt._id)} />
            </div>
          ))}
        </div>
      </div>
    </section>
    
  );
}
