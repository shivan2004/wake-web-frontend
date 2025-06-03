import React from 'react';
import {AlertCircle, Github as GitHub, Mail, Heart, Server} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <Server className="nav-logo" />
            <span>WakeWeb</span>
          </div>
          <p className="footer-tagline">Keeping your servers awake, so you can sleep.</p>
        </div>

        {/*<div className="footer-links">*/}
        {/*  <div className="footer-links-column">*/}
        {/*    <h4>Company</h4>*/}
        {/*    <ul>*/}
        {/*      <li><a href="#">About Us</a></li>*/}
        {/*      <li><a href="#">Blog</a></li>*/}
        {/*      <li><a href="#">Careers</a></li>*/}
        {/*      <li><a href="#">Contact</a></li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}

        {/*  <div className="footer-links-column">*/}
        {/*    <h4>Resources</h4>*/}
        {/*    <ul>*/}
        {/*      <li><a href="#">Documentation</a></li>*/}
        {/*      <li><a href="#">Pricing</a></li>*/}
        {/*      <li><a href="#">FAQ</a></li>*/}
        {/*      <li><a href="#">Support</a></li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}

        {/*  <div className="footer-links-column">*/}
        {/*    <h4>Legal</h4>*/}
        {/*    <ul>*/}
        {/*      <li><a href="#">Terms of Service</a></li>*/}
        {/*      <li><a href="#">Privacy Policy</a></li>*/}
        {/*      <li><a href="#">Cookies</a></li>*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} WakeWeb. All rights reserved.</p>
            <div className="footer-social">
              <a href="https://github.com/shivan2004" aria-label="GitHub"><GitHub size={20} /></a>
              <a href="mailto:shivansamala@gmail.com" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
          <div className="footer-made-with">
            <p>Made with <Heart size={14} className="heart-icon" /> by Shivan Samala</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;