import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar2 from './Navbar2';
import './FeedbackPage.css';
import { firestore, collection } from '../../firebase'; // Import firestore and collection from firebase
import { addDoc } from 'firebase/firestore'; // Import addDoc specifically from the 'firebase/firestore' module

const FeedbackForm = () => {
  const { orderId } = useParams();
  const [toolName, setToolName] = useState('');
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add feedback data to Firestore
      const docRef = await addDoc(collection(firestore, 'feedback'), {
        toolName,
        rating,
        feedback,
      });
      console.log('Feedback submitted successfully with ID: ', docRef.id);
      // Optionally, you can redirect the user or show a success message
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <Navbar2 />
      <h1>Power Tool Rental Feedback</h1>
      <form id="feedbackForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="toolname">Tool Name:</label>
          <input
            type="text"
            id="toolname"
            name="toolname"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            required
          />
        </div>

        {/* Removed order ID input field */}

        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            cols="50"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;

