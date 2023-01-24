import './ShowCaseStyle/ShowCase.style.css'
import { Link } from "react-router-dom"
import sideImg from '../Sources/undraw_developer_activity_re_39tg.svg'
import { FaArrowDown, FaUserAlt, FaBars, FaSignInAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import img from '../Sources/Software_engineer.png'

const ShowCase = () => {
  const [sliceCourse, setSliceCourse] = useState([])
  useEffect(() => {
    const getCoures = async () => {
      const response = await axios.get(`http://localhost:5000/api/courses`)
      const data = await response.data
      setSliceCourse(data.info.slice(0,3))
    }
    getCoures()
  },[])
  return (
    <>
    <div className='show_case'>
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
      <div className="show_contents">
        <div className="left-sec">
          <h2 className='showcase-title'>Online Technology Courses</h2>
          <p className='lead'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus facilis fuga quis eveniet sapiente, nulla voluptatum ipsam ipsa quia id deserunt sint, tempora esse aut incidunt enim, iste sed. Dolorum?</p>
          <div className="flex">
            <Link to='/register' 
                className='btn btn-login'>
              <FaUserAlt />  Register </Link>

            <Link to='/register' 
                className='btn btn-login'>
              <FaArrowDown />  Download </Link>
          </div>
        </div>
        <div className="right-sec">
          <img src={sideImg} alt="" />
        </div>
      </div>
    </div>

    {/* course section */}

    <div className='course_section'>
      <div className="course">
        <div className="title">Our Courses</div>
        <div className="course_content">
          {sliceCourse && sliceCourse.map((course, i) =>{
            //const base64String = btoa(String.fromCharCode(...new Uint8Array(course.bgImage.data.data)));
            
            return (
            <div className="box" key={i}>
              <div className="image_box">
                <img src={course.coverImage} alt="" />
              </div>
              <div className="box_content">
                <div className="course-title">
                  <div className="tit">{course.courseTitle}</div>
                  <div className="fees">${`${course.sell}`}</div>
                </div>
                <div className="user_flex">
                  <img src='' alt="" />
                  <p>{course.teacher}</p>
                </div>
              </div>
            </div>
)})}
            
          </div>
        </div>
      </div>

      {/* about section */}

      <div className='about_section'>
        <div className="about_content">
            <h2 className="title">ABOUT <span className="content_color">US</span></h2>
            <div className="contents">
                <div className="right_content">
                    <h3 className="about_title">Read More 
                    <span className='content_color'> Our Contents</span></h3>
                    <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe possimus iste nostrum! Unde cupiditate doloribus vel deleniti tempora iusto? Repellat illo consequuntur assumenda reprehenderit porro consequatur corrupti, eius ab libero unde? Et doloremque facilis blanditiis quibusdam placeat animi perspiciatis, maiores consequatur hic accusamus, neque eveniet, cupiditate pariatur molestiae ad rem incidunt assumenda libero veniam consequuntur cumque! Nobis, culpa eaque!
                    </p>
                    <div className="flex">
                        <Link to='/register' 
                            className='btn btn-login'>
                        Read More... </Link>

                    </div>
                </div>
                <div className="left_content">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShowCase