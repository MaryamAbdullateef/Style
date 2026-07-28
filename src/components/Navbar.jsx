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

  // Sync user state from storage
  useEffect(() => {
    const syncUser = () => {
      const savedUser = localStorage.getItem("styler_user");
      setUser(savedUser ? JSON.parse(savedUser) : null);
    };
    syncUser();
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, [location]);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset dropdown and menus on location change
  useEffect(() => {
    setShowDropdown(false);
    setHeaderSearch("");
    setIsSearchExpanded(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  // Click outside to collapse search dropdown
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

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Memoized Search Engine Logic
  const liveResults = useMemo(() => {
    const query = headerSearch.toLowerCase().trim();
    if (!query) return [];

    const tokens = query.split(/\s+/);
    return (allProducts || [])
      .filter((product) => {
        const name = (product.name || "").toLowerCase();
        const cat = (product.category || "").toLowerCase();
        const sec = (product.section || "").toLowerCase();
        const tags = product.tags || [];

        return tokens.every(
          (t) =>
            name.includes(t) ||
            cat.includes(t) ||
            sec.includes(t) ||
            tags.some((tag) => tag.toLowerCase().includes(t))
        );
      })
      .slice(0, 4);
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
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 px-2.5 sm:px-6 md:px-10 flex items-center h-16 sm:h-20 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between relative h-full gap-1 sm:gap-4">
        
        {/* LEFT BRAND SECTION */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0 z-[1001]">
          <button
            className="lg:hidden text-white transition-colors p-2 -ml-1 flex items-center justify-center min-w-[40px] min-h-[40px] active:scale-95"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? (
              <X size={22} className="shrink-0" />
            ) : (
              <Menu size={22} className="shrink-0" />
            )}
          </button>

          <Link to="/" className="flex items-center py-1">
            <span
              className="text-xs min-[360px]:text-sm sm:text-xl md:text-2xl font-black tracking-[0.08em] min-[360px]:tracking-[0.12em] sm:tracking-[0.18em] text-white select-none whitespace-nowrap"
              style={{ fontFamily: "serif" }}
            >
              STYLER<span style={{ color: brandBlue }}>HUB</span>
            </span>
          </Link>
        </div>

        {/* CENTER LINKS SECTION (DESKTOP) */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-8 px-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.18em] xl:tracking-[0.25em] font-bold transition-all relative py-2 whitespace-nowrap ${
                location.pathname === link.path
                  ? "text-white"
                  : "text-white/60 hover:text-white"
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
        <div
          className="flex items-center gap-1 min-[360px]:gap-2 sm:gap-4 md:gap-5 relative h-full justify-end flex-1 lg:flex-initial"
          ref={dropdownRef}
        >
          {/* SEARCH SYSTEM BAR BLOCK (MD+) */}
          <div className="hidden md:flex items-center h-full relative">
            {!isSearchExpanded && (
              <button
                onClick={() => {
                  setIsSearchExpanded(true);
                  setTimeout(() => searchInputRef.current?.focus(), 150);
                }}
                className="text-white/70 hover:text-white transition-colors focus:outline-none p-2 flex items-center justify-center rounded-full hover:bg-white/5"
                aria-label="Expand Search"
              >
                <Search size={18} />
              </button>
            )}

            <div
              className={`absolute top-1/2 -translate-y-1/2 right-0 flex items-center bg-zinc-950/95 border border-white/10 rounded-full px-3.5 h-10 transition-all duration-300 overflow-visible ${
                isSearchExpanded
                  ? "w-52 lg:w-72 opacity-100 scale-100"
                  : "w-0 opacity-0 scale-95 pointer-events-none border-transparent"
              }`}
            >
              <Search size={14} className="text-white/40 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={headerSearch}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => setHeaderSearch(e.target.value)}
                placeholder="SEARCH STYLE..."
                className="bg-transparent text-[10px] text-white uppercase tracking-wider focus:outline-none ml-2 w-full font-bold"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchExpanded(false);
                  setHeaderSearch("");
                  setShowDropdown(false);
                }}
                className="text-white/40 hover:text-white ml-1 transition-colors shrink-0 p-1"
                aria-label="Close Search Input"
              >
                <X size={14} />
              </button>

              {/* FLOATING DROPDOWN SEARCH ENGINE DISPLAY CONTAINER */}
              {showDropdown && headerSearch.trim() !== "" && (
                <div className="absolute top-12 right-0 w-[300px] sm:w-[380px] lg:w-[420px] bg-[#0c0c0e]/98 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-[1100] backdrop-blur-xl max-w-[90vw]">
                  <div className="p-3 bg-zinc-900/50 border-b border-white/5 flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                      Suggestions
                    </span>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-400 uppercase tracking-wider">
                      {liveResults.length} hits
                    </span>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto">
                    {liveResults.length === 0 ? (
                      <div className="p-6 text-center text-xs uppercase tracking-wider text-gray-500 font-medium">
                        No products found.<br />
                        <span className="text-[10px] lowercase text-gray-600">
                          Try refining your keyword
                        </span>
                      </div>
                    ) : (
                      liveResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setShowDropdown(false);
                            setIsSearchExpanded(false);
                            const path = (product.section || "").toLowerCase();
                            navigate(
                              path === "men"
                                ? "/men"
                                : path === "women"
                                ? "/women"
                                : "/kids"
                            );
                          }}
                          className="p-2.5 sm:p-3 flex items-center gap-3 hover:bg-white/5 cursor-pointer transition-all border-b border-white/5 last:border-none group"
                        >
                          <div className="w-10 h-12 rounded-lg bg-zinc-900 border border-white/5 overflow-hidden shrink-0 group-hover:border-blue-500/50 transition-colors">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[8px] uppercase font-bold tracking-widest text-blue-500 block truncate">
                              {product.section} &bull; {product.category}
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wide truncate text-white group-hover:text-blue-400 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs font-black text-white/60">
                              ₦{product.price?.toLocaleString()}
                            </p>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0"
                          />
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
                    className="block text-center py-2.5 text-[10px] font-black uppercase tracking-widest bg-zinc-900 border-t border-white/5 hover:bg-[#0070f3] text-white transition-all group"
                  >
                    Advanced Catalog Search{" "}
                    <span className="inline-block transform group-hover:translate-x-1 transition-transform">
                      &rarr;
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* UTILITY BAR GROUP */}
          <div className="flex items-center gap-0.5 min-[360px]:gap-1 sm:gap-2 shrink-0">
            {/* SEARCH ICON FOR MOBILE (< MD) */}
            <Link
              to="/search"
              className="md:hidden text-white/70 hover:text-white transition-colors p-2 flex items-center justify-center rounded-full active:scale-95 min-w-[36px] min-h-[36px]"
              aria-label="Search Page"
            >
              <Search size={18} className="shrink-0" />
            </Link>

            {/* ACCOUNT ICON */}
            <Link
              to="/account"
              className="text-white/70 hover:text-white transition-colors p-2 flex items-center justify-center rounded-full active:scale-95 shrink-0 min-w-[36px] min-h-[36px]"
              aria-label="Account Portal"
            >
              <User size={18} className="shrink-0" />
            </Link>

            {/* CART ICON */}
            <Link
              to="/cart"
              className="relative text-white/70 hover:text-white transition-colors p-2 flex items-center justify-center rounded-full active:scale-95 shrink-0 min-w-[36px] min-h-[36px]"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={18} className="shrink-0" />
              {getCartCount() > 0 && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-black text-white shadow-md leading-none"
                  style={{ backgroundColor: brandBlue }}
                >
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>

          {/* BOUNCING ORDER CTA BUTTON */}
          <Link to="/order" className="shrink-0 flex items-center ml-0.5 min-[360px]:ml-1">
            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-white hover:to-white hover:text-blue-600 font-black text-[9px] min-[360px]:text-[10px] uppercase tracking-wider min-[360px]:tracking-widest px-2.5 min-[360px]:px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-xl shadow-blue-600/10 active:scale-95 whitespace-nowrap border border-transparent hover:border-blue-600 animate-bounce">
              Order Now
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE DISPLAY SYSTEM PORT OVERLAY MAP */}
      <div
        className={`fixed inset-0 bg-black/98 transition-all duration-300 flex flex-col justify-between z-[900] pt-20 pb-8 px-6 lg:hidden h-[100dvh] overflow-y-auto ${
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center gap-4 text-center w-full max-w-xs mx-auto my-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm min-[360px]:text-base sm:text-lg uppercase tracking-[0.2em] font-black text-white/80 hover:text-blue-500 transition-colors py-2.5 block w-full border-b border-white/10 active:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/order"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-white hover:to-white hover:text-blue-600 px-8 py-3 rounded-full text-white font-black uppercase tracking-widest text-xs transition-all w-full block text-center border border-transparent hover:border-blue-600 shadow-lg active:scale-95"
          >
            Order Now
          </Link>
        </div>

        <div className="text-center pt-6 text-[10px] text-white/40 uppercase tracking-widest">
          STYLERHUB &copy; {new Date().getFullYear()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;