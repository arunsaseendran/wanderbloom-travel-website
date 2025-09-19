import React from 'react'
import '../styles/home.css'
import { Container,Row,Col } from 'reactstrap'
import worldImg from '../assets/images/world.png'
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg02 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import experienceImg from '../assets/images/experience.png'
import Subtitle from '../shared/Subtitle'
import SearchBar from '../shared/SearchBar'
import ServiceList from '../services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'
import Newsletter from '../shared/ff'

const Home = () => {
  return (
    <>
    <div className="st">
    <Container>
      <Row>
        <Col  lg="6" md="6" sm="12">
        <div className="hero__content">
          <div className="hero__subtitle d-flex align-items-center">
            <Subtitle subtitle={'Know Before You Go'}/>
            <img src={worldImg} alt="" />
          </div>
          <h1>Traveling opens the door to creating <span className="gradient-text">
            memories</span></h1>
            <p>🌍 From breathtaking mountains to vibrant cities, every journey tells a story. Discover new destinations, plan your adventures with ease, and create memories that will last a lifetime. Your next great experience starts here!</p>
        </div>
        </Col>
        <Col lg="2" md="6" sm="12">
        <div className="hero__img-box">
          <img src={heroImg} alt="" />
        </div>
        </Col>
        <Col lg="2" md="6" sm="12">
        <div className="hero__img-box mt-4">
          <video src={heroVideo} alt="" controls/>
        </div>
        </Col>
        <Col lg="2" md="6" sm="12">
        <div className="hero__img-box mt-5">
          <img src={heroImg02} alt="" />
        </div>
        </Col>
        <SearchBar/>
      </Row>
    </Container>

    <section>
      <Container>
        <Row>
          <Col lg="12" md="12" sm="12" className="mb-5">
          <Subtitle subtitle={'Explore'}/>
          <h2 className="featured__tour-title">Our featured tours</h2>
          </Col>
          <FeaturedTourList/>
        </Row>
      </Container>
    </section>


    <section>
      <Container>
        <Row>
          <Col lg="3" md="6" sm="12">
          <h5 className="services__subtitle">What we serve</h5>
          <h2 className='services__title'>We offer our best services</h2>
          </Col>
          <ServiceList/>
        </Row>
      </Container>
    </section>


    <section>
      <Container>
        <Row>
          <Col lg="9" md="12" sm="12">
          <div className="experience__countent">
          <Subtitle subtitle={'Experience'}/> 
        <h2 >With our all experience <br/> we will serve you </h2>
        <p>
  With years of expertise in the travel industry, we have helped thousands 
  of explorers create unforgettable journeys. From scenic getaways to 
  adventurous tours, our team is dedicated to making every trip smooth, 
  safe, and memorable.
</p>
<p>
  We believe that traveling is not just about reaching a destination, 
  but about experiencing the journey with comfort, trust, and care.
</p>
           <div className="counter__wrapper d-flex align-items-center gap-5">
            <div className="counter__box">
              <span>12K+</span>
              <h6>Successful trip</h6>
            </div>
            <div className="counter__box">
              <span>2K+</span>
              <h6>Regular clients</h6>
            </div>
            <div className="counter__box">
              <span>15</span>
              <h6>Years experience</h6>
            </div>
           </div>
          </div>
          </Col>
          <Col lg="3" md="6" sm="12">
        <div className="experience__img">
          {/* <img src={experienceImg} alt="" /> */}
        </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section>
      <Container>
        <Row>
          <Col lg="12" md="12" sm="12">
          <Subtitle subtitle={"Gallery"}/>
          <h2 className="gallery__title">Visit our customers tour gallery</h2>
          </Col>
          <Col lg="12" md="12" sm="12">
          <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg="12" md="12" sm="12">
          <Subtitle subtitle={'Fans Love'}/>
          <h2 className="testimonial__title">What our fans say about us</h2>
          </Col>
          <Col lg="12" md="12" sm="12">
          <Testimonials/>
          </Col>
        </Row>
      </Container>
    </section>
    {/* <Newsletter/> */}
    </div>
    </>
  )
}

export default Home
