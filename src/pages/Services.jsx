import { Link } from 'react-router-dom';
import OrderPage from "./OrderPage";
import "./Services.css";
import Navbar2 from "./Navbar2";
import React, { useState, useEffect } from 'react';
import { firestore, collection, getDocs } from '../../firebase'; // Import firestore and collection function

const Services = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "tools"));
      const toolsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTools(toolsData);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const handleRentButtonClick = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <div>
      <div className="nav2">
        <Navbar2 />
      </div>
      <div className="container2">
        <div className="services2">
          <h1>Our Services</h1>
          <div className="tools-container2">
            {tools.map((tool) => (
              <div key={tool.id} className="tool-card2">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="tool-image2"
                />
                <div className="tool-details2">
                  <div className="tool-name2">{tool.name}</div>
                  <div className="tool-description2">
                    {tool.description}
                  </div>
                  <div className="tool-rate2">
                    Rate Per Day: {tool.ratePerDay}
                  </div>
                  <Link
                    to="/order"
                    className="rent-button2"
                    onClick={() => handleRentButtonClick(tool)} // Pass the tool as an argument to the onClick handler
                  >
                    Rent
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedTool && <OrderPage selectedTool={selectedTool} />}
    </div>
  );
};

export default Services;