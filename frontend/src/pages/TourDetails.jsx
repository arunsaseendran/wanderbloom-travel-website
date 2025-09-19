import React, { useEffect, useRef, useState,useContext } from 'react'
import '../styles/tour-details.css'


import { useParams } from 'react-router-dom'
import { Col, Container, Form, ListGroup, Row } from 'reactstrap'
import calculateAvgRating from '../utils/avgRating'
import avatar from '../assets/images/avatar.jpg'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/ff'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

import { AuthContext } from '../context/AuthContext'

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('')
  const[tourRating,setTourRating]=useState(null)
  const { user } = useContext(AuthContext)

  // featch data from database
  const { data:tour,loading,error } = useFetch(`${BASE_URL}/tours/${id}`)
  

  const { 
    photo, 
    title, 
    desc, 
    price,
    reviews, 
    address, 
    city, 
    distance, 
    maxGroupSize } = tour

  const { totalRating, avgRating } = calculateAvgRating(reviews)

  const options ={day:'numeric',month:'long',year:'numeric'}
  
  const submitHandler = async e =>{
    e.preventDefault()
    const reviewText = reviewMsgRef.current.value;

    try {

      if(!user || user === undefined || user === null){
        alert('Please sign in')
      }

      const reviewObj ={
        username:user?.username,
        reviewText,
        rating:tourRating
      }

      console.log("Posting review to:", `${BASE_URL}/reviews/${id}`);


      const token = localStorage.getItem("token");
      if (!token) return alert("Please sign in to review.");

      const res = await fetch(`${BASE_URL}/review/${id}`,
        {
        method:'post',
        headers:{
          'content-type':'application/json',
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials:'include',
        body:JSON.stringify(reviewObj)
      })
      // const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      // method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
      // body: JSON.stringify(reviewObj),
      // });




      const result = await res.json()
      if(!res.ok) {
        return alert(result.message)
      }
      alert(result.message)
    } catch (err) {
      alert(err.message)
    }
  };

  useEffect(()=>{
    window.scrollTo(0,0)
  },[tour])
  
  return (
    <>
      <section className='td'>
        <Container>
        {loading && <h4 className='text-center pt-5'>Loading.....</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
          {
            !loading && !error && 
            <Row>
            <Col lg="8" md="12" sm="12">
              <div className="tour__content">
                <img src={photo} alt="" />
                <div className="tour__info">
                  <h2>{title}</h2>
                  <div className="d-flex align-items-center gap-5">

                    <span className='tour__rating d-flex align-items-center gap-1'>
                      <i className="ri-star-fill" style={{ 'color': "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? ('Not rated') : (
                        <span>({reviews?.length})</span>
                      )}
                    </span>


                    <span>
                      <i className="ri-map-pin-user-fill"></i>
                      {address}
                    </span>
                  </div>
                   
                   <div className="tour__extra-details">
                    <span><i className="ri-map-pin-2-line"></i>{city}</span>
                    <span><i className="ri-money-dollar-circle-line"></i>₹{price}/per person</span>
                    <span><i className="ri-map-pin-time-line"></i>{distance} k/m</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} people </span>
                   </div>
                      <h5>Description</h5>
                      <p>{desc}</p>
                </div>


    {/* Dynamic Gallery */}
    <div className="mt-4">
      <h5>Gallery</h5>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {(tour?.images || [tour?.photo, tour?.photo, tour?.photo]).filter(Boolean).map((src, idx) => (
            <div key={idx} className={"carousel-item " + (idx===0?"active":"")}>
              <img src={src} className="d-block w-100" alt="tour" />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    {/* Map Integration */}
    <div className="mt-4">
      <h5>Map</h5>
      <div className="ratio ratio-16x9">
        <iframe
          src={`https://www.google.com/maps?q=${encodeURIComponent(city || tour?.city || "")}&output=embed`}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        ></iframe>
      </div>
    </div>
    
<div className="tour__reviews mt-4">
  <h4>Reviews ({reviews?.length} reviews)</h4>

  <Form onSubmit={submitHandler} >
    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
  <span onClick={()=> setTourRating(1)}>
    1<i className="ri-star-fill"></i>
    </span>
  <span onClick={()=> setTourRating(2)}>
    2<i className="ri-star-fill"></i>
    </span>
  <span onClick={()=> setTourRating(3)}>
    3<i className="ri-star-fill"></i>
    </span>
  <span onClick={()=> setTourRating(4)}>
    4<i className="ri-star-fill"></i>
    </span>
  <span onClick={()=> setTourRating(5)}>
    5<i className="ri-star-fill"></i>
    </span>
    </div>
    <div className="review__input">
      <input type="text" ref={reviewMsgRef} 
      placeholder='share your thoughts' 
      required/>
      <button className="btn primary__btn text-white" type='submit'>
        Submit
      </button>
    </div>
  </Form>


  <ListGroup className="user__reviews">
{
  reviews?.map(review => (
    <div className="review__item">
      <img src={avatar} alt="" />
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between">
          <div>
          <h5>{review.username}</h5>
          <p>{new Date(review.createdAt).toLocaleDateString(
            "en-US", options
          )}</p>
        </div>
        <span className='d-flex align-items-center'>
          {review.rating}
          <i className="ri-star-fill"></i>
        </span>
      </div>
      <h6>{review.reviewText}</h6>
      </div>
    </div>
  ))
}
  </ListGroup>
</div>

              </div>
            </Col>
            <Col lg="4" md="6" sm="12">
            <Booking tour={tour} avgRating={avgRating}/>
            </Col>
          </Row>
          }
        </Container>
      </section>
      {/* <Newsletter/> */}
    </>
  )
}

export default TourDetails
