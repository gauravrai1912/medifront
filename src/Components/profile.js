import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  return (
    <div ref={profileRef} className="relative">
      <button className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={toggleProfileOptions}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {showProfileOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
          <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Profile</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Settings</a>
          <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Sign Out</a>
        </div>
      )}
    </div>
  );
};

export default Profile;
