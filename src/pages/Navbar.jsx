import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import logo from './downloadfile-1-removebg.png'; // Import the logo image
const Navbar = () => {
    return (
      <div className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Rent a Tool Logo" width="40" height="40" /> {/* Display the logo */}
          Rent a Tool
        </div>
        <div className="navbar-links">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
      </div>
    );
  };
  
  export default Navbar;