import { Link } from "react-router-dom";
import "./NotFoundPage.css";
const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <div className="not-found-page-heading">
        <h2>ERROR 404!</h2>
        <p>Page Not Found</p>
        <Link to="/">Return to home</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
