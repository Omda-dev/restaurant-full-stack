import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Cart/useCart";
import axiosConfig from "../../api/axiosConfig";
import Loading from "../Loading/Loading.jsx";
import "../Loading/Loading.css";
import "./OurMenu.css";
import Offers from "./Offers/Offers";

const categories = ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

const OurMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axiosConfig.get("/menu-items");
        setMenuItems(res.data || []);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const imageSrc = (dish) => {
    if (!dish?.image) return "";
    if (dish.image.startsWith("http")) return dish.image;
    return `http://127.0.0.1:8000/storage/${dish.image}`;
  };

  if (loading) {
    return <Loading />;
  }

  const featured = menuItems;

  return (
    <div className="menu-page1">

    {loading && <Loading />}

      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>
          "From hearty breakfasts to sweet desserts, explore a variety of dishes crafted with passion."
        </p>
      </div>

      <div className="menu-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => navigate(`/menu/${cat.toLowerCase()}`)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="featured-section">
        <h2>Featured Dishes</h2>

        <div className="menu-grid">
          {featured.map((dish) => (
            <div
              key={dish.id}
              className="menu-card"
              onClick={() => navigate(`/product/${dish.id}`)}
            >
              <img src={imageSrc(dish)} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <div className="price">${dish.price}</div>
<div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(dish);
                }}
              >
                Order Now
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Offers />
    </div>
  );
};

export default OurMenu;