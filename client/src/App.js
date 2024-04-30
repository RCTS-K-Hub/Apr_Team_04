import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AdminLogin from './components/admin/adminlogin';
import UserLogin from './components/user/signin';
import AdminSignup from './components/admin/adminsignup';
import UserSignup from './components/user/signup';
import Admin from './components/admin/admin';
import AdminForgotPassword  from './components/admin/adminforgotpassword';
import UserForgetPassword  from './components/user/usersforgotpassword';
import UserResetPassword from './components/user/userresetpassword';
import AdminResetPassword from './components/admin/adminresetpassword';
import AdminContactMessages from './components/admin/admincontact';
import AdminProfile from './components/admin/adminprofile';
import UserProfile from './components/user/userprofile';
import ContactForm from './components/user/contactus';
import Page from './components/admin/page';
import Userpage from './components/user/userpage';
import Adduser from './components/user/adduserprofile';
import AddAdminProfile from './components/admin/addadminprofile';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/forgot-password/admin" element={<AdminForgotPassword />} />
          <Route path="/forgot-password/user" element={<UserForgetPassword />} />
          <Route path="/resetpassword/user" element={<UserResetPassword />} />
          <Route path="/resetpassword/admin" element={<AdminResetPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact/admin" element={<AdminContactMessages />} /> 
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/profile/user" element={<UserProfile />} />
          <Route path="/contact/user" element={<ContactForm />} />
          <Route path="/addadminprofile" element={<AddAdminProfile />} />

          {/* Nested routing for the Page component */}
          <Route path="/page/*" element={<Page />} />
          {/* Nested routing for the Userpage component */}
          <Route path="/page/user/*" element={<Userpage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;