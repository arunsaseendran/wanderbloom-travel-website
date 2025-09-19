import React from 'react'
import './footer.css'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'

import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png' ;

const quick__links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/tours',
    display:'Tours'
  },

];
const quick__links2=[
  {
    path:'/gallery',
    display:'Gallery'
  },
  {
    path:'/login',
    display:'Login'
  },
  {
    path:'/register',
    display:'Register'
  },

];

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <div className="ghy">
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="6" sm="12">
          <div className="logo">
          <img src={logo} alt="" />
          <p>Wanderbloom is your trusted partner in exploring the globe. From breathtaking tours to personalized travel experiences, we bring you closer to the destinations you love. Safe, affordable, and unforgettable journeys await you!</p>
          </div>
          <div className="social__links d-flex align-items-center gap-4">
          <span>
            <Link tp='#'><i className="ri-youtube-line"></i></Link>
          </span>
          <span>
            <Link tp='#'><i className="ri-github-fill"></i></Link>
          </span>
          <span>
            <Link tp='#'><i className="ri-facebook-circle-line"></i></Link>
          </span>
          <span>
            <a href="https://www.instagram.com/"><i className="ri-instagram-line"></i></a>
          </span>
          </div>
          </Col>
          <Col lg="3" md="6" sm="12">
          <h5 className="footer__link-title">Discover</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0' 
                  
                  // style={{background:"linear-gradient(90deg, #FFF4F3, #F7F5FE)"}} 
                  >
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>

          </Col>
          <Col lg="3" md="6" sm="12">
            <h5 className="footer__link-title">Quick Links</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'

                  // style={{background:"linear-gradient(90deg, #FFF4F3, #F7F5FE)"}}
                  >
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg="3" md="6" sm="12">
          <h5 className="footer__link-title">Contact</h5>

<ListGroup className='footer__quick-links'>

      <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3' 
      
      // style={{background:"linear-gradient(90deg, #FFF4F3, #F7F5FE)"}}
      >
    <h6 className='mb-0 d-flex align-items-center gap-2'>
      <span><i className="ri-map-pin-line" ></i></span>
      Address:
    </h6>
    <p className='mb-0'>Calicut , Kerala</p>
      </ListGroupItem>
  
      <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'
      // style={{background:"linear-gradient(90deg, #FFF4F3, #F7F5FE)"}}
      >
    <h6 className='mb-0 d-flex align-items-center gap-2'>
      <span><i className="ri-mail-line"></i></span>
      Email:
    </h6>
    <p className='mb-0'>travelworld@gmail.com</p>
      </ListGroupItem>
      <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'
      // style={{background:"linear-gradient(90deg, #FFF4F3, #F7F5FE)"}}
      >
    <h6 className='mb-0 d-flex align-items-center gap-2'>
      <span><i className="ri-phone-fill"></i></span>
      Phone:
    </h6>
    <p className='mb-0'>+919876543210</p>
      </ListGroupItem>
</ListGroup>
          </Col>
          <Col lg="12" md="12" sm="12" className='text-center pt-5'>
          <p className='copyright'>
             Design and developed by Arun </p>
          </Col>
        </Row>
      </Container>
    </footer>
    </div>
  )
}

export default Footer
