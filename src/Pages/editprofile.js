import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('jwt_token');
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub;
                console.log(email);

                const response = await axios.get(`http://localhost:8090/api/v1/auth/getuserinfo`,{
                headers : {
                    email: email,
                    token: token
                }
            });
                const data = response.data;
                setPhoneNumber(data.phoneNumber);
                setFirstName(data.firstName);
                setLastName(data.lastName);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const token = Cookies.get('jwt_token');
            const email = jwtDecode(token).email;
    
            await axios.put(`/api/user/updateProfile?email=${email}`, { phoneNumber, firstName, lastName });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="max-w-md mx-auto mt-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm font-semibold">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm font-semibold">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button type="button" onClick={handleSaveProfile} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save Profile</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;
