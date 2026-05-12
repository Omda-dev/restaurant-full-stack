import { FaUtensils } from 'react-icons/fa'; 
import { FaShoppingCart } from 'react-icons/fa'; 
import { FaShippingFast } from 'react-icons/fa'; 
import './Content.css';

const Content = () => {
  return (
    <div className="features-container">
      <div className="feature-item">
        <FaUtensils className="feature-icon" />
        <h3>Multi Cuisine</h3>
        <p>In the new era of technology we look in the future with certainty life.</p>
      </div>
      <div className="feature-item middle">
        <FaShoppingCart className="feature-icon" />
        <h3>Easy To Order</h3>
        <p>In the new era of technology we look in the future with certainty life.</p>
      </div>
      <div className="feature-item">
        <FaShippingFast className="feature-icon" />
        <h3>Fast Delivery</h3>
        <p>In the new era of technology we look in the future with certainty life.</p>
      </div>
    </div>
  );
};

export default Content;