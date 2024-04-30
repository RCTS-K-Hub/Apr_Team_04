import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false); // State to track login status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true); // Set loggingIn state to true during login process
      const response = await fetch('http://localhost:5000/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log('Login response:', data); // Log response for debugging
      if (response.ok) {
        // Store email and userId in local storage upon successful login
        localStorage.setItem('UserEmail', email);
        localStorage.setItem('UserId', data.userId);
        // Redirect to user dashboard
        window.location.href = '/page/user';
      } else {
        // Handle invalid login credentials
        console.error('Invalid username or password');
      }
    } catch (error) {
      // Handle network errors
      console.error('Error:', error);
    } finally {
      setLoggingIn(false); // Reset loggingIn state after login attempt
    }
  };

  return (
    <div className="user-login-container">
      <h2>User Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button">
          <button type="submit">Sign In</button>
        </div>
      </form>
      {loggingIn && <p style={{ color: 'green' }}>You are logging in...</p>} {/* Conditional rendering of logging in message */}
      <div className="links-wrapper">
        <p className="signup-text">Don't have an account? <Link to="/user/signup">Sign up</Link></p>
        <p className="reset-password-text">Reset Password? <Link to="/resetpassword/admin">Reset Password</Link></p>
        <p className="forgot-password-text">Forgot Password? <Link to="/forgot-password/user">Forgot Password</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
