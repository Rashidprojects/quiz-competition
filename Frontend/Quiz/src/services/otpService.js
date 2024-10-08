import axios from "axios";

export const sendOtpToEmail = async (email) => {
    console.log('email status in service : ', email);

    try {
        const csrfResponse = await axios.get('http://127.0.0.1:8000/api/get-csrf-token/')
        const csrfToken = csrfResponse.data.csrfToken;

        // Here you could call Django backend to send OTP via email
        const response = await axios.post('http://127.0.0.1:8000/api/send-otp-email/', {
            email:email
        }, {
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    );
    console.log('OTP email sent successfully:', response.data);
    return response.data
    } catch (error) {
        console.error(error)
        throw new Error('Failed to send OTP');
    }
}

export const verifyOtp = async (otp, email) => {
    try {
        const csrfResponse = await axios.get('http://127.0.0.1:8000/api/get-csrf-token/')
        const csrfToken = csrfResponse.data.csrfToken;

        const response = await axios.post('http://127.0.0.1:8000/api/verify-otp/', {
            otp: otp,
            email: email
        }, {
            headers : {
                'X-CSRFToken' : csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('OTP verification failed');
    }
}