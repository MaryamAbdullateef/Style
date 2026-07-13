import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, User, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { allProducts } from "../context/ProductData";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { getCartCount } = useCart();
  const brandBlue = "#0070f3";

  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("styler_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setShowDropdown(false);
    setHeaderSearch("");
    setIsSearchExpanded(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        if (!headerSearch) setIsSearchExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [headerSearch]);

  const liveResults = useMemo(() => {
    const query = headerSearch.toLowerCase().trim();
    if (!query) return [];

    const tokens = query.split(/\s+/);
    return allProducts.filter((product) => {
      const name = product.name.toLowerCase();
      const cat = product.category.toLowerCase();
      const sec = product.section.toLowerCase();
      const tags = product.tags || [];

      return tokens.every((t) => 
        name.includes(t) || cat.includes(t) || sec.includes(t) || tags.some(tag => tag.includes(t))
      );
    }).slice(0, 4);
  }, [headerSearch]);

  const navLinks = [
    { name: "New Arrivals", path: "/new" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Kids", path: "/kids" },
    { name: "Collections", path: "/collections" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 px-4 md:px-10 flex items-center h-20 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative h-full">
        
        {/* LEFT BRAND SECTION */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            className="lg:hidden text-white transition-colors p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link to="/">
            <span className="text-xl md:text-2xl font-black tracking-[0.18em] text-white select-none" style={{ fontFamily: "serif" }}>
              STYLER<span style={{ color: brandBlue }}>HUB</span>
            </span>
          </Link>
        </div>

        {/* CENTER LINKS SECTION */}
        <div className="hidden lg:flex items-center gap-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.25em] font-bold transition-all relative py-2 ${
                location.pathname === link.path ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0"
                }`}
                style={{ backgroundColor: brandBlue }}
              />
            </Link>
          ))}
        </div>

        {/* RIGHT CONTROL ACTIONS SECTION */}
        <div className="flex items-center gap-4 md:gap-6 relative h-full justify-end" ref={dropdownRef}>
          
          {/* SEARCH SYSTEM BAR BLOCK */}
          <div className="hidden md:flex items-center h-full">
            {!isSearchExpanded && (
              <button 
                onClick={() => {
                  setIsSearchExpanded(true);
                  setTimeout(() => searchInputRef.current?.focus(), 150);
                }}
                className="text-white/70 hover:text-white transition-colors focus:outline-none p-2"
              >
                <Search size={18} />
              </button>
            )}

            <div 
              className={`absolute top-1/2 -translate-y-1/2 right-full mr-4 flex items-center bg-zinc-950/95 border border-white/10 rounded-full px-4 h-11 transition-all duration-300 overflow-visible ${
                isSearchExpanded ? "w-72 opacity-100 scale-100" : "w-0 opacity-0 scale-95 pointer-events-none border-transparent"
              }`}
            >
              <Search size={14} className="text-white/40 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={headerSearch}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="SEARCH PREMIUM STYLE..."
                className="bg-transparent text-[10px] text-white uppercase tracking-wider focus:outline-none ml-2.5 w-full font-bold"
              />
              <button 
                type="button"
                onClick={() => {
                  setIsSearchExpanded(false);
                  setHeaderSearch("");
                  setShowDropdown(false);
                }}
                className="text-white/40 hover:text-white ml-1 transition-colors shrink-0"
              >
                <X size={14} />
              </button>

              {/* FLOATING DROPDOWN SEARCH ENGINE DISPLAY CONTAINER */}
              {showDropdown && headerSearch.trim() !== "" && (
                <div className="absolute top-14 right-0 w-[440px] bg-[#0c0c0e]/98 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-[1100] backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-3 bg-zinc-900/50 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Matching Suggestions</span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-400 uppercase tracking-wider">{liveResults.length} hits</span>
                  </div>

                  <div className="max-h-[360px] overflow-y-auto">
                    {liveResults.length === 0 ? (
                      <div className="p-8 text-center text-xs uppercase tracking-wider text-gray-500 font-medium">
                        No products found.<br /><span className="text-[10px] lowercase text-gray-600">Try refining your keyword</span>
                      </div>
                    ) : (
                      liveResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setShowDropdown(false);
                            setIsSearchExpanded(false);
                            navigate(product.section === "Men" ? "/men" : product.section === "Women" ? "/women" : "/kids");
                          }}
                          className="p-3.5 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition-all border-b border-white/5 last:border-none group"
                        >
                          <div className="w-11 h-14 rounded-xl bg-zinc-900 border border-white/5 overflow-hidden shrink-0 group-hover:border-blue-500/50 transition-colors">
                            <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-blue-500">{product.section} &bull; {product.category}</span>
                            <h4 className="text-xs font-bold uppercase tracking-wide truncate text-white mt-0.5 group-hover:text-blue-400 transition-colors">{product.name}</h4>
                            <p className="text-xs font-black text-white/60 mt-0.5">₦{product.price.toLocaleString()}</p>
                          </div>
                          <ArrowRight size={14} className="text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))
                    )}
                  </div>
                  
                  <Link 
                    to="/search" 
                    onClick={() => {
                      setShowDropdown(false);
                      setIsSearchExpanded(false);
                    }}
                    className="block text-center py-3.5 text-[10px] font-black uppercase tracking-widest bg-zinc-900 border-t border-white/5 hover:bg-[#0070f3] text-white transition-all group"
                  >
                    Advanced Catalog Search <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* UTILITY BAR GROUP */}
          <div className="flex items-center gap-4 shrink-0">
            <Link to="/search" className="md:hidden text-white/70 hover:text-white transition-colors">
              <Search size={20} />
            </Link>
            
            {/* UPDATED: Cleaned out username conditional logic block, leaving only the primary icon link shell */}
            <Link to="/account" className="text-white/70 hover:text-white transition-colors flex items-center gap-2 py-1 shrink-0">
              <User size={19} />
            </Link>

            <Link to="/cart" className="relative text-white/70 hover:text-white transition-colors p-1 shrink-0">
              <ShoppingBag size={19} />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black text-white shadow-md" style={{ backgroundColor: brandBlue }}>
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* CALL TO ACTION ORDER BUTTON */}
          <Link to="/order" className={`${isMobileMenuOpen ? "hidden" : "flex"} shrink-0`}>
            <button className="bg-blue-600 rounded-full cursor-pointer  animate-bounce px-5 py-2.5 hover:bg-white text-white hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-xl active:scale-95 whitespace-nowrap">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE DISPLAY SYSTEM PORT OVERLAY MAP */}
      <div className={`fixed inset-0 bg-black/98 transition-all duration-500 flex flex-col justify-center items-center gap-8 z-[900] ${isMobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-full"}`}>
        <div className="flex flex-col items-center gap-6 pt-12">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="text-lg uppercase tracking-[0.25em] font-black text-white/80 hover:text-blue-500 transition-colors">
              {link.name}
            </Link>
          ))}
          <Link to="/order" onClick={() => setIsMobileMenuOpen(false)} className="mt-6 bg-blue-600 animate-bounce  px-12 py-3.5 rounded-full text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-blue-600 transition-all">
            Order Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;