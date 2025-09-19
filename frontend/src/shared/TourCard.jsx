// import React from 'react'
// import '../styles/tour-card.css'
// import { Card, CardBody } from 'reactstrap'
// import { Link } from 'react-router-dom'
// import calculateAvgRating from '../utils/avgRating'
// import { priceWithDiscount } from '../utils/price'
// import { BASE_URL } from "../utils/config";


// const TourCard = ({tour}) => {
//   const toggleWishlist = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const token = localStorage.getItem("token");
//     try{
//       await fetch(`${BASE_URL}/wishlist/toggle`, {
//         method: "POST",
//         headers: { "Content-Type":"application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ tourId: tour._id })
//       });
//       // naive UI feedback
//       alert("Wishlist updated");
//     }catch(err){ console.error(err); }
//   };
//     const {_id,title,city,photo,price, featured, reviews}=tour;
// const {totalRating,avgRating} = calculateAvgRating(reviews)

//   return (
//     <div className='tour__card'>
//       <Card>
//         <div className="tour__img">
//             <img src={photo} alt="tour-img" />
//             { featured && <span>Featured</span>}
//         </div>
//         <CardBody>
//         <div className="card__top d-flex align-items-center justify-content-between">
//             <span className='tour__location d-flex align-items-center gap-1'>
//             <i className="ri-map-pin-line"></i> {city}
//             </span>
//             <span className='tour__rating d-flex align-items-center gap-1'>
//             <i className="ri-star-fill"></i>{avgRating === 0 ? null :avgRating} 
//             {totalRating === 0 ? ('Not rated'):(
//               <span>({reviews.length})</span>
//               )}
            
//             </span>
//         </div>
//         <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

//         <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
//             <h5>{priceWithDiscount(tour.price, tour.discountPercent).original ? (`${priceWithDiscount(tour.price, tour.discountPercent).final}`) : `${tour.price}`} <span>/per person</span></h5>
//             <button className="btn booking__btn">
//                 <Link to={`/tours/${_id}`}>Book Now</Link>
//             </button>
//         </div>
//       <button className="btn secondary__btn w-100 mt-2" onClick={toggleWishlist}>♥ Save</button>
// </CardBody>
//       </Card>
    
//     </div>
//   )
// }

// export default TourCard

import React, { useState, useEffect } from 'react';
import '../styles/tour-card.css';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import { priceWithDiscount } from '../utils/price';
import { BASE_URL } from "../utils/config";

const TourCard = ({ tour }) => {
  const [isSaved, setIsSaved] = useState(false);

  // ✅ Check if this tour is already in wishlist when component loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${BASE_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data?.tours?.some(t => t._id === tour._id)) {
          setIsSaved(true);
        }
      })
      .catch(err => console.error("Wishlist check error:", err));
  }, [tour._id]);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${BASE_URL}/wishlist/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ tourId: tour._id })
      });

      const data = await res.json();
      console.log("Wishlist response:", data);

      // ✅ Update local state immediately
      setIsSaved(prev => !prev);

    } catch (err) {
      console.error("Toggle wishlist error:", err);
    }
  };

  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={photo} alt="tour-img" />
          {featured && <span>Featured</span>}
        </div>
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className='tour__location d-flex align-items-center gap-1'>
              <i className="ri-map-pin-line"></i> {city}
            </span>
            <span className='tour__rating d-flex align-items-center gap-1'>
              <i className="ri-star-fill"></i>{avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? ('Not rated') : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>
          <h5 className='tour__title'><Link to={`/tours/${_id}`}>{title}</Link></h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>₹
              {priceWithDiscount(tour.price, tour.discountPercent).original
                ? (`${priceWithDiscount(tour.price, tour.discountPercent).final}`)
                : `${tour.price}`} <span>/per person</span>
            </h5>
            <button className="btn booking__btn">
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>

          {/* ✅ Button updates dynamically */}
          <button className="btn secondary__btn w-100 mt-2" onClick={toggleWishlist}>
            {isSaved ? "❤️ Saved" : "♡ Save"}
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
