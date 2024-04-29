import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions for adding documents
import { firestore } from '../../firebase'; // Import your Firestore instance

const OrderPage = () => {
  const [timeSlot, setTimeSlot] = useState(1);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [labourNeeded, setLabourNeeded] = useState(false);

  const calculateAmount = () => {
    const rate = 20;
    return rate * timeSlot;
  };

  const handleTimeSlotChange = (e) => {
    setTimeSlot(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderData = {
        date: new Date().toISOString(), // Assuming current date for simplicity
        timeSlot: timeSlot,
        address: address,
        phoneNumber: phoneNumber,
        labourNeeded: labourNeeded,
        amount: calculateAmount()
      };

      // Add the order to the Firestore collection
      const docRef = await addDoc(collection(firestore, 'orders'), orderData);
      console.log('Order placed with ID: ', docRef.id);

      // Reset the form fields
      setTimeSlot(1);
      setAddress('');
      setPhoneNumber('');
      setLabourNeeded(false);
    } catch (error) {
      console.error('Error adding order: ', error);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="order-container">
        <h1 className="order-heading">Place Your Order</h1>
        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" className="input-field" />
          </div>

          <div className="form-group">
            <label htmlFor="time">Time Slot:</label>
            <select id="time" name="time" className="input-field" onChange={handleTimeSlotChange}>
              <option value="1">1 Day</option>
              <option value="2">2 Days</option>
              <option value="3">3 Days</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" className="input-field" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" className="input-field" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>

          <div className="form-group radio-group">
            <label htmlFor="labour">Labour Needed:</label>
            <label><input type="radio" name="labour" value="yes" checked={labourNeeded} onChange={() => setLabourNeeded(true)} /> Yes</label>
            <label><input type="radio" name="labour" value="no" checked={!labourNeeded} onChange={() => setLabourNeeded(false)} /> No</label>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Rental Amount:</label>
            <input type="text" id="amount" name="amount" className="input-field" value={`$${calculateAmount()}`} readOnly />
          </div>

          <button className="submit-btn" type="submit">Confirm Order</button>
        </form>
      </div>
    </>
  );
};

export default OrderPage;
