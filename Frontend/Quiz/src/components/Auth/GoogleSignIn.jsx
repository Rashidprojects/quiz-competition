import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function GoogleSignIn() {
    const { dispatch } = useContext(UserContext)
    const navigate = useNavigate()

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`);
      

      const backendResponse = await axios.post('http://localhost:8000/api/google-login/', {
        token: credential,
      });

      const userData = backendResponse.data;
      dispatch({ type: 'SET_USERNAME', payload: userData.username })
      console.log('User data from db:', userData);

      navigate('/')

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <GoogleOAuthProvider clientId="214071378160-adm1tfkuuobg61n576q97cnplq2rap23.apps.googleusercontent.com">
      <div className="inline-block overflow-hidden w-full border border-black rounded-lg">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleSignIn;
