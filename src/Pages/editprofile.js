import React, { useState, useEffect } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import config from '../config';




const EditProfile = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = Cookies.get('jwt_token');
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub;
                const apiUrl = config.apiUrl;
                console.log(email);

                const response = await axios.get(`${apiUrl}/api/v1/auth/getuserinfo`,{
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
                setSnackbarSeverity('error');
                setSnackbarMessage('Error fetching user profile');
                setSnackbarOpen(true);
            }
        };

        fetchUserProfile();
    }, []);

    const handleSaveProfile = async () => {
        try {
            const token = Cookies.get('jwt_token');
            const decodedToken = jwtDecode(token);
            const email = decodedToken.sub;
            const apiUrl = config.apiUrl;
            console.log(email);
            console.log(phoneNumber, firstName, lastName);
            await axios.put(`${apiUrl}/api/v1/auth/updateProfile?email=${email}`, { phoneNumber, firstName, lastName });
            setSnackbarSeverity('success');
            setSnackbarMessage('Profile updated successfully!');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Error updating user profile');
            setSnackbarOpen(true);
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
            <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
        </div>
    );
};

export default EditProfile;
