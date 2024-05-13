import React, { useState, useEffect } from "react";

const OTPDialog = () => {
  const handleInputChange = (event, index) => {
    let value = event.target.value;
    const otpInputs = document.querySelectorAll("#otp > *[id]");
    if (event.key === "Backspace") {
      otpInputs[index].value = "";
      if (index !== 0) otpInputs[index - 1].focus();
    } else {
      if (index === otpInputs.length - 1 && value !== "") {
        // return true;
      } else if (
        (event.keyCode > 47 && event.keyCode < 58) ||
        (event.keyCode > 95 && event.keyCode < 106)
      ) {
        otpInputs[index].value = event.key;
        if (index !== otpInputs.length - 1) otpInputs[index + 1].focus();
        event.preventDefault();
      }
    }
  };

  const [timer, setTimer] = useState(60);
  const [showResend, setShowResend] = useState(false);
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

  const handleResendClick = () => {
    // Reset the timer and hide the Resend button
    setTimer(60);
    setShowResend(false);
  };
  return (
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
              onKeyDown={(event) => handleInputChange(event, index)}
            />
          ))}
        </div>
        <div className="mt-4 flex flex-row justify-between">
          <button className=" text-white bg-gray-700  px-2 py-2 rounded-md">
            Validate
          </button>
          {showResend ? (
            <button
              id="resend"
              className="text-black px-6 py-2 rounded-md mt-4"
              onClick={handleResendClick}
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
  );
};

export default OTPDialog;