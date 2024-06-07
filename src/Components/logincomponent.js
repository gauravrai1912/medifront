import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import config from "../config";

function Login() {
  const navigate = useNavigate();
  const [loginMessage, setLoginMessage] = useState("");

  function handleChange(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    const apiUrl = config.apiUrl;
    
    // Assuming you use axios for making API calls
    axios.post(`${apiUrl}/api/v1/auth/login`, { email, password })
      .then(response => {
        const { statusCode, responseMessage, token } = response.data;
        if (statusCode === 200) {
        Cookies.set('jwt_token', token, { expires: 7 });
        console.log(token);
          navigate("/home");
        } else {
          // Display login error message
          setLoginMessage(responseMessage);
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setLoginMessage('An error occurred while logging in');
      });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <form className="mb-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" name="email" className="mt-1 px-4 py-2 w-full border rounded-md" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" name="password" className="mt-1 px-4 py-2 w-full border rounded-md" />
                </div>
                <div className="flexitems-center">
                    <a href="/forgotpassword" className="text-sm underline ">Forgot Password?</a>                  
                 </div>
                 <div className="flex justify-center items-center">

                 <button onClick={(e) => handleChange(e)} className= "text-white bg-gray-700  px-2 py-2 rounded-md">Sign In</button>
                    
                    
                </div>
            </form>
            {loginMessage && <p className="text-red-500">{loginMessage}</p>}
        </div>
    </div>
  );
}

export default Login;
