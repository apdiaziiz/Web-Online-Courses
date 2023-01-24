import './CoursesStyle/Course.style.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Header/Header'

const Courses = ({targetUser}) => {
  const [courses, setCourses] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios(`http://localhost:5000/api/courses`)
    .then(response => response.data)
    .then(json => setCourses(json.info))
  },[])

  useEffect(() => {
    axios(`http://localhost:5000/api/courses&${filter}`)
    .then(response => response.data)
    .then(json => setCourses(json.info))
  },[])
  
  return (
    <>
    <Header />
    <div className='course_section'>
      <div className="course">
        <div className="filter">
          <div className="title">Our Courses</div>
          <input type="text"
          onChange={(e) => setFilter(e.target.value)} 
          placeholder='filter course' />
        </div>
        <div className="course_content">
          {courses && courses.map((course, i) =>{
            //const base64String = btoa(String.fromCharCode(...new Uint8Array(course.bgImage.data.data)));
            const userImg = targetUser.find(user => user._id === course.user)
            return (
            <div className="box" key={i}>
              <div className="image_box">
                <img src={course.coverImage} alt="" />
              </div>
              <div className="box_content">
                <div className="course-title">
                  <div className="tit">
                    {course.courseTitle.length < 15 ? 
                    course.courseTitle : 
                    course.courseTitle.substring(0,15)+'...'}</div>
                  <div className="fees">${`${course.sell}`}</div>
                </div>
                <div className="user_flex">
                  <img src={userImg && userImg.profile} alt="" />
                  <p>{course.teacher}</p>
                </div>
              </div>
            </div>
)})}
            
          </div>
        </div>
      </div>
    </>
)}

export default Courses