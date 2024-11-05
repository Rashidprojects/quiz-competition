import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useContext, useRef } from 'react';
import { UserContext } from '../../context/UserContext';

const OtpInput = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const { state } = useContext(UserContext);
    const inputRefs = useRef([]);
    const navigate = useNavigate()

    const handleChange = (index, value) => {
        // Ensure the value is a single digit or empty
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        // Move to the next input if the current input is filled
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to the previous input on backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        const otpString = otp.join(''); // Join the OTP array into a single string

        try {
            const response = await axios.post('http://localhost:8000/api/verify-otp/', {
                username: state.username,
                otp: otpString,
            });
            navigate('/')
            console.log('Successfully verified OTP');
        } catch (error) {
            console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
            alert('Failed to verify OTP: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };

    return (
        <form onSubmit={handleOtpVerification} className="otp-input">
            <h2>Username from: {state.username}</h2>
            <div className="otp-input-container" style={{ display: 'flex', justifyContent: 'space-between', width: '240px' }}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                        placeholder=""
                        style={{
                            width: '30px',
                            height: '40px',
                            fontSize: '20px',
                            textAlign: 'center',
                            margin: '10px 5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                        className="otp-input-field"
                    />
                ))}
            </div>
            <button type="submit">Verify OTP</button>
        </form>
    );
};

export default OtpInput;
