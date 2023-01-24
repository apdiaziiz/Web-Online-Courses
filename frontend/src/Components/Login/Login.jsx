import './LoginStyle/Login.Style.css'
import { Link, useNavigate } from 'react-router-dom'
import {FaSignInAlt, FaForward} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URI = '/api/users/display'

const Login = ({targetUser}) => {
  // const params = useParams()
  let history = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState({
    msg : [],
    active : false
  })

// fetch the users from the mongodb
  useEffect(() => {
    axios(URI).then(response => response.data)
    .then(data => setUsers(data.users))
  },[])
  
  // find and compare input password and user password in database
  const userEmail = users.find(user => user.email.toLowerCase() === email.toLowerCase())
  const userPass = users.find(user => user.password.toLowerCase() === password.toLowerCase())

  // user login
  const onLogin = async e => {
    e.preventDefault()
    // check fields if empty
    if (email === '' || password === '') {
      setErrors({msg : 'Please add all fields', active : true})
      setTimeout(() => {
        setErrors({active : false})
      }, 2000);
    // check invalid user and password
    } else if (!userEmail && !userEmail.password !== password){
      setErrors({msg : 'Invalid user and password', active : true})
      setTimeout(() => {
        setErrors({active : false})
      }, 2000);
    // if user and password are valid, then next page
    } else if (userEmail) {
      console.log(1)
      history(`/dashboard/${userEmail._id}`) 
    
    }
  }


  return (
    <section className='login-form'>
      <div className="form-content">
      <Link to={'/'} 
            className='btn btn-back'>
              <FaForward />
            </Link>
        <div className="form-title"><FaSignInAlt /> Login Your Account</div>
          <div className="error-msg" style={errors.active ? {display : 'block'} : {display : 'none'}}>
            {errors.active &&  errors.msg}
          </div>
          <form onSubmit={onLogin}>
            <div className="form-control">
              <label>Email</label>
              <input type="text" 
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              id="email" placeholder='Enter you email'/>
            </div>
            <div className="form-control">
              <label>Password</label>
              <input type="password" 
              onChange={(e) => setPassword(e.target.value.toLowerCase())} 
              id="password" 
              placeholder='Enter you password'/>
            </div>
            <div className="form-control">
              <Link to='' 
                onClick={onLogin}
                className='btn btn-login'>
              Login</Link>
              <p>If you have'nt account please,
              <a href="/register" className='back-reg'> Register now</a>
              </p>
        
            </div>
        </form>
      </div>
    </section>
  )
}

export default Login