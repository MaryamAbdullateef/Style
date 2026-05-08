import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Change navbar background on scroll for a premium feel
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collections", path: "/collection" },

    { name: "Men", path: "/man" },
    { name: "Women", path: "/woman" },
    { name: "Kids", path: "/kids" },
    { name: "Order", path: "/order" },

    { name: "Shop All", path: "/shop" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[1000] transition-all duration-300 px-6 py-4 flex justify-between items-center ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm text-black"
          : "bg-black text-white"
      }`}
    >
      {/* Brand Logo */}
      <Link to="/" className="no-underline">
        <h1
          className={`text-2xl font-black tracking-tighter transition-colors ${
            isScrolled ? "text-black" : "text-white"
          }`}
        >
          STYLE<span className="text-red-500">HUB</span>
        </h1>
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`text-xs font-bold uppercase tracking-widest no-underline transition-all hover:text-red-500 ${
                location.pathname === link.path ? "text-red-500" : ""
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Utility Icons (Cart, Account, etc.) */}
      <div className="flex items-center gap-5">
        <Link to="/wishlist" className="hover:scale-110 transition-transform">
          <span role="img" aria-label="wishlist" className="text-lg">
            🤍
          </span>
        </Link>
        <Link
          to="/cart"
          className="relative hover:scale-110 transition-transform"
        >
          <span role="img" aria-label="cart" className="text-lg">
            🛍️
          </span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            0
          </span>
        </Link>

        {/* Mobile Menu Toggle (Simplified) */}
        <button className="md:hidden text-2xl">☰</button>
      </div>

      <style jsx>{`
        nav {
          font-family: "DM Sans", sans-serif;
        }
        .active-link {
          color: #ef4444;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
