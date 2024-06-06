import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPasswordDialog() {
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpValues, setOTPValues] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(10);
  const [showResend, setShowResend] = useState(false);
  

  const navigate = useNavigate();

  const handleChange = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://52.66.201.221:8090/api/v1/auth/forgotPassword", { email });
      if (response.status === 200) {
        // Show OTP dialog if the request is successful
        setShowOTP(true);
      } else {
        // Handle error response
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // Handle network errors
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  const handleOTPValidation = () => {
    const otp = otpValues.join("");
    axios
      .post("http://52.66.201.221:8090/api/v1/auth/validateOtp", {
        email: email,
        otp: otp
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("OTP validation successful");
          navigate("/reset-password", { state: { email: email } });
        } else {
          // Handle failure
          // Set error message or perform actions accordingly
        }
      })
      .catch((error) => {
        console.error("Error validating OTP:", error);
        // Handle error
        // Set error message or perform actions accordingly
      });
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // const handleResendClick = () => {
  //   setTimer(60);
  //   setShowResend(false);
  //   setOTPValues(Array(6).fill(""));
  // };

  const handleInputChange = (index, value) => {
    if (value === "" || (value >= "0" && value <= "9")) {
      const newValues = [...otpValues];
      newValues[index] = value;
      setOTPValues(newValues);

      if (index < 5 && value !== "") {
        document.getElementById(`input-${index + 1}`).focus();
      } else if (index === 5 && value !== "") {
        // Submit the OTP or perform validation
        
      }
    }
  };

  return (
    <div className="fg">
      {!showOTP ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Forgot Password?</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  onClick={handleChange}
                  className="text-white bg-gray-700 px-2 py-2 rounded-md"
                >
                  Send OTP
                </button>
                <a href="/login" className="text-color text-sm font-semibold mr-0 underline">Cancel</a>
              </div>
            </form>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Please enter the OTP </h2>
            <div id="otp" className="flex justify-between">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  className="w-12 h-12 text-3xl border mx-1 rounded-md text-center"
                  type="text"
                  id={`input-${index}`}
                  maxLength="1"
                  value={otpValues[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-row justify-between">
              <button 
                className=" text-white bg-gray-700 px-2 py-2 rounded-md"
                onClick={handleOTPValidation}
              >
                Validate
              </button>
              {showResend ? (
                <button
                  id="resend"
                  className="text-black px-6 py-2 rounded-md mt-4"
                  onClick={handleChange}
                >
                  Resend
                </button>
              ) : (
                <div className="text-black px-6 py-2 opacity-20 rounded-md mt-4">
                  Resend in {timer} seconds
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPasswordDialog;
