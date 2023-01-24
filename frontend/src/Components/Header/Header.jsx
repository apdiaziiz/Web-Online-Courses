import { useState } from 'react';
import '../Header/HeaderStyle/Header.Style.css';
import { FaSignInAlt, FaUserAlt, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {

  return (
    <header>
      <div className="header">
        <div className="brand">T-Courses</div>
        <div className="navbar">
          <ul className='nav_menu'>
            <Link to='/' className='active link'>Home</Link>
            <Link to='/courses' className='link'>Courses</Link>
            <Link to='/about' className='link'>About</Link>
            <Link to='/contact' className='link'>Contact Us</Link>
            <div className="buttons">

              <Link to='/register' 
                className='btn btn-sign'>
                <FaUserAlt /> Sign Up</Link>

              <Link to='/login'
                 className='btn btn-login'>
                <FaSignInAlt /> Login</Link>
            </div>
          </ul>
          <FaBars className='FaBars'/>
          
          {/* <FaTimes onClick={showNavbar} className='FaBars'/> */}
        </div>
      </div>
    </header>
  )
}

export default Header