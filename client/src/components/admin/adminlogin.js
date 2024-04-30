import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../static/adminlogin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false); // State to track login status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoggingIn(true); // Set loggingIn state to true when submitting
      const response = await fetch('http://localhost:5000/login/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store email and adminId in local storage upon successful login
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminId', data.adminId);
        // Redirect to admin dashboard upon successful login
        window.location.href = '/page/*';
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid username or password');
    } finally {
      setLoggingIn(false); // Reset loggingIn state to false after handling login
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login Page</h2>
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
        {loggingIn && <p className="login-msg">You are logging in..</p>} {/* Display login message when loggingIn state is true */}
        {error && <p className="error-msg">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="links-wrapper">
        <p>Don't have an account? <Link to="/admin/signup">Sign up</Link></p>
        <p>Reset Password? <Link to="/resetpassword/admin">Reset Password</Link></p>
        <p>Forgot Password? <Link to="/forgot-password/admin">Forgot Password</Link></p>
      </div>
    </div>
  );
};

export default AdminLogin;
