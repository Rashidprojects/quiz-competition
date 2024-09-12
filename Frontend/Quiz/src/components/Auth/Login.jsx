// src/RegisterPage.jsx

import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { FaFacebookF,FaGoogle,FaGithub } from "react-icons/fa";
import { auth, db, googleProvider, githubProvider } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [animate,setAnimate] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true)
  },[])

  const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth,email,password)
            navigate('/');
            
        } catch(error){
            alert(error.message)
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

  const handleGithubSignin = async () => {
    try {
      const result = await signInWithPopup(auth,githubProvider);
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

  const handleSignup = () => {
    navigate('/auth/register/')
  }

  return (

    // Left Section
 <div className={` flex h-screen  `}> 
    <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/4'} `}>

    <h2 className='text-6xl font-bold text-center'>Sign in</h2>

    {/* sign in option logos */}
    <div className='list-none flex gap-4'>
        <li className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
        style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
        ><FaFacebookF /></li>

        <li onClick={handleGoogleSignin}
        className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
        style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
        ><FaGoogle /></li>

        <li  onClick={handleGithubSignin}
        className='rounded-full px-3 py-3 bg-gray-100 cursor-pointer shadow-lg hover:scale-125 hover:transition ease-in-out duration-300'
        style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
        ><FaGithub /></li>
    </div>

    <div className='flex flex-col gap-3 justify-center items-center'>
      
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
        <button onClick={handleLogin}
        className='bg-gray-100 font-semibold rounded-2xl shadow-lg px-5 py-2 mt-2 hover:shadow-xl  transition-shadow hover:scale-125 hover:transition ease-in-out duration-300'
        style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN IN</button>
        
        <p className= ' text-gray-500 text-1xl cursor-pointer font-medium'>Forgot your password?</p>

    </div>
    </div>


{/* Right Section */}
    
    <div className={` w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : '-translate-x-1/3'} `}> 
      <h2 className='text-6xl font-bold text-center text-white'>Welcome To <br /> Quiz Mastery!</h2>
      <p className='text-gray-300 text-1xl font-medium cursor-pointer'>New Here?</p>
      <button onClick={handleSignup}
      className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN UP</button>
    </div>
  </div>

  );
};

export default Login;
