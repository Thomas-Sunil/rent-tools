import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginForm.css'; // Import the CSS file

const AdminLoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to validate admin credentials
    // For demo purposes, let's assume the admin username is 'admin' and password is 'admin'
    if (username === 'admin' && password === 'admin') {
      // If credentials are correct, call the onLogin function and navigate to the admin dashboard
      onLogin();
      navigate('/admin/dashboard'); // Navigate to the admin dashboard route
    } else {
      // If credentials are incorrect, display an error message
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
