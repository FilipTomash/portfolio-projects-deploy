import { NavLink } from "react-router-dom";
import "./Landing-Page.css";

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <div className="Information">
        <h1 id="LogoText" style={{ color: "#3d3d3d" }}>
          Empower your team, amplify productivity !
        </h1>
        <br />
        <h2 id="motto">
          <i>Productivity App for the Service Industries</i>
        </h2>
        <div className="Metrics">
          <div className="Metric">
            <h3 className="plusNumbers">+10%</h3>
            <h3>Increase in Sales and Revenue</h3>
            <NavLink to="/blog/learn-more-sales">Learn more</NavLink>
          </div>
          <div className="Metric">
            <h3 className="plusNumbers">+20%</h3>
            <h3>Increase in Staff Efficiency</h3>
            <NavLink to="/blog/learn-more-efficiency">Learn more</NavLink>
          </div>
          <div className="Metric">
            <h3 className="plusNumbers">up to 20%</h3>
            <h3>Savings in Compensation</h3>
            <NavLink to="/blog/learn-more-compensation">Learn more</NavLink>
          </div>
          <div className="Metric">
            <h3 className="plusNumbers">+25%</h3>
            <h3>Increase in Customer Loyalty</h3>
            <NavLink to="/blog/learn-more-loyalty">Learn more</NavLink>
          </div>
        </div>
        <div className="Buttons">
          <NavLink to="/login" id="loginBtn">
            Login
          </NavLink>
          <NavLink to="/login" id="registerBtn">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
