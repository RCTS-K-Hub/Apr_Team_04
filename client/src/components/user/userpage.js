import React, { useState } from 'react';
import EditProfileUser from './userprofile';
import ContactUser from './contactus';
import ResetPasswordUser from './userresetpassword';
import '../static/page.css'; // Make sure to import your CSS file

export default function Page() {
  const [activePage, setActivePage] = useState('profile'); // State to track active page

  const renderPage = () => {
    switch (activePage) {
      case 'profile':
        return <EditProfileUser />;
      case 'contact':
        return <ContactUser />;
      case 'resetpassword':
        return <ResetPasswordUser />;
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
        <button className="sidebar-link" onClick={() => setActivePage('contact')}>Contact Us</button>
        <button className="sidebar-link" onClick={() => setActivePage('resetpassword')}>Reset Password</button>
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
