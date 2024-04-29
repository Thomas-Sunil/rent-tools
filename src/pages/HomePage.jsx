import React from 'react';
import Navbar from './Navbar';
import './Homesty.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="description">
          <h2>Welcome to Rent a Tool Platform</h2>
          <p>
            Rent a Tool Platform is your go-to destination for renting tools for your projects. Whether you're a DIY enthusiast or a professional contractor, we've got you covered with a wide range of high-quality tools available for rent. Browse our inventory, find the tools you need, and complete your projects efficiently.
          </p>
        </div>
        <div className="button-container">
          <a href="/login" className="button">Login</a>
          <a href="/signup" className="button">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
