import React from "react";
const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Section */}
      <div className="footer-container">
        
        {/* About */}
        <div className="footer-section">
          <h4>About</h4>
          <p>
            QuickIT is your trusted IT partner, delivering smart, innovative, and secure digital solutions tailored to meet your unique business needs. We are committed to elevating your business with cutting-edge technology and exceptional service.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>
            Quick Links
          </h4>
          <ul className="footer-links">
            <li>
              <a href="/">
                Home
              </a>
            </li>
            <li>
              <a href="/about">
                About
              </a>
            </li>
            <li>
              <a href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>
            Follow Us
          </h4>
          <ul className="footer-links">
            <li>
              <a
                href="https://twitter.com"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2024 QuickIT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
