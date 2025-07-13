// src/components/DemoRedirect.tsx
import React from 'react';
// import { useNavigate } from 'react-router-dom'; // If using react-router-dom

const DemoRedirect: React.FC = () => {
  // const navigate = useNavigate(); // If using react-router-dom

  const handleRedirect = () => {
    // Method 1: Using window.location.href
    window.location.href = 'http://localhost:5173/'; // Replace with your desired URL

    // Method 2: Using react-router-dom (if installed)
    // navigate('/demo'); // Replace '/demo' with your desired route
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleRedirect}
    >
      Demo
    </button>
  );
};

export default DemoRedirect;
