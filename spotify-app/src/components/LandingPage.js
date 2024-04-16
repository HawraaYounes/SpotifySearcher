// LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const client_id = 'eaefb39582d1451e871cfdfffe3b5d97'; 
const redirect_uri = 'http://localhost:3000/callback'; 

function LandingPage() {
  const handleLogin = () => {
    const state = generateRandomString(16);
    localStorage.setItem('spotify_auth_state', state);
    const scope = 'user-read-private user-read-email'; 
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`;
    window.location.href = url; 
  };

  return (
    <div className="landing-page">
      <h1>Welcome to My Spotify App</h1>
      <p>Discover and explore music like never before!</p>
      <button onClick={handleLogin} className="login-button">
        Login with Spotify
      </button>
    </div>
  );
}

export default LandingPage;

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
