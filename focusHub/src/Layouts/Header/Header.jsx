import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../../src/assets/Images/Logo.png";
import UserIcon from "../../Components/UserIcon";
import { Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const isLoginOrHome = location.pathname === "/" || location.pathname === "/login" || location.pathname.startsWith("/blog");
  const isDashboard = !isLoginOrHome;

  const navbarData = isLoginOrHome ? props.navbarLoginData : props.navbarDashboardData;

  const userIcon = isDashboard ? <UserIcon /> : null;

  const headerClassName = isDashboard ? "header-dashboard" : "header-login";

  return (
    <header className={headerClassName}>
      <nav>
        <NavLink to="/">
          <div>
            <img src={logo} alt="logo" className="image" />
          </div>
        </NavLink>
        <Link to="/">
          <div className="AppTitle">FocusHub</div>
        </Link>
        <div className="ulContainer">
          <ul className="header-ul">
            {navbarData.map((linkdata, i) => (
              <NavLink to={linkdata.link} key={linkdata + i}>
                <li>{linkdata.text}</li>
              </NavLink>
            ))}
          </ul>
        </div>
        {userIcon}
      </nav>
    </header>
  );
}

export default Header;
