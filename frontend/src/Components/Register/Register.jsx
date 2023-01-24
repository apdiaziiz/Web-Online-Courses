// import { FaRoad } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import './RegisterStyle/Register.style.css'
import axios from 'axios'

const USER_URI = '/api/users/register'

const Register = ({targetUser}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [description, setDescription] = useState('');
  const [profile, setProfile] = useState('');

  const [isTrue, setIsTrue] = useState(false);
  const [errors, setErrors] = useState({
    msg : [],
    active : false,
    colors : ''
  });
  const [success, setSuccess] = useState({
    msg : [],
    active : false,
    colors : ''
  });
  const history = useNavigate()
  const userEmail = targetUser.find(user => user.email.toLowerCase() === email.toLowerCase())
  
  // create new user

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(userEmail)
    try {
      // check input field if empty
      if(userEmail) {
        setSuccess({active : false})
        setErrors({active : true, msg : 'User already exist!'})
        setTimeout(()=> {
          setErrors({msg : '', active : false})
        }, 2000)
      } else if(username == '' || !email || !password || !password2 || !description) {
        setSuccess({active : false})
        setErrors({active : true, msg : 'Please add all fields'})
        setTimeout(()=> {
          setErrors({msg : '', active : false})
        }, 2000)
      // check password lenght
      }else if(password.length <= 5) {
        setSuccess({active : false})
        setErrors({ active: true, msg : 'Password must be greater tha 5'} )
        setTimeout(()=> {
          setErrors({msg : '', active : false})
        }, 2000)
      // check matching passwords
      }else if(password !== password2) {
        setSuccess({active : false})
        setErrors({ active: true, msg : 'Passwords not matched'} )
        setTimeout(()=> {
          setErrors({msg : '', active : false})
        }, 2000)
      // then create user
      } else {
        setErrors({active : false})
        await axios.post(USER_URI, {
          username, 
          email, 
          password,
          password2,
          description,
          profile
        })
        .then(() => setSuccess({ active: true, msg : 'User register successfully.'} ))
        .then(() => setTimeout(()=> {
          setErrors({msg : '', active : false})
        }, 2000))
        .then(() => history('/login'))
        .catch(err => console.log(err))
      }
    
    } catch(error) {
      console.error(error)
    }
  }

  
  return (
    <section className='register-form'>
      <div className="form-content">
        <div className="form-title">Create new account</div>
        <div className="sec-err">
          <div className="error-msg" style={errors.active ? {display : 'block', backgroundColor : errors.colors} : {display : 'none'}}>
            {errors.active &&  errors.msg}</div>
          <div className="success-msg" style={success.active ? {display : 'block', backgroundColor : success.colors} : {display : 'none'}}>
            {success.active &&  success.msg}</div>
        </div>
        <form action="" onSubmit={onSubmit} encType="multipart/form-data">
          <div className="flex">
            <div className="form-control">
              <label>Name</label>
              <input type="text" 
               onChange={(e) => setUsername(e.target.value)} 
               name="name" id="name" 
               placeholder='Enter your name'/>
            </div>
            <div className="form-control">
              <label>Email</label>
              <input type="text" 
              name="email" id="email" 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder='Enter your email'/>
            </div>
          </div>
          <div className="flex">
            <div className="form-control">
              <label>Password</label>
              <input type="password" 
              name="password" id="password" 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder='Enter your password'/>
            </div>
            <div className="form-control">
              <label>Confirm Password</label>
              <input type="password" 
              name="password2" id="password2" 
              onChange={(e) => setPassword2(e.target.value)} 
              placeholder='Enter your confirm password'/>
            </div>
          </div>
          <div className="flex">
            <div className="form-control">
              <label>Description</label>
              <input type="text" 
              name="description" id="description" 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder='Enter description'/>
            </div>
            <div className="form-control">
              <label>Profile</label>
              <input type="text" 
              name="profile" id="profile" 
              onChange={(e) => setProfile(e.target.value)}
              placeholder='Enter profile pic'/>
            </div>
          </div>
            <div className="form-control">
              <Link to='/login'
              type="submit"
              onClick={onSubmit}
              className='btn btn-register'>
              Register</Link>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Register