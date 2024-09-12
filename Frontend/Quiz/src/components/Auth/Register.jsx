// src/RegisterPage.jsx

import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,signInWithPopup } from 'firebase/auth';
import { FaFacebookF,FaGoogle,FaGithub } from "react-icons/fa";
import { auth, db, provider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState('')
  const [animate,setAnimate] = useState(false)
  const navigate = useNavigate()

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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth,provider)
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

  const handleSignin = () => {
    navigate('/auth/login')
  }

  return (

    // Left Section
 <div className={` flex h-screen  `}> 
    <div className={` w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/3'} `}> 
      <h2 className='text-6xl font-bold text-center text-white'>Welcome back To Quiz <br /> Mastery!</h2>
      <p className='text-gray-300 text-2xl cursor-pointer'>Already have an account?</p>
      <button onClick={handleSignin}
      className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN IN</button>
    </div>


{/* Right Section */}
    <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/4'} `}>

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

            <li className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
             style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            ><FaGithub /></li>
        </div>

        <div className='flex flex-col gap-3 justify-center items-center'>
            <input type="text" 
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Name' />

            <input
            type="email"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            />

            <input
            type="password"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            />
            <button onClick={handleSignup}
            className='bg-gray-100 font-semibold rounded-2xl shadow-lg px-5 py-2 mt-2 hover:shadow-xl  transition-shadow hover:scale-125 hover:transition ease-in-out duration-300'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN UP</button>
            
        </div>
      </div>
    </div>

  );
};

export default Register;
