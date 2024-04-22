import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../static/adminprofile.css';

const AdminProfile = () => {
    const [email, setEmail] = useState(localStorage.getItem('adminEmail') || ''); // Retrieve email from local storage
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [college, setCollege] = useState('');

    useEffect(() => {
        // Log the logged-in admin's ID when the component mounts
        const adminId = localStorage.getItem('adminId');
        console.log('Logged-in Admin ID:', adminId);

        // Log the admin ID retrieved from the database
        axios.get('http://localhost:5000/adminProfiles')
            .then(response => {
                const savedAdminId = response.data.adminId;
                console.log('Saved Admin ID:', savedAdminId);
            })
            .catch(error => {
                console.error('Error fetching admin profiles:', error);
            });
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const adminId = localStorage.getItem('adminId'); // Retrieve adminId from localStorage
            const response = await axios.post('http://localhost:5000/adminProfiles', {
                adminId, // Include adminId in the request body
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
        <div className='profile'>
            <h2>Admin Profile Form</h2>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    <b>Email:</b>
                    <input type="email" value={email} readOnly />
                </label>
                <br />
                <label className="label">
                    <b>Name:</b>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label className="label">
                    <b>Branch:</b>
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} />
                </label>
                <br />
                <label className="label">
                    <b>College:</b>
                    <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />
                </label>
                <br />
                <div className='profile-button'>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AdminProfile;
