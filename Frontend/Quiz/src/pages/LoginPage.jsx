import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const LoginPage = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth,email,password)
            alert ('user logged in!... ')
        } catch(error){
            alert(error.message)
        }
    }
  return (
    <div className='flex items-center justify-between flex-col'>
        <h2>Welcome Back</h2>
        <div className='flex items-center justify-center flex-col gap-2'>
            <input type="email"          
            className='border rounded-sm px-3'
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Email'
            />
            

            <input type="password"
            className='border rounded-sm px-3'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Password'
            />

            <button 
            onClick={handleLogin}
             className='bg-blue-950 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-[100px] h-[35px] text-center flex items-center justify-center'
            >Sign in</button>
        </div>
    </div>
  )
}

export default LoginPage