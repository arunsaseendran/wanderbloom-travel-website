import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Tours from '../pages/Tours'
import TourDetails from '../pages/TourDetails'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SearchResultList from '../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import About from '../pages/About'

import Wishlist from '../pages/Wishlist'
import Payment from '../pages/Payment'
import PaymentResult from '../pages/PaymentResult'
import ManageBookings from '../pages/ManageBookings'
import AdminRequests from '../pages/AdminRequests'
import MasonryImagesGallery from '../components/image-gallery/MasonryImagesGallery'


const Routers = () => {
  return (
    <div>
     <Routes>
        <Route path='/' element={<Navigate to='/home'/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/tours' element={<Tours/>}/>
        <Route path='/tours/:id' element={<TourDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/thank-you' element={<ThankYou/>}/>
        <Route path='/tours/search' element={<SearchResultList/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/gallery' element={<Home/>}/>
        <Route path='/payment-result' element={<PaymentResult/>}/>
        <Route path='/manage-bookings' element={<ManageBookings/>}/>
        <Route path='/admin/requests' element={<AdminRequests/>}/>
        
     </Routes>
    </div>
  )
}

export default Routers
