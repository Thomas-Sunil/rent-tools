import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { addTool, firestore, collection, getDocs, deleteDoc, doc } from '../../firebase';

const AdminDashboard = () => {
  const [newToolName, setNewToolName] = useState('');
  const [newToolDescription, setNewToolDescription] = useState('');
  const [newToolRatePerDay, setNewToolRatePerDay] = useState('');
  const [newToolImage, setNewToolImage] = useState('');
  const [tools, setTools] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchTools();
    fetchFeedbacks();
    fetchOrders();
  }, []);

  const fetchTools = async () => {
    try {
      const toolsCollection = collection(firestore, 'tools');
      const querySnapshot = await getDocs(toolsCollection);
      const toolsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTools(toolsData);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const feedbacksCollection = collection(firestore, 'feedback');
      const querySnapshot = await getDocs(feedbacksCollection);
      const feedbacksData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbacksData);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(firestore, 'orders');
      const querySnapshot = await getDocs(ordersCollection);
      const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddToolFormSubmit = async (event) => {
    event.preventDefault();
    const newToolData = {
      name: newToolName,
      description: newToolDescription,
      ratePerDay: newToolRatePerDay,
      image: newToolImage
    };
    try {
      await addTool(newToolData);
      fetchTools();
      clearFormFields();
    } catch (error) {
      console.error('Error adding tool:', error);
    }
  };

  const clearFormFields = () => {
    setNewToolName('');
    setNewToolDescription('');
    setNewToolRatePerDay('');
    setNewToolImage('');
  };

  const handleDeleteTool = async (toolId) => {
    try {
      await deleteDoc(doc(firestore, 'tools', toolId));
      fetchTools();
    } catch (error) {
      console.error('Error deleting tool:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      {/* Tool list */}
      <div className="tool-list-container">
        <h2>Tools</h2>
        <div className="tool-list">
          {tools.map((tool) => (
            <div className="tool-item" key={tool.id}>
              <div className="tool-details">
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <p>Rate Per Day: ${tool.ratePerDay}</p>
              </div>
              <button onClick={() => handleDeleteTool(tool.id)} className="delete-button">Delete</button>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddToolFormSubmit} className="add-tool-box">
          <input type="text" placeholder="Tool Name" value={newToolName} onChange={(e) => setNewToolName(e.target.value)} className="input-box" />
          <input type="text" placeholder="Description" value={newToolDescription} onChange={(e) => setNewToolDescription(e.target.value)} className="input-box" />
          <input type="number" placeholder="Rate Per Day" value={newToolRatePerDay} onChange={(e) => setNewToolRatePerDay(e.target.value)} className="input-box" />
          <input type="text" placeholder="Image URL" value={newToolImage} onChange={(e) => setNewToolImage(e.target.value)} className="input-box" />
          <button type="submit" className="add-button">Add Tool</button>
        </form>
      </div>

      {/* Feedback list */}
      <div className="feedback-list-container">
        <h2>Feedbacks</h2>
        <table>
          <thead>
            <tr>
              <th>Tool Name</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.toolName}</td>
                <td>{feedback.rating}</td>
                <td>{feedback.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders list */}
      <div className="orders-list-container">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Tool Name</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.toolName}</td>
                {/* Add more cells for additional order details */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
