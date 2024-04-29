import React from 'react';
import Navbar2 from './Navbar2'; // Import the Navbar2 component


function CancelationForm() {
  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle form submission here
  };

  return (
    <div>
      <Navbar2 /> {/* Include the Navbar2 component */}
      <div className="cancelation-container">
        <h1 className="cancelation-heading">Cancel Order</h1>
        <form className="cancelation-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="orderId">Order ID:</label>
            <input type="text" id="orderId" name="orderId" required />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea id="reason" name="reason" rows="4" cols="50" required></textarea>
          </div>

          <button type="submit" className="cancel-btn">Cancel Order</button>
        </form>
      </div>
    </div>
  );
}

export default CancelationForm;