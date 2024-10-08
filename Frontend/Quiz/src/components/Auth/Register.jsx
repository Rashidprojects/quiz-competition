// src/RegisterPage.jsx

import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,signInWithPopup, RecaptchaVerifier } from 'firebase/auth';
import { FaFacebookF,FaGoogle,FaGithub } from "react-icons/fa";
import { auth, db, googleProvider, githubProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { sendOtpToEmail } from '../../services/otpService';
import OtpInput from './OtpInput';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState('')
  const [otp,setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otpMethod, setOtpMethod] = useState('email')
  const [otpSection, setOtpSection] = useState(false)
  const [animate,setAnimate] = useState(false)
  const navigate = useNavigate()


  const sendOtp = async () => {
    console.log('send otp is called');
    try {
      await sendOtpToEmail(email)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true)
  },[])

  const handleSignup = async () => {
    try {
      // Create a new user with Firebase Authentication
      const userCredential =  await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user

      // Store the user's information in Firestore (using user's unique id)
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email : email,
        bgColor:''
      })
      navigate('/')
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGenerateOtp = async () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (email && username && password !== '') {
      // Check if the email is in a valid format
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
  
      // Proceed with showing OTP section if email is valid
      setOtpSection(true);
      await sendOtp()
    } else {
      alert('Please fill in all required fields.');
    }
  };
  

  console.log('otp button clicked : ',otpSection);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth,googleProvider)
      const user = result.user;

      // store users's information in firestore (using user's unique id)
      await setDoc(doc(db, 'users', user.uid ), {
        username: user.displayName || '',
        email: user.email || '',
        bgColor:''
      })
      navigate('/');
    } catch (error) {
      alert(error.message)
    }
  }

  const handleGithubSignin = async () => {
    try {
      const result = await signInWithPopup(auth,githubProvider)
      const user = result.user;

      await setDoc(doc(db, 'users', user.uid), {
        username: user.displayName || '',
        email: user.email || '',
        bgColor: ''
      })
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  const handleSignin = () => {
    navigate('/auth/login')
  }

  return (

    // Left Section
  <div className={` flex h-screen  `}> 
    <div className={` w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/2'} z-10 `}> 
      <h2 className='text-6xl font-bold text-center text-white'>Welcome back To Quiz <br /> Mastery!</h2>
      <p className='text-gray-300 text-2xl cursor-pointer'>Already have an account?</p>
      <button onClick={handleSignin}
      className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN IN</button>
    </div>

 
    {/* Right Section */}
    <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/4'} `}>
      {otpSection ? <OtpInput email={email} onOtpVerified={handleSignup} /> : (
      <div>
        <h2 className='text-6xl font-bold text-center'>Create Account</h2>

        {/* sign in option logos */}
        <div className='list-none flex gap-4'>
            <li className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
              style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            ><FaFacebookF /></li>

            <li onClick={handleGoogleSignIn}
              className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
              style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            ><FaGoogle /></li>

            <li onClick={handleGithubSignin}
              className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
              style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            ><FaGithub /></li>
        </div>

        <div className='flex flex-col gap-3 justify-center items-center'>
            <input type="text" 
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 '
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Name'
            required />

            <input
            type="email"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
            />

            <input
            type="password"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            />
            <button onClick={handleGenerateOtp}
            className='bg-gray-100 font-semibold rounded-2xl shadow-lg px-5 py-2 mt-2 hover:shadow-xl  transition-shadow hover:scale-125 hover:transition ease-in-out duration-300'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN UP</button>
            
        </div>
      </div>
      )}
    </div>
  </div>

  );
};

export default Register;
