import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/signup.css';

const UserSignup = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/signup/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          isApproved: false,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setError('Signup successful. Your account is awaiting approval.');
      } else {
        setError('Failed to signup. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to signup. Please try again.');
    }
  };

  return (
    <div className="user-signup-container">
      <h2>User Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
        </div>
        {error && <p style={{ color: 'green' }}>{error}</p>}
        <div className='button'>
          <button type="submit">Signup</button>
        </div>
      </form>
      <div className="links-wrapper">
        <p>Already have an account? <Link to="/user/login">Login</Link></p>
      </div>
    </div>
  );
};

export default UserSignup;
