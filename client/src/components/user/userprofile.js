import React, { useState, useEffect } from 'react';
import AddProfile from './adduserprofile'; // Import the AddProfile component
import '../static/userprofile.css';

const ViewUser = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem('UserId');
        if (!userId) {
          setError('User ID not found in local storage');
          return;
        }

        const response = await fetch(`http://localhost:5000/user/profile?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const userData = await response.json();
        setUserProfile(userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile');
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    // Initialize edited profile with the current user profile
    if (userProfile) {
      setEditedProfile({ ...userProfile });
    }
  }, [userProfile]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      const userId = localStorage.getItem('UserId');
      const response = await fetch(`http://localhost:5000/user/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      const updatedUserProfile = await response.json();
      setUserProfile(updatedUserProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className='profile'>
      <h2 className='profile-title'>User Profile</h2>
      {error ? (
        // Render AddProfile component when there's an error
        <AddProfile />
      ) : (
        userProfile && (
          <div>
            {!editMode ? (
              <div>
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Branch:</strong> {userProfile.branch}</p>
                <p><strong>College:</strong> {userProfile.college}</p>
                
                <div className='edit'>
  <button onClick={handleEditClick}>Edit</button>
</div>


              </div>
            ) : (
              <div >
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editedProfile.name}
                    onChange={handleInputChange}
                    className='profile-input'
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    className='profile-input'
                  />
                </label>
                <label>
                  Branch:
                  <input
                    type="text"
                    name="branch"
                    value={editedProfile.branch}
                    onChange={handleInputChange}
                    className='profile-input'
                  />
                </label>
                <label>
                  College:
                  <input
                    type="text"
                    name="college"
                    value={editedProfile.college}
                    onChange={handleInputChange}
                    className='profile-input'
                  />
                </label>
                <div className='save'>
                <button  onClick={handleSaveClick}>Save</button></div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default ViewUser;