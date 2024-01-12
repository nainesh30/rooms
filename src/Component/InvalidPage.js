import React from 'react';
import './InvalidPage.css'; // Import the CSS file for styling

const InvalidPage = () => {
  return (
    <div className="invalid-page-container">
      <h1 className="title">Unauthorized Access</h1>
      <p className="message">
        Oops! It seems like you don't have permission to access this page.
      </p>
      <img
        className="illustration"
        src="https://img.freepik.com/free-vector/security-concept-illustration_114360-1518.jpg?w=1060&t=st=1705067791~exp=1705068391~hmac=f31ef1d65250966c252ca1e205de8c7a61f66ae1a9dfb423dfa43e50cb4801ab"
        alt="Unauthorized Illustration"
      />
    </div>
  );
};

export default InvalidPage;
 