import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiShoppingBag } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";

const navLinks = [
  { label: "Women", to: "/women", type: "route" },
  { label: "Men", to: "/men", type: "route" },
  { label: "Kids", to: "/kids", type: "route" },
  { label: "About", to: "about", type: "scroll" },
  { label: "Contact", to: "/contact", type: "route" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-black/95 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-display text-2xl tracking-[0.15em] text-white"
        >
          STYLER<span className="text-brand-blue">HUB</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.type === "scroll" && pathname === "/" ? (
              <li key={l.label}>
                <ScrollLink
                  to={l.to}
                  spy smooth offset={-80} duration={600}
                  className={`text-xs tracking-[0.18em] uppercase cursor-pointer transition-colors duration-200 hover:text-brand-blue text-white/70`}
                >
                  {l.label}
                </ScrollLink>
              </li>
            ) : (
              <li key={l.label}>
                <Link
                  to={l.type === "scroll" ? "/" : l.to}
                  className={`text-xs tracking-[0.18em] uppercase transition-colors duration-200 ${
                    pathname === l.to
                      ? "text-brand-blue"
                      : "text-white/70 hover:text-brand-blue"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right */}
        <div className="hidden md:flex items-center gap-4">
          <FiShoppingBag className="text-white/60 hover:text-brand-blue cursor-pointer transition-colors" size={20} />
          <Link
            to="/order"
            className="bg-brand-blue hover:bg-blue-700 text-white text-xs tracking-[0.15em] uppercase font-medium px-6 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
          >
            Order Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-brand-black border-t border-white/10 px-5 py-6 space-y-4 animate-fadeUp">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.type === "scroll" ? "/" : l.to}
              onClick={() => setOpen(false)}
              className="block text-sm tracking-[0.15em] uppercase text-white/70 hover:text-brand-blue transition-colors py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/order"
            onClick={() => setOpen(false)}
            className="block mt-2 bg-brand-blue text-white text-center text-sm tracking-[0.15em] uppercase font-medium px-6 py-3 w-full"
          >
            Order Now
          </Link>
        </div>
      )}
    </nav>
  );
}