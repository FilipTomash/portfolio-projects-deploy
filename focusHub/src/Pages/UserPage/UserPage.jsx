import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Aside from "../../Layouts/Aside/Aside";
import "./UserPage.css";

const UserInfoPage = () => {
  return (
    <div className="UserInfoPage">
      <Aside />
      <div className="UserInfoPage-content">
        <div className="profile-section">
          <div className="profile-header">
            <h1>User Profile</h1>
          </div>
          <div className="profile-details">
            <div className="profile-picture">
              <img
                src="https://img.freepik.com/free-photo/half-profile-image-handsome-young-caucasian-man-with-good-skin-brown-eyes-black-stylish-hair-stubble-posing-isolated-against-blank-wall-looking-front-him-smiling_343059-4560.jpg"
                alt="Profile"
              />
            </div>
            <div className="profile-info">
              <h2>John Doe</h2>
              <p>Age: 30</p>
              <p>Location: Skopje</p>
              <p>Email: johndoe@serviceindustry.com</p>
              <p>Phone: +389-70-111-222</p>
            </div>
          </div>
        </div>

        <div className="additional-info-section">
          <h2>Additional Information</h2>
          <p>Head of Sales Department in a large multinational Company based in Skopje.</p>
        </div>
        <div className="social-icons">
          <FontAwesomeIcon icon={faTwitter} className="social-icon" />
          <FontAwesomeIcon icon={faFacebookF} className="social-icon" />
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
