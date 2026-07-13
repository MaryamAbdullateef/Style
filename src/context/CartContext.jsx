// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Adds a product to the global cart state
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // If item already exists in cart, increase its quantity
      const isExisting = prevItems.find((item) => item.id === product.id);
      if (isExisting) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // If it's a new item, add it with a quantity of 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // FIXED: Calculates total item count instantly for your Navbar bag badge
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Removes an item entirely from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, getCartCount, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart easily in Men, Women, Kids, and Navbar
export function useCart() {
  return useContext(CartContext);
}