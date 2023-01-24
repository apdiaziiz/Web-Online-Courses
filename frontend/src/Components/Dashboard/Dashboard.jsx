import './Dashboardstyle/Dashboard.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../Header/Header'

import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
  
  
  const Dashboard = (props) => {
    let history = useNavigate()
    const params = useParams()
    const muiCache = createCache({
    key : "mui-datatables",
    prepend : true
  })

  const [responsive, setResponsive] = useState('vertical')
  const [tblBodyHeight, setTblBodyHeight] = useState('400px')
  const [tblBodyMxHeight, setTblBodyMxHeight] = useState('')
  const [searchBtn, setSearchBtn] = useState('')
  const [printBtn, setPrintBtn] = useState('')
  const [downloadBtn, setDownloadBtn] = useState('')
  const [viewBtn, setViewBtn] = useState('')
  // const [filterBtn, setFilterBtn] = useState('')
  const [active, setActive] = useState(false)
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])

  const column = [
    {name : "Course Title", options: {filterOptions : {fulwidth : true}}},
    "Course Teacher",
    "Posted Time",
    "Course Description"
  ]

  const options = {
    search : searchBtn,
    print : printBtn,
    download : downloadBtn,
    // filter : filterBtn,
    view : viewBtn,
    filterType : 'dropdown',
    tblBodyHeight,
    tblBodyMxHeight,
    responsive,
    onTableChange(action, state) {
      
    }
  }

  useEffect(() => {
    axios('/api/courses')
    .then(response => response.data)
    .then(data => setCourses(data.info))
  },[])

  useEffect(() => {
    axios('/api/users/display')
    .then(response => response.data)
    .then(data => setUsers(data.users))

  },[])
  
  const userImg = users.find(course => course._id === params.id)
    

  return (
    <>
    
    <Header />
    <div className="dash_section">
        <div className="slide_dash">
            <div className="dash_content">
              <div className="great">
                <img src={userImg && userImg.profile} alt="profile" />
              </div>
                <ul>
                  
                    <Link onClick={() => setActive(true)} className="link">All Courses</Link>
                    <Link to={`/newCourse/${params.id}`} className="link">Add Course</Link>
                    <Link to={`/editCourse/${params.id}`} className="link">Edit Course</Link>
                    <Link to={`/newCourse/${params.id}`} className="link">Remove Course</Link>
                    
                </ul>
            </div>
        </div>
        <div className="dash_body">
            <div className="dash title">Dashboard</div>
            <a href='/login' className='btn btn-logout'>Logout</a>
            <div className="dash_body_content">
                <CacheProvider value={muiCache}>
                  <ThemeProvider theme={createTheme()}>
                    <MUIDataTable 
                      title={"Courses"}
                      data={
                        courses.filter(course => {
                          return course.user === params.id;
                      }).map(mpCourse => (
                        [mpCourse.courseTitle,
                          mpCourse.teacher,
                          mpCourse.postedTime,
                          mpCourse.desc
                        ]
                      ))}
                      columns={column}
                      options={options}
                    />
                  </ThemeProvider>

                </CacheProvider>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard