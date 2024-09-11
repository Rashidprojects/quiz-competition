// src/RegisterPage.jsx

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    <div className='flex items-center justify-center flex-col'> 
      <h2>Registration to Quiz App</h2>

      <div className='flex items-center justify-center flex-col gap-2'>
        <input
          type="email"
          className='border rounded-sm px-3'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter Your Email'
        />
        <input
          type="password"
          className='border rounded-sm px-3'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Enter Your Password'
        />
        <button
          onClick={handleSignup}
          className='bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center'
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
