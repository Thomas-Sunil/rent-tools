import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication functions
import Navbar from './Navbar';
import './LoginForm.css';
import { firebaseApp } from '../../firebase'; // Assuming you have exported your Firebase app instance as firebaseApp

const auth = getAuth(firebaseApp); // Initialize Firebase Auth instance

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Use Firebase authentication to sign in the user
      await signInWithEmailAndPassword(auth, email, password);

      // If login successful, call the onLogin callback
      if (typeof onLogin === 'function') {
        onLogin();
      } else {
        console.error('onLogin is not a function');
      }
    } catch (error) {
      setError('Error signing in: ' + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;