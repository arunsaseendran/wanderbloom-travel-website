import React from "react";
import { Container, Row, Col } from "reactstrap";
import aboutImg from "../assets/images/about.jpg"; // <- replace with your own image
import "../styles/about.css";

import '../styles/home.css'
import worldImg from '../assets/images/world.png'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from '../shared/Subtitle'
import SearchBar from '../shared/SearchBar'
const About = () => {
  return (
    <>
    <div className="about">
      <Container>
      <Row>
        <Col lg="6" md="6" sm="12">
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-items-center">
            <Subtitle subtitle={'Know Before You Go'}/>
            <img src={worldImg} alt="" />
          </div>
          <h1>About Us <span className="gradient-text">
            Wanderbloom</span></h1>
            <p>🌍 we believe travel is more than just a trip –
                it’s about creating unforgettable experiences. Our mission is to make travel 
                planning simple, affordable, and enjoyable for everyone.</p>
                <h5>Why Choose Us?</h5>
              <ul className="about__list">
                <li> Easy & Secure Booking</li>
                <li> Affordable Packages</li>
                <li> Verified Tour Guides</li>
                <li> 24/7 Customer Support</li>
                <li> Personalized Recommendations</li>
              </ul>
        </div>
        </Col>
        <Col lg="2" md="4" sm="12">
        <div className="hero__img-box">
          <img src={heroImg} alt="" />
        </div>
        </Col>
        <Col lg="2" md="4" sm="12">
        <div className="hero__img-box mt-4">
          <video src={heroVideo} alt="" controls/>
        </div>
        </Col>
        <Col lg="2" md="4" sm="12">
        <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="" />
        </div>
        </Col>
        </Row>
    </Container>


    </div>
  </>)
}

export default About
