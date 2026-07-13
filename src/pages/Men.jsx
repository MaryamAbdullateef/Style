import React, { useState, useMemo, useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom"; // Import Router Navigation Engine

const menCategories = ["Shirts", "Tees", "Trousers", "Outerwear", "Accessories"];

const adjectives = [
  "Premium", "Classic", "Slim Fit", "Tailored", "Urban", "Vintage", "Luxury", "Minimalist", 
  "Oversized", "Structured", "Modern", "Heritage", "Studio", "Essential", "Archival", "Techwear"
];

const itemsPool = {
  Shirts: ["Linen Shirt", "Oxford Button-Down", "Cuban Collar Shirt", "Chambray Shirt", "Flannel Piece"],
  Tees: ["Pique Polo", "Graphic Archive Tee", "Heavyweight Boxy Tee", "Slub Henley", "V-Neck Essential"],
  Trousers: ["Chino Pants", "Selvedge Denim", "Cargo Trousers", "Pleated Dress Pants", "Linen Slacks"],
  Outerwear: ["Suede Bomber", "Technical Windbreaker", "Denim Jacket", "Trench Coat", "Track Jacket"],
  Accessories: ["Leather Watch", "Polarized Sunglasses", "Minimalist Wallet", "Suede Belt", "Canvas Tote"]
};

const menImageSeeds = [
  "1534030347209-467a5b0ad3e6", "1505633560063-d824df76f744", "1479064555552-3ef4979f8908",
  "1516257984-b1b4d707412e", "1617137968427-85924c800a22", "1618886614638-80e3c103d31a",
  "1507679799987-c73779587ccf", "1492562080023-ab3db95bfbce", "1539571696357-5a69c17a67c6",
  "1624378439575-d8705ad7ae80", "1501196354995-cbb51c65aaea", "1488161628813-04466f872be2"
];

const menProducts = Array.from({ length: 200 }, (_, i) => {
  const category = menCategories[i % menCategories.length];
  const items = itemsPool[category];
  const adj = adjectives[i % adjectives.length];
  // Safe indexing fallback logic ensures an item type is always picked
  const itemType = items[(Math.floor(i / menCategories.length)) % items.length] || items[0];
  
  const name = `${adj} ${itemType} Vol. ${i + 1}`;
  const tags = ["New", "Sale", "Exclusive", "Trending", ""];
  const tag = tags[i % tags.length];
  const price = 14500 + (i * 450);
  
  const seed = menImageSeeds[i % menImageSeeds.length];
  const queryKeyword = `${category.toLowerCase()},men,fashion,clothing`;
  const img = `https://images.unsplash.com/photo-${seed}?w=600&auto=format&fit=crop&q=80&sig=${i}&q=${queryKeyword}`;

  return { id: 100 + i, name, price, tag, category, img };
});

export default function Men({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const gridRef = useRef(null);
  const brandBlue = "#0070f3";
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Navigation hook initialized

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Prevents triggering card layout open details click
    addToCart(product); 
    if (onAddToCart) onAddToCart(product); 
  };

  const handleProductClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredItems = useMemo(() => {
    return activeFilter === "All" ? menProducts : menProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  // Derived category list dynamically starting with "All"
  const navigationCategories = useMemo(() => ["All", ...menCategories], []);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Restructured Header Section (Search completely removed) */}
        <div className="mb-16 md:mb-20">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">MENSWEAR HOCKEOUT</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Men's Department</h1>
        </div>

        {/* Brand Presentation Text Block with Added Layout Spacing & Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Men's Collection
          </h2>
          
          {/* Smooth, Infinite-Loop CSS Marquee Container */}
          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore structural outerwear, fine tailored shirts, and contemporary street essentials.</span>
              <span>• Engineered Technical Textiles Built for Sophisticated Practicality.</span>
              <span>• Discover Essential Basics, Selvedge Denim, and Archive Pieces.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore structural outerwear, fine tailored shirts, and contemporary street essentials.</span>
              <span>• Engineered Technical Textiles Built for Sophisticated Practicality.</span>
              <span>• Discover Essential Basics, Selvedge Denim, and Archive Pieces.</span>
            </div>
          </div>
        </div>

        {/* Clean Filter Controls */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {navigationCategories.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2 text-xs font-black tracking-wider uppercase border border-white/10 transition-colors duration-200 shrink-0"
              style={activeFilter === f ? { backgroundColor: brandBlue, borderColor: brandBlue } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Untouched Grid Component Presentation Deck */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredItems.map((p) => (
            <div 
              key={p.id} 
              onClick={() => handleProductClick(p)}
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/10"
            >
              <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <button
                  onClick={(e) => handleAddToCart(p, e)}
                  className="absolute bottom-0 left-0 right-0 py-3 text-[11px] font-black uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                  style={{ backgroundColor: brandBlue }}
                >
                  <ShoppingBag size={14} /> Add To Cart
                </button>
              </div>
              <div className="p-4">
                <p className="text-[10px] opacity-40 font-bold uppercase tracking-wider">{p.category}</p>
                <h3 className="text-sm font-black mt-1 line-clamp-1">{p.name}</h3>
                <p className="font-black text-sm mt-2">₦{p.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded CSS Engine Stylesheet to handle custom Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 28s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}