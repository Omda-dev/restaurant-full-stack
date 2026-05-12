import { Link } from "react-router-dom";
import "./NotFound.css";
import logo404 from "../../assets/logo404.png"; 

const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={logo404} alt="404 Logo" className="notfound-logo" /> 
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-subtitle"><span>Oops! </span>Page Not Found</h2>

      <Link to="/" className="notfound-btn">
        ⬅ Go Back
      </Link>
    </div>
  );
};

export default NotFound;
