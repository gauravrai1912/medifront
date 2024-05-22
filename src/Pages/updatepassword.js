import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/footer';
import Navbar from '../Components/navbar';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const UpdatePassword = () => {
    const [password, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        try {
            const token = Cookies.get('jwt_token');
            const decodedToken = jwtDecode(token);
            const email = decodedToken.sub;
            const response = await axios.post('http://localhost:8090/api/v1/auth/changePassword', { email, password, newPassword });
            if (response.status === 200) {
                alert('Password updated successfully.');
                navigate('/home');
            } else {
                setErrorMessage('Failed to update password. Please try again.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            setErrorMessage('An error occurred while updating password. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="max-w-md mx-auto mt-8 px-4">
                <h2 className="text-xl font-semibold mb-4">Update Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold">
                            Enter Old Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="block text-sm font-semibold">
                            Enter New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold">
                            Confirm New Password:
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 px-4 py-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Update Password
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default UpdatePassword;
