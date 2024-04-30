import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAdminProfile from './addadminprofile';
import '../static/adminprofile.css'; // Import CSS file

const Profile = () => {
  const [adminProfile, setAdminProfile] = useState(null);
  const [error, setError] = useState(false); // State to track error
  const [editMode, setEditMode] = useState(false); // State to track edit mode

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/adminProfiles`);
        const adminId = localStorage.getItem('adminId');
        const profiles = response.data;
        const matchedProfile = profiles.find(profile => profile.adminId === adminId);
        setAdminProfile(matchedProfile);
      } catch (error) {
        console.error('Error fetching admin profile:', error);
        setError(true); // Set error state to true
      }
    };

    fetchAdminProfile();
  }, []);

  if (error) {
    // Redirect to AddAdminProfile route when error occurs
    window.location.href = '/addadminprofile';
    return null; // This line ensures no rendering occurs before redirect
  }

  const handleEditClick = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSaveClick = async () => {
    try {
      // Send a PUT request to update the profile
      await axios.put(`http://localhost:5000/adminProfiles/${adminProfile._id}`, {
        name: adminProfile.name,
        branch: adminProfile.branch,
        college: adminProfile.college
      });
      setEditMode(false); // Disable edit mode after saving
    } catch (error) {
      console.error('Error updating admin profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setAdminProfile({
      ...adminProfile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile">
      {adminProfile ? (
        <div>
          <h2 className="profile-title">Admin Profile</h2>
          <p>Email: {adminProfile.email}</p>
          <div>
            <p><strong> AdminName  : </strong> {editMode ? (
              <input
                className="profile-input"
                type="text"
                name="name"
                value={adminProfile.name}
                onChange={handleInputChange}
              />
            ) : (
              <span>{adminProfile.name}</span>
            )}</p>
            <p><strong>Branch : </strong> {editMode ? (
              <input
                className="profile-input"
                type="text"
                name="branch"
                value={adminProfile.branch}
                onChange={handleInputChange}
              />
            ) : (
              <span>{adminProfile.branch}</span>
            )}</p>
            <p><strong>College :</strong> {editMode ? (
              <input
                className="profile-input"
                type="text"
                name="college"
                value={adminProfile.college}
                onChange={handleInputChange}
              />
            ) : (
              <span>{adminProfile.college}</span>
            )}</p>
          </div>
          <button className="profile-button" onClick={editMode ? handleSaveClick : handleEditClick}>
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
      ) : (
        <div>
          {/* Render AddAdminProfile component instead of showing "Loading..." */}
          <AddAdminProfile />
        </div>
      )}
    </div>
  );
};

export default Profile;
