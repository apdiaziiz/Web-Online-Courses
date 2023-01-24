import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Courses from './Components/Courses/Courses';
import Users from './Components/Users/Users';
import Error from './Components/Error/Error';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register'
import About from './Components/About/About';
import Dashboard from './Components/Dashboard/Dashboard';
import EditCourse from './Components/NewCourse/NewCourse';
import NewCourse from './Components/NewCourse/NewCourse';
import { useState, useEffect } from 'react';
import axios from 'axios';

const USER_URI = '/api/users/display'

function App() {
  const [targetUser, setTargetUser] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get(USER_URI)
      const data = await response.data
      console.log(data)
      setTargetUser(data.users)
    }
    getUsers()

    const getCoures = async () => {
      const response = await axios.get(`http://localhost:5000/api/courses`)
      const data = await response.data
      setCourses(data.info)
    }
    getCoures()
  },[])
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home targetUser={targetUser} courses={courses}/>} />
        <Route path='/courses' element={<Courses targetUser={targetUser}/>} />
        <Route path='/users' element={<Users />} />
        <Route path='/about' element={<About />} />
        <Route path='/newCourse/:id' element={<NewCourse targetUser={targetUser} />} />
        <Route path='/editCourse/:id' element={<EditCourse />} />
        <Route path='/register' element={<Register targetUser={targetUser} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/:id' element={<Dashboard />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    
  )
}

export default App;
