import React, { useRef } from 'react';
import { verifyOtp } from '../../services/otpService';

const OtpInput = ({ email,onOtpVerified }) => {
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value; 

        if (value.length > 1 || (value && isNaN(value))) {
            e.target.value = '';
            return
        }

        // Move to the next input if the current one has a value
        if (e.target.value.length === 1 && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }

        // Handle backspace to move to the previous input
        if (e.target.value.length === 0 && index > 0 && e.nativeEvent.inputType === 'deleteContentBackward') {
            inputs.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {
        const otp = inputs.current.map(input => input.value).join('');
        try {
            const response = await verifyOtp(otp, email);
            if (response.success) {
                alert('OTP verified successfully!');
                onOtpVerified(); // Call the callback if OTP is verified
            } else {
                alert('Invalid OTP. Please try again.');
            }
        } catch (error) {
            alert('An error occurred during OTP verification. Please try again.');
        }
    };

    return (
        <div>
            <h2>Enter OTP</h2>
            <div id="otp-container">
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        ref={el => (inputs.current[index] = el)}
                        onChange={e => handleChange(e, index)}
                        style={{
                            width: '40px',
                            height: '40px',
                            fontSize: '20px',
                            textAlign: 'center',
                            margin: '0 5px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                        }}
                    />
                ))}
            </div>
            <button onClick={handleSubmit}>Submit OTP</button>
        </div>
    );
};

export default OtpInput;
