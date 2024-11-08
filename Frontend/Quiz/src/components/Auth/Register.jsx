import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import GoogleSignIn from './GoogleSignIn';
import { TextField, Button } from '@mui/material'; 
import { IoMdCheckmarkCircle } from "react-icons/io";
import { debounce } from 'lodash';
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

  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userLoading, setUserLoading] = useState(false)
  const [usernameMessage, setUsernameMessage] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const navigate = useNavigate();

  console.log('message is :', usernameMessage + " user availablity : ", usernameAvailable );
  

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (!username) {
        setUsernameMessage(null);
        setUsernameAvailable(false);
        return;
      }

      try {
        setUserLoading(true)
        const response = await axios.get(`http://localhost:8000/api/check-username/${username}/`);
        setUsernameMessage(response.data.message);
        response.data.available ? setUsernameAvailable(true) : setUsernameAvailable(false)
      } catch (error) {
        setUsernameMessage(error.response?.data?.message || "Error checking username.");
        setUsernameAvailable(false);
      }
      finally {
        setUserLoading(false)
      }
    }, 300),
    [] // Ensure debounce only creates one instance
  );
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


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

    if (name === 'username') {
      checkUsername(value); // Call checkUsername on username field change
    }
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

          <form onSubmit={handleSubmit} className='relative'>
            <div className="flex flex-col gap-3 justify-center items-center">
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                name="username"
                autoComplete="off"
                value={formData.username}
                onChange={handleChange}
                sx={{
                
                  '& .MuiInputLabel-asterisk': {
                    display: 'none', // This hides the asterisk
                  },
                }}
                className= {`${usernameAvailable ? 'customTextField' : 'errorTextField' } `}
                 style={{
                  marginBottom: usernameAvailable ? '15px' : '23px',
                }}
              /> 
             
            {  (userLoading && 
                <div role="status" className='absolute top-3 right-5'>
                    <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
              ) }

              {
                !usernameAvailable && usernameMessage !== null ?  (
                  <span className='text-errorRed absolute top-[54px] left-[3px]'>Username already in use. Please choose another one.</span> 
                ) : (
                  usernameMessage !== null &&
                  <span className='absolute top-4 right-5 text-2xl text-green-600'><IoMdCheckmarkCircle /></span>
                )
              }         
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                required
                name="fullname"
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
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
