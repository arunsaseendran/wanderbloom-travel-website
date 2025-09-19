import React ,{useRef,useEffect, useContext}from 'react'
import {Container, Row,Button} from 'reactstrap'
import {Link, NavLink, useNavigate} from 'react-router-dom'

import logo from '../../assets/images/logo.png'
import './header.css'
import{AuthContext} from './../../context/AuthContext'

const Header = () => {
  const headerRef = useRef(null)
  const navigate = useNavigate()
  const {user,dispatch}= useContext(AuthContext)

  const logout =()=>{
    dispatch({type:'LOGOUT'})
    navigate('/')
  }
  
  const stickyHeaderFunc =()=>{
    window.addEventListener('scroll',()=>{
      if(document.body.scrollTop >80 || document.documentElement.scrollTop >80){
        headerRef.current.classList.add('sticky__header')
      }else{
        headerRef.current.classList.remove('sticky__header')
      }
    })
  }

useEffect(()=>{
  stickyHeaderFunc();

  return window.removeEventListener('scroll',stickyHeaderFunc)
})
const nav__links=[
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
  {
    path:'/wishlist',
    display:'Wishlist'
  },
  {
    path:'/manage-bookings',
    display:'My Bookings'
  },
  ...(!user ? [
    { path:'/login', display:'Login' },
    { path:'/register', display:'Register' }
  ] : [])
];
  return (
    <div className="headstyle">
    <header className="header" ref={headerRef}>
<Container>
  <Row>
    <div className="nav__wrapper d-flex align-items-center justify-content-between">
      {/* =====logo===== */}
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      {/* =====logo end ===== */}
      {/* =====menu===== */}
      <div className="navigation">
      <ul className="menu d-flex align-items-center gap-4">
    {nav__links.map((item,index)=>(
      <li className="nav__item" key={index}>
        <NavLink 
        to ={item.path}
         className={navClass =>
           navClass.isActive ? 'active__link':''}>
        {item.display}</NavLink>
      </li>
    ))}
</ul>
      </div>
      {/* ===end=== */}



  <div className="nav__right d-flex align-items-center gap-4">
  {user && (
    <div className='nav__btns d-flex align-items-center gap-2'>
      <i className="ri-user-line"></i>
    <div className="nav__btns d-flex align-items-center gap-4">
      
      <h5 className='mb-0'>{user.username}</h5>
      <Button className="btn btn-dark" onClick={logout}>Logout</Button>
    </div>
    </div>
  )}
  <span className="mobile__menu">
    <i className="ri-menu-line"></i>
  </span>
</div>


    </div>
  </Row>
</Container>
    </header>
    </div>
  )
}

export default Header
