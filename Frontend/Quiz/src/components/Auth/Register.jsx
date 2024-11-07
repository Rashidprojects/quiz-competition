import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import GoogleSignIn from './GoogleSignIn';
import { TextField, Button } from '@mui/material'; 
import './auth.css'

const Register = () => {
  const { dispatch } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [otpSection, setOtpSection] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setOtpSection(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
      });

      dispatch({ type: 'SET_USERNAME', payload: formData.username });
      console.log(response.data);
      navigate('/auth/otp/');
      setSuccess(response.data.message);
      setError(null);
    } catch (error) {
      console.log('Registration error:', error);
      setError(error.response?.data || "Registration failed");
    }
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignin = () => {
    navigate('/auth/login');
  };


  return (
    <div className={`flex h-screen`}>
      {/* Left Section */}
      <div
        className={`w-1/2 bg-blue-900 flex items-center justify-center flex-col gap-6 transform transition-transform duration-1000 ${
          animate ? 'translate-x-0' : 'translate-x-1/2'
        } z-10`}
      >
        <h2 className='text-6xl font-bold text-center text-white'>Welcome To <br /> Quizera!</h2>
        <p className="text-gray-300 text-2xl cursor-pointer">Already have an account?</p>
        <button
          onClick={handleSignin}
          className="bg-blue-900 text-white font-semibold rounded-2xl shadow-lg px-5 py-2 hover:shadow-xl transition-shadow hover:scale-110 hover:transition ease-in-out duration-300"
          style={{
            boxShadow: '0 -2px 6px rgba(255, 255, 255, 0.5), 0 4px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* Right Section */}
      <div
        className={`w-1/2 bg-gray-100 flex items-center justify-center flex-col gap-5 transform transition-transform duration-1000 ${
          animate ? 'translate-x-0' : 'translate-x-1/4'
        }`}
      >
        <div>
          <h2 className="text-6xl font-bold text-center mb-12">Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 justify-center items-center">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className='customTextField'
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                style={{
                  marginBottom: '15px',
                }}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                className='customTextField'
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
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
                value={formData.password}
                className='customTextField'
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                onChange={handleChange}
                style={{
                  marginBottom: '15px',
                }}
              />

              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                name="confirmPassword"
                value={formData.confirmPassword}
                className='customTextField'
                sx={{
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                onChange={handleChange}
                style={{
                  marginBottom: '15px',
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Join us
              </Button>
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
    </div>
  );
};

export default Register;
