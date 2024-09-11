// src/RegisterPage.jsx

import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { FaFacebookF,FaGoogle,FaGithub } from "react-icons/fa";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animate,setAnimate] = useState(false)

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true)
  },[])

  const handleSignup = async () => {
    try {
      // Firebase v9+ modular syntax for signing up a user
      await createUserWithEmailAndPassword(auth, email, password);
      alert("New user signed up!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (

    // Left Section
    <div className={` flex h-screen transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/3'} `}> 
      <div className='w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 '> 
      <h2 className='text-6xl font-bold text-center text-white'>Welcome back To Quiz <br /> Mastery!</h2>
      <p className='text-gray-300 text-2xl'>Already have an account?</p>
      <button className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN IN</button>
      </div>


{/* Right Section */}
    <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/4'} `}>

        <h2 className='text-6xl font-bold text-center'>Create Account</h2>

        {/* sign in option logos */}
        <div className='list-none flex gap-4'>
            <li className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
             style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            ><FaFacebookF /></li>

            <li className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
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

export default RegisterPage;
