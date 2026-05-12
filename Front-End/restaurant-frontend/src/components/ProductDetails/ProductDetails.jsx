import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../../api/axiosConfig";
import { useCart } from "../Cart/useCart";
import "./ProductDetails.css";



export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        const res = await axiosConfig.get(`/menu-items/${id}`);
        setItem(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="product-details-container">
        <p className="error">Product not found</p>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-card">

        <div className="image-section">
          <img src={item.image} alt={item.name} />
        </div>

        <div className="info-section">
          <h1>{item.name}</h1>

          <p className="price">{item.price} EGP</p>

          <p className="desc">
            {item.description || "No description available"}
          </p>

          <div className="meta">
            <p>
              <strong>Category:</strong> {item.category?.name}
            </p>

            <p>
              <strong>Subcategory:</strong> {item.subcategory?.name}
            </p>
          </div>
            <button className="order-btn"
                    onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item); }}>                           
                       Order Now
            </button>       
          </div>
      </div>
    </div>
  );
}