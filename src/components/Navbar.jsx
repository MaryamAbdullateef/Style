import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Dynamic Logic: Fetch user and cart status
  const user = JSON.parse(localStorage.getItem("styler_user"));
  const cartCount =
    JSON.parse(localStorage.getItem("styler_cart"))?.length || 0;
  const brandBlue = "#0070f3";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "New Arrivals", path: "/new" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
    { name: "Collections", path: "/collections" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 px-5 md:px-12 py-4 ${
        isScrolled
          ? "bg-[#040404]/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span
            className="text-2xl font-bold tracking-[0.15em] text-white"
            style={{ fontFamily: "serif" }}
          >
            STYLER<span style={{ color: brandBlue }}>HUB</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors relative group ${location.pathname === link.path ? "text-white" : "text-blue-400"}`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? "w-full" : "w-0"}`}
                style={{ backgroundColor: brandBlue }}
              />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          {/* Search Icon */}
          <Link
            to="/search"
            className="hidden sm:block text-white/70 hover:text-white transition-colors"
          >
            <Search size={20} />
          </Link>

          {/* Account Icon */}
          <Link
            to="/account"
            className="hidden sm:block text-white/70 hover:text-white transition-colors flex items-center gap-2"
          >
            <User size={20} />
            {user && (
              <span className="text-[10px] font-bold uppercase text-blue-400 hidden lg:block">
                {user.name.split(" ")[0]}
              </span>
            )}
          </Link>

          {/* Cart Icon with Dynamic Badge */}
          <Link
            to="/cart"
            className="relative text-white hover:text-blue-500 transition-colors"
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-2 w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white animate-pulse"
                style={{ backgroundColor: brandBlue }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* Order Now Button */}
          <Link to="/order">
            <button className="bg-blue-700 rounded-2xl p-3 animate-bounce hover:bg-white text-white hover:text-blue-700 font-bold text-sm transition-colors">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#040404] z-[-1] transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl uppercase tracking-widest font-bold text-white hover:text-blue-500"
          >
            {link.name}
          </Link>
        ))}
        <Link
          to="/order"
          onClick={() => setIsMobileMenuOpen(false)}
          className="bg-blue-700 px-8 py-3 rounded-2xl text-white font-bold uppercase tracking-widest"
        >
          Order Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
