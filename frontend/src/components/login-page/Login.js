import './Login.css';
import bookifyIcon from '../../images/bookify-icon.png';
import API_URL from '../../config';
import { useEffect } from 'react';

function Login() {
  useEffect(() => {
    // Check if we're returning from Spotify auth
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      // Call your backend callback endpoint
      fetch(`${API_URL}/callback?code=${code}`, {
        credentials: 'include'  // Important! This ensures cookies are sent
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.replace(data.redirect);
          } else {
            console.error('Auth error:', data.error);
            // Handle error appropriately
          }
        })
        .catch(error => {
          console.error('Error during callback:', error);
        });
    }
  }, []);

  const handleLogin = () => {
    // Make request to Flask backend's /login endpoint
    fetch(`${API_URL}/login`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Redirect the user to the Spotify login page
        window.location.href = data.auth_url;
      })
      .catch(error => {
        // Handle the error, e.g., display an error message to the user
        console.error('Error during login:', error);
      });
  };

  return (
    <div className='login-div'>
      <div className='login-div-middle'>
        <div className='login-left'> 
          <div className='login-logo'>
            <img className='login-bookify-icon' src={bookifyIcon}/>
            <p className='login-app-name'>Bookify</p>
          </div>
          <h3 className='login-description'>A site where you can get a Spotify playlist based off of a book.</h3>
        </div>
          <div className='login-right'>
            <div className='login-right-log-in'>
              <p className='login-directions'>Get started by logging into your Spotify account</p>
              <button className='login-button' onClick={handleLogin}>Log in</button>
            </div>
            <div className='login-right-sign-up'> 
              <p className='login-directions'>Don't have an account?</p>
              <a href='https://www.spotify.com/signup'><button className='login-button'>Sign up</button></a>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Login