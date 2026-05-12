import "./Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub, FaPhone } from "react-icons/fa";
import logo from '../../assets/logo.png'
import food1 from "../../assets/food1.jpeg";
import food2 from "../../assets/food2.jpg";
import food3 from "../../assets/food3.webp";
import food4 from "../../assets/food4.jpg";


const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section about">
            <img src={logo} alt="Logo" className="footer-logo" />
          <p>
            In the new era of technology, we look at the future with certainty and pride to for our company and.
          </p>
          <div className="social-icons">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithub /></a>
          </div>
            <div className="contact-phone" style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaPhone />
            <span>+20 123 456 7890</span>
          </div>  
        </div>

        <div className="footer-section hours">
  <h4>Hours of Operation</h4>
  <ul>
    <li>Monday - Friday: 9:00 AM - 10:00 PM</li>
    <li>Saturday: 10:00 AM - 11:00 PM</li>
    <li>Sunday: Closed</li>
  </ul>
</div>

    <div className="footer-section instagram">
      <h4>Follow Us On Instagram</h4>
      <div className="insta-grid">
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <img src={food1} alt="food1" />
        </a>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <img src={food2} alt="food2" />
        </a>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <img src={food3} alt="food3" />
        </a>
        <a href="https://instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
          <img src={food4} alt="food4" />
        </a>
      </div>
    </div>


      </div>

      <div className="footer-bottom">
        <div>
        Copyright © 2025 Hashtag Developer. All Rights Reserved
      </div>
      <div>
  <button onClick={scrollToTop} className="back-to-top">⬆ Back to Top</button>

</div>
      </div>
    </footer>
  );
};

export default Footer;
