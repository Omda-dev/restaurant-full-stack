import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './useCart';
import './Cart.css';

function Cart({ closeCart, previousOrders = [] }) {
  const [activeTab, setActiveTab] = useState("cart"); 
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={(e) => { e.stopPropagation(); closeCart(); }}>×</button>
        
        <div className="tabs">
          <button 
            className={activeTab === "cart" ? "active" : ""} 
            onClick={() => setActiveTab("cart")}
          >
            Cart
          </button>
        </div>

        {activeTab === "cart" && (
          <>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image_path} alt={item.name} />
                    <div className="cart-info">
                      <h4>{item.name}</h4>
                      <p>${item.price} × {item.quantity} = {(item.price * item.quantity).toFixed(2)}$</p>
                      <div className="cart-actions">
                        <button onClick={(e) => { e.stopPropagation(); decreaseQuantity(item.id); }}>-</button>
                        <button onClick={(e) => { e.stopPropagation(); increaseQuantity(item.id); }}>+</button>
                        <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <strong>Total: ${totalPrice.toFixed(2)}</strong>
                </div>
                <button
                  className="checkout-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeCart();
                    navigate("/order-online");
                  }}
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </>
        )}


      </div>
    </div>
  );
}

export default Cart;
