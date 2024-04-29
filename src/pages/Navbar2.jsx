// Navbar2.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar2.css';
import logo from './downloadfile-1-removebg.png'; // Import the logo image

const Navbar2 = () => {
  // Function to handle logout
  const handleLogout = () => {
    // Add logic to handle logout here
    // For now, let's just refresh the page
    window.location.href = '/';
  };

  return (
    <nav className="navbar2">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Power Tool Rental</h1>
      </div>
      <div className="nav-links">
        <Link to="/feedback" className="nav-link">Feedback</Link>
        <Link to="/services" className="nav-link">Available Tools</Link>
        <Link to="/myorders" className="nav-link">My Orders</Link>
        <button onClick={handleLogout} className="nav-link">Logout</button> {/* Use a button for logout */}
      </div>
    </nav>
  );
};

export default Navbar2;