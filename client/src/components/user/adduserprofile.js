import React, { useState } from 'react';
import axios from 'axios';
import '../static/userprofile.css';
const AddUserProfile = () => {
    const [email, setEmail] = useState(localStorage.getItem('UserEmail') || '');
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [college, setCollege] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem('UserId'); // Retrieve adminId from localStorage and rename it to userId
            const response = await axios.post('http://localhost:5000/userProfile', {
                userId, // Include userId in the request body
                email,
                name,
                branch,
                college
            });
            console.log(response.data);
        } catch (error) {
            console.error('Failed to save data:', error);
            throw new Error('Failed to save data');
        }
    };

    return (
        <div>
            <h2>User Profile Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type="email" value={email} readOnly />
                </label>
                <br />
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Branch:
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} />
                </label>
                <br />
                <label>
                    College:
                    <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />
                </label>
                <br />
                <div className='save'>
                <button type="submit">Save</button></div>
            </form>
        </div>
    );
};

export default AddUserProfile;
