import { useEffect, useState } from "react";
import CartContext from "./CartContextObject";

const resolveImagePath = (item) => {
  if (!item?.image) return "";
  if (item.image.startsWith("http")) return item.image;
  return `http://127.0.0.1:8000/storage/${item.image}`;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);

      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity: 1,
          image_path: resolveImagePath(item),
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return [item];
        if (item.quantity <= 1) return [];
        return [{ ...item, quantity: item.quantity - 1 }];
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
