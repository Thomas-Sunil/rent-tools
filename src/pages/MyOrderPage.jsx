import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import Navbar2 from './Navbar2';

const MyOrderPage = () => {
  const [orders, setOrders] = useState([]);

  const handleCancel = async (orderId) => {
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (confirmed) {
      try {
        await deleteDoc(doc(firestore, 'orders', orderId));
        setOrders(orders.filter(order => order.id !== orderId));
      } catch (error) {
        console.error('Error canceling order: ', error);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'orders'));
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ id: doc.id, ...doc.data() });
        });
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders: ', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar2 />
      <h1>My Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Tool Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.toolName}</td>
              <td>{order.phoneNumber}</td>
              <td>
                <button onClick={() => handleCancel(order.id)}>Cancel</button>
                {' | '}
                <Link to={`/feedback`}>Feedback</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrderPage;
