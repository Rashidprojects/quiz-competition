// src/RegisterPage.jsx

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import GoogleSignIn from './GoogleSignIn';
import { TextField, Button } from '@mui/material'; 
import './auth.css'



const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null)
  const [animate,setAnimate] = useState(false)
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true)
  },[])

  const handleSubmit = async (event) => {
  event.preventDefault()

  if (usernameOrEmail.includes('@')) {
    try {
      // Wait for the response from the GET request
      const response = await axios.get(`http://127.0.0.1:8000/api/usermail/${usernameOrEmail}/`);
      setUserData(response.data);
      console.log('The data is email', response.data, 'The name is:', response.data?.username);

      // Dispatch the username after the data is fetched
      if (response.data?.username) {
        dispatch({ type: 'SET_USERNAME', payload: response.data.username });
      } else {
        console.error('Username not found in response');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setErrorMessage('Error fetching user data');
    }
  } else {
    dispatch({ type: 'SET_USERNAME', payload: usernameOrEmail });
  }

  try {
    const signinResponse = await axios.post('http://127.0.0.1:8000/api/signin/', {
      username_or_email: usernameOrEmail,
      password: password
    });
    console.log('Logged in username is:', usernameOrEmail);
    navigate('/')
  } catch (error) {
    if (error.response && error.response.data) {
      setErrorMessage('Invalid credentials. Please try again.');
    } else {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }
}



  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth,googleProvider);
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        username : user.displayName || '',
        email: user.email || '',
        bgColor: ''
      })

      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  

  const handleSignup = () => {
    navigate('/auth/register/')
  }

  return (

    // Left Section
<div className={` flex h-screen  `}> 
  <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/4'} `}>
    <div className='w-[450px]'>
      <h2 className='text-6xl font-bold text-center mb-12 '>Sign in</h2>

      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 justify-center items-center'>
            
          
          <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                name="username"
                autoComplete="off"
                value={usernameOrEmail}
                onChange= {(e) => setUsernameOrEmail(e.target.value)}
                sx={{
                
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                className='customTextField'
                style={{
                  marginBottom: '15px',
                }}
              />

          <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                name="password"
                value={password}
                className='customTextField'
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                onChange= {(e) => setPassword(e.target.value)}
                style={{
                  marginBottom: '15px',
                }}
              />

          <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >Let's go</Button> 
            
          <p className= ' text-gray-500 text-1xl cursor-pointer font-medium'>Forgot your password?</p>

        </div>
      </form>

      <div className="flex items-center mt-5 ">
          <span className="flex-1 border-t border-black"></span>
          <span className="mx-2 text-black relative bottom-[2px]">or</span>
          <span className="flex-1 border-t border-black"></span>
      </div>

      <div className='mt-5'>
        <GoogleSignIn  />
      </div>    
    </div>

  </div>


{/* Right Section */}
    
    <div className={` w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/3'} `}> 
      <h2 className="text-6xl font-bold text-center text-white">
          Welcome back To
          <br />
          Quizera!
        </h2>
      <p className='text-gray-300 text-1xl font-medium cursor-pointer'>New Here?</p>
      <button onClick={handleSignup}
      className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN UP</button>
    </div>
  </div>

  );
};

export default Login;
