import React, { useContext, useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { sendOtpToEmail } from '../../services/otpService';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';


const Register = () => {
  const { dispatch } = useContext(UserContext)
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email : '',
    password : '',
    confirmPassword:''
  })
 
  const [otpSection, setOtpSection] = useState(false)
  const [animate,setAnimate] = useState(false)
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate()

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setOtpSection(true)

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      dispatch({ type: 'SET_USERNAME', payload: formData.username })
      console.log(response.data);
      console.log('send data to otp : ', otpSection + ' name :', formData.username);
      
      navigate('/auth/otp/')
      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      console.log('Registration error:', error);
      console.log('Error response:', error.response);
      setError(error.response?.data || "Registration failed");
    }
  };

  console.log(error ? error : success   );
  


  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true)
  },[])
  

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};


  const handleSignin = () => {
    navigate('/auth/login')
  }

  return (

    // Left Section
  <div className={` flex h-screen  `}> 
    <div className={` w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/2'} z-10 `}> 
      <h2 className='text-6xl font-bold text-center text-white'>Welcome back To<br /> Quizera!</h2>
      <p className='text-gray-300 text-2xl cursor-pointer'>Already have an account?</p>
      <button onClick={handleSignin}
      className='bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300'
      style={{ boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN IN</button>
    </div>

 
    {/* Right Section */}
    <div className={` w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${animate ? 'translate-x-0' : 'translate-x-1/4'} `}>
      <div>
        <h2 className='text-6xl font-bold text-center'>Create Account</h2>

        <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-3 justify-center items-center'>
            <input type="text" 
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 '
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            name='username'
            value={formData.username}
            onChange={handleChange}
            placeholder='Username'
            required />

            <input type="text" 
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100 focus:border-red-500 focus:ring-red-500 focus:ring-opacity-50 '
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            name='fullname'
            value={formData.fullname}
            onChange={handleChange}
            placeholder='Fullname'
            required />

            <input
            type="email"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
            />

            <input
            type="password"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            name='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Password'
            required
            />

          <input
            type="password"
            className='border px-3 w-[386px] h-[46px] rounded-xl shadow-xl font-semibold bg-gray-100'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm Password'
            required
            />
            {/* onClick={handleGenerateOtp} */}
            
            <button type='submit' 
            className='bg-gray-100 font-semibold rounded-2xl shadow-lg px-5 py-2 mt-2 hover:shadow-xl  transition-shadow hover:scale-125 hover:transition ease-in-out duration-300'
            style={{ boxShadow: '0 -4px 6px rgba(255, 255, 255, 1), 0 4px 6px rgba(0, 0, 0, 0.5)' }}>SIGN UP</button>
            
        </div>
        </form>
      </div>
      
    </div>
  </div>

  );
};

export default Register;
