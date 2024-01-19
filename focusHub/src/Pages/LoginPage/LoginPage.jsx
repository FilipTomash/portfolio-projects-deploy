import { NavLink } from "react-router-dom";
import "./LoginPage.css";

const LoginComponent = () => {
  return (
    <div className="MainContainer">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" defaultChecked />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true" id="signUpLabel">
              Sign up
            </label>
            <input type="text" name="txt" placeholder="User name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="pswd" placeholder="Password" required />
            <button>Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" minLength={8} maxLength={25} required />
            <button onClick={(e) => e.preventDefault()} id="loginButton">
              <NavLink to="/work-session">Login</NavLink>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
