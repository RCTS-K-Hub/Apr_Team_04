import React, { useState } from 'react';
import EditProfileAdmin from './adminprofile';
import AdminContactMessages from './admincontact';
import AdminResetPassword from './adminresetpassword';
import Admin from './admin';
import '../static/page.css'; // Make sure to import your CSS file

export default function Page() {
  const id = "example"; // Define id or retrieve it from somewhere
  const [activePage, setActivePage] = useState('profile'); // State to track active page

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <EditProfileAdmin adminId={id} />;
      case 'contact':
        return <AdminContactMessages />;
      case 'resetpassword':
        return <AdminResetPassword />;
      case 'admin':
        return <Admin />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Buttons to switch pages */}
        <button className="sidebar-link" onClick={() => setActivePage('profile')}>Profile</button>
        <button className="sidebar-link" onClick={() => setActivePage('contact')}>Contact Messages</button>
        <button className="sidebar-link" onClick={() => setActivePage('resetpassword')}>Admin Reset Password</button>
        <button className="sidebar-link" onClick={() => setActivePage('admin')}>User Management</button>
        {/* Add more buttons for additional pages */}
      </div>

      {/* Main content */}
      <div className="content">
        {/* Render active page */}
        {renderPage()}
      </div>
    </div>
  );
}
