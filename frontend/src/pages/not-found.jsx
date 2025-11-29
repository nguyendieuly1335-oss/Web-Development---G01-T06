import React from 'react';
import { NavLink } from 'react-router-dom';

function NotFound() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center" 
      style={{ 
        height: '100vh', 
        backgroundColor: '#f8f9fa' 
      }}
    >
      <FiAlertTriangle size={60} className="text-danger mb-3" />
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="fw-bold text-dark">Page Not Found</h2>
      <p className="text-muted mb-4">
        Sorry, the page you are looking for does not exist.
      </p>
      <NavLink 
        to="/home" 
        className="btn btn-danger btn-lg"
        style={{
          backgroundColor: '#D92D20', 
          borderColor: '#D92D20',
          fontWeight: 500
        }}
      >
        Go back to Home
      </NavLink>
    </div>
  );
}

export default NotFound;