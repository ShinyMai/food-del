import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-contents">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>Hihi</p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="facebook" />
            <img src={assets.linkedin_icon} alt="linkedin" />
            <img src={assets.twitter_icon} alt="twitter" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Homw</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+84 945 712 105</li>
            <li>quangpn808@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        {" "}
        Copyright 2024 @ LuvShiny - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
