import "./ContactUs.css";
import Aside from "../../Layouts/Aside/Aside";
import Button from "../../Components/Button/Button";
import { FaEnvelope, FaPhone, FaMapMarker, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="ContactUs">
      <Aside />
      <div className="contact-content">
        <h1>Contact us</h1>
        <div className="contact-info">
          <div className="contact-item">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <p className="contact-text">info@focushub.com</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <FaPhone />
            </div>
            <p className="contact-text">+389 75-123-456</p>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <FaMapMarker />
            </div>
            <p className="contact-text">123 Main Street, Skopje, Macedonia</p>
          </div>
        </div>
        <div className="contact-form">
          <h2 className="form-title">We would love to hear from you</h2>
          <form>
            <input type="text" placeholder="Your Name" className="form-input" />
            <input type="email" placeholder="Your Email" className="form-input" />
            <input type="text" placeholder="Your Message" className="form-input" />
            {/* <textarea placeholder="Your Message" className="form-input" /> */}
            <Button className="contactUs-btn" btnText="Send Message" type="submit" btnStyle={{ backgroundColor: "#4a69bd", color: "#ffffff" }} />
          </form>
        </div>
        <div className="social-media">
          <h3>Follow us on social media</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
