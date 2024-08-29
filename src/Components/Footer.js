import React from "react";
import './Footer.css';
/**
 * @component {Footer} - which displays the Footer
 * @returns returns the JSX code whichh has footer details
 */

const Footer = () => {
  return (
    <div className="container">
      <footer className="footer-section">
      <h3>Retail App</h3>
        <div className="">
       
        <ul className="footer-items">
          <li>Contact Us</li>
          <li>Privacy Policy</li>
        </ul>
        </div>
        <p>@2024 Retail App</p>
      
      </footer>
      
    </div>
  );
};

export default Footer;
