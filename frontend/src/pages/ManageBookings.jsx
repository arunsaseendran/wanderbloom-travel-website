import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonSection from "../shared/CommonSection";        
import { BASE_URL } from "../utils/config";                 
import "../styles/manage-bookings.css";                     

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not authorized. Please login again.");
          return;
        }

        const res = await fetch(`${BASE_URL}/booking`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const bookingsData = data.data || data.bookings || data;
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please login again.");
        setBookings([]);
      }
    };

    fetchBookings();
  }, []);

  return (
    <section className="mb">
      {/* Consistent page header */}
      {/* <CommonSection title="My Bookings" /> */}

      <h1 align='center'>
  
<span className="gradient-text">
            my Bookings</span>
            <br/>
            </h1>

      <div className="container manage-bookings">
        {/* Error */}
        {error && <p className="mb-4 error-text">{error}</p>}

        {/* Empty state */}
        {!error && bookings.length === 0 && (
          <div className="empty-state">
            <h4>No bookings found</h4>
            <p>Looks a bit empty here. Ready to plan your next getaway?</p>
            <Link to="/tours" className="primary__btn explore-btn">
              Explore Tours
            </Link>
          </div>
        )}

        {/* Booking cards */}
        <div className="booking-grid">
          {(bookings || []).map((b) => {
            const when = b.bookAt || b.createdAt;
            const dateText = when ? new Date(when).toLocaleDateString() : "—";

            return (
              <article className="booking-card" key={b._id}>
                <div className="booking-card__header">
                  <h3 className="booking-title">{b.tourName}</h3>
                  {/* optional status badge if you add one later */}
                </div>

                <div className="booking-meta">
                  <div className="meta-row">
                    <svg
                      className="icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{dateText}</span>
                  </div>

                  {b.fullName && (
                    <div className="meta-row">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20 21a8 8 0 1 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span>{b.fullName}</span>
                    </div>
                  )}

                  {b.guestSize != null && (
                    <div className="meta-row">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      <span>{b.guestSize} guest{b.guestSize === 1 ? "" : "s"}</span>
                    </div>
                  )}
                </div>

                <div className="booking-actions">
                  <Link to="/tours" className="secondary__btn">
                    Book Another
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ManageBookings;
