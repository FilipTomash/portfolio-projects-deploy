import React from "react";
import { NavLink } from "react-router-dom";
import "./Aside.css";

const Aside = () => {
  return (
    <div className="sidebar">
      <NavLink to="/work-session" activeclassname="active-link">
        Work Session
      </NavLink>
      <NavLink to="/statistics" activeclassname="active-link">
        Statistics
      </NavLink>
      <NavLink to="/reminders" activeclassname="active-link">
        Reminders
      </NavLink>
      <NavLink to="/productive-tips" activeclassname="active-link">
        How to be Productive
      </NavLink>
      <NavLink to="/calendar" activeclassname="active-link">
        Calendar
      </NavLink>
      <NavLink to="/about" activeclassname="active-link">
        About us
      </NavLink>
      <NavLink to="/contact" activeclassname="active-link">
        Contact
      </NavLink>
    </div>
  );
};

export default Aside;
