import React from 'react';
import { FaLightbulb, FaHandshake, FaUsers, FaChartLine } from 'react-icons/fa';
import Aside from '../../Layouts/Aside/Aside';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <Aside />
      <div className="AboutUsContent">
        <section className="section">
          <div className="pics">
            <FaLightbulb className="lightbulb-icon" />
          </div>
          <div className="content-container">
            <h1 className="title">About Our Company</h1>
            <p className="description">
              Welcome to our company! We are a leading provider of innovative solutions in the tech industry.
              With a team of dedicated professionals, we strive to deliver exceptional products and services to our clients.
              Our mission is to revolutionize the way people interact with technology and make a positive impact in the world.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="pics">
            <FaChartLine className="chart-icon" />
          </div>
          <div className="content-container">
            <h2 className="title">Our Vision</h2>
            <p className="description">
              We envision a future where technology enhances and simplifies every aspect of people's lives.
              Through continuous innovation and a customer-centric approach, we aim to be at the forefront of this transformation,
              empowering individuals and businesses to thrive in a digital world.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="pics">
            <FaUsers className="users-icon" />
          </div>
          <div className="content-container">
            <h2 className="title">Join Our Team</h2>
            <p className="description">
              We are always looking for talented individuals to join our team.
              If you are passionate about technology and want to be part of a dynamic and innovative company,
              we would love to hear from you. Check out our Careers page for current job openings and opportunities.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
