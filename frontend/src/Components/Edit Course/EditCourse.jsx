import './NewCourseStyle/NewCourse.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaForward } from 'react-icons/fa'

const URI = 'http://localhost:3000/api/courses'
const NewCourse = () => {
  const params = useParams()
  // const [courseId, setCourseId] = useState('')
  const [courseTitle, setCourseTitle] = useState('')
  const [teacher, setCourseTeacher] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [sell, setSell] = useState('')
  const [desc, setCourseDesc] = useState('')
  const [courses, setCourses] = useState([])

  let user = params.id
  
  useEffect(() => {
    const mtachingCourse = async () => {
      const response = await axios('/api/courses')
      .then(info => info.data.info)
      const matchedById = await response.find(one => one.user === params.id)
      setCourses(matchedById)
    }
    mtachingCourse()
  },[])
//   const matching = 
  const editCourse = async e => {
    e.preventDefault()
    try {
    
      // update course
      axios.put(URI,{sell, desc, teacher, coverImage, courseTitle, user})
      .then(posted => console.log(posted))
      .catch(error => console.log(error))
      
    } catch (error) {
      console.error(error)
    }
  }
    return (
        <section className='register-form'>
          <div className="form-content">
            <div className="form-title">Edit Course</div>
            <Link to={`/dashboard/${params.id}`} 
            className='btn btn-back'>
              <FaForward />
            </Link>
            <form action="" onSubmit={editCourse}>
              <div className="flex">
    
                <div className="form-control">
                  <label>User ID</label>
                  <input type="text" 
                  value={params.id}
                   name="user" id="user" 
                   placeholder='enter you id'/>
                </div>
                <div className="form-control">
                  <label>Course Title</label>
                  <input type="text" 
                  name="title" id="title" 
                  value={courses.courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)} 
                  placeholder='enter you course title'/>
                </div>
              </div>
              <div className="flex">
                <div className="form-control">
                  <label>Cover Image</label>
                  <input type="text" 
                  name="image" id="image" 
                  value={courses.coverImage}
                  onChange={(e) => setCoverImage(e.target.value)} 
                  placeholder='enter your cover image course'/>
                </div>
    
                <div className="form-control">
                  <label>Course Teacher</label>
                  <input type="text" 
                  name="teacher" id="teacher" 
                  value={courses.teacher}
                  onChange={(e) => setCourseTeacher(e.target.value)} 
                  placeholder="enter teacher's name"/>
                </div>
              </div>
              <div className="flex">
                <div className="form-control">
                  <label>Description</label>
                  <input type="text"
                  name="desc" id="desc" 
                  value={courses.desc}
                  onChange={(e) => setCourseDesc(e.target.value)} 
                  placeholder='enter course description'/>
                </div>
    
                <div className="form-control">
                  <label>Course Fee</label>
                  <input type="text"
                  name="fee" id="fee" 
                  value={courses.sell}
                  onChange={(e) => setSell(e.target.value)} 
                  placeholder='enter course fee'/>
                </div>
              </div>
                <div className="form-control">
                  <Link to={``}
                  type="submit"
                  onClick={editCourse}
                  className='btn btn-register'>
                  Submit</Link>
                </div>
            </form>
          </div>
        </section>
      )
}

export default NewCourse