/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, qty = 1) => {
    if (!size) return;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === product._id && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...product, size, qty }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item._id === id && item.size === size)
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
