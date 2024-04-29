// AdminToolCard.jsx
import React from 'react';

const AdminToolCard = ({ tool }) => {
  return (
    <div className="admin-tool-card">
      <img src={tool.image} alt={tool.name} />
      <h3>{tool.name}</h3>
      <p>{tool.description}</p>
      <p>Rate per Day: ${tool.ratePerDay}</p>
      <button>Delete Tool</button>
    </div>
  );
};

export default AdminToolCard;
