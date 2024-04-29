import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { getAuth,createUserWithEmailAndPassword  } from 'firebase/auth';



const OrderPage = ({ selectedTool, price }) => {
  const [timeSlot, setTimeSlot] = useState(1);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [labourNeeded, setLabourNeeded] = useState(false);

  const  name =  selectedTool;
  console.log(name)
  const rent = price;

  const handleTimeSlotChange = (e) => {
    setTimeSlot(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Get the current user
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        // User is not logged in, handle this case accordingly
        console.error('User is not logged in.');
        return;
      }
  
      const userId = user.uid;
  
      const orderData = {
        userId: userId, // Include the user ID in the order data
        date: new Date().toISOString(),
        timeSlot: timeSlot,
        address: address,
        phoneNumber: phoneNumber,
        labourNeeded: labourNeeded,
        amount: rent * timeSlot // Calculate total amount based on tool rate per day and time slot
      };
  
      // Submit orderData to Firestore
      const docRef = await addDoc(collection(firestore, 'orders'), orderData);
      console.log('Order placed with ID: ', docRef.id);
  
      // Reset form fields
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
            <label htmlFor="tool">Tool Name:</label>
            <input type="text" id="tool" name="tool" className="input-field" value={name}/>
          </div>

          <div className="form-group">
            <label htmlFor="time">Time Slot:</label>
            <select id="time" name="time" value={timeSlot} onChange={handleTimeSlotChange}>
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
            <input type="text" id="amount" name="amount" className="input-field"  />
          </div>

          <button className="submit-btn" type="submit">Confirm Order</button>
        </form>
      </div>
    </>
  );
};

export default OrderPage;
