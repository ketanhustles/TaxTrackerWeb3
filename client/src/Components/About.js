import React from 'react';
import "./About.css";
import taxTransparencyImage from '../Images/Image_1.png'; // Import the image file

const About = () => {
  return (
    <div className="about-container">
      <div className="image-container">
        <img src={taxTransparencyImage} alt="Tax Transparency" />
      </div>

      <div className="about-content">
        <h1>About Tax Money Transparency Project</h1>
        <p>
          In today's world, financial transparency in government remains a significant challenge. Citizens often lack access to clear and up-to-date information about how their tax money is allocated and spent. This lack of transparency can lead to skepticism, mistrust, and even potential misuse of public funds.
        </p>
        <p>
          Our project, TaxTransparency, aims to address this critical issue by developing a decentralized application (DApp) that promotes financial transparency in government operations. The DApp leverages blockchain technology and smart contracts to create an immutable, tamper-resistant, and publicly accessible ledger of all government financial transactions.
        </p>
      </div>
    </div>
  );
};

export default About;
