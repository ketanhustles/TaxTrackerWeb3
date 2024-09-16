import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer >
      <div className="Foot">
        <p>&copy; {new Date().getFullYear()} TrackYourTax. All rights reserved.</p>
      </div>
    </footer>
  );
};

// const footerStyle = {
//   backgroundColor: '#333',
//   color: '#fff',
  
//   padding: '10px',
//   textAlign: 'center',
// };

export default Footer;
