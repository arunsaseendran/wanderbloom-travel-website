import React from 'react'
import ServiceCard from './ServiceCard'
import { Col } from 'reactstrap'

import weatherImg from '../assets/images/weather.png'
import guideImg from '../assets/images/guide.png'
import customizationImg from '../assets/images/customization.png'

const servicesData =[
    {
        imgUrl :weatherImg,
        title : 'Calculate Weather',
        desc: 'Get real-time weather updates for your destination so you can plan your trip without surprises.',
    },
    {
        imgUrl :guideImg,
        title : 'Best Tour Guide',
        desc : 'Explore every place with expert guidance, ensuring you don’t miss out on hidden gems and local experiences.',
    },
    {
        imgUrl :customizationImg,
        title : 'Customization',
        desc : 'Personalize your travel plans — from tours to activities — to make your journey truly yours.',
    },
]
const ServiceList = () => {
  return (
    <>
     {
        servicesData.map((item, index) => (
        <Col lg="3" md="6" sm="12" key={index}>
            <ServiceCard item={item}/>
        </Col>
    ))
     } 
    </>
  )
}

export default ServiceList
