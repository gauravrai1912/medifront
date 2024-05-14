import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const profileRef = useRef(null);

  useEffect(() => {
    // Simulate fetching employee information from the database
    const fetchEmployeeInfo = async () => {
      try {
        // Make a request to your backend to fetch employee info
        // Replace the following with actual fetch logic
        const response = await fetch('/api/employee');
        const data = await response.json();
        setEmployeeName(data.name);
        setEmployeeId(data.id);
      } catch (error) {
        console.error('Error fetching employee information:', error);
      }
    };

    fetchEmployeeInfo();

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

  const handleSignOut = () => {
    // Perform sign out logic (e.g., clear session, redirect to login page)
    window.location.href = '/login';
  };

  return (
    <div ref={profileRef} className="relative">
      <button className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={toggleProfileOptions}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {showProfileOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
          <div className="px-4 py-2 text-white">
            <p className="mb-1">{employeeName}</p>
            <p className="text-xs text-gray-400">{employeeId}</p>
          </div>
          <button className="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700" onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
