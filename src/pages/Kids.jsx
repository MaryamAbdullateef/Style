import React, { useState, useMemo } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Import Router Engine Setup

const kidsAdjectives = ["Organic", "Mini", "Playful", "Toddler", "Junior", "Classic", "Cozy", "Active", "Comfy", "Premium"];

const kidsDescriptions = {
  Boys: ["Chino Shorts Set", "Denim Dungarees", "Graphic Varsity Tee", "Plaid Button-Up", "Tracksuit Set"],
  Girls: ["Linen Sun Dress", "Floral Skirt Combo", "Tulle Party Dress", "Ribbed Knit Cardigan", "Satin Bow Blouse"],
  Unisex: ["Organic Cotton Onesie", "Cozy Fleece Sweatshirt", "Canvas Overalls", "Ribbed Loungewear", "Pocket Romper"]
};

const kidsImageSeeds = [
  "1519457431-44ced64a64e7", "1602810318383-e386cc2a3ccf", "1503919545889-aef636e10ad4",
  "1622290319146-7b12c071b521", "1519238263530-99bdd11df2ea", "1566492031773-4f4e44671857"
];

const kidProducts = Array.from({ length: 150 }, (_, i) => {
  const segments = ["Boys", "Girls", "Unisex"];
  const category = segments[i % segments.length];
  const descriptionsList = kidsDescriptions[category];
  
  const adj = kidsAdjectives[i % kidsAdjectives.length];
  // Secure dynamic matching within category scope array
  const description = descriptionsList[Math.floor(i / segments.length) % descriptionsList.length];
  
  const name = `${adj} ${description} No. ${i + 1}`;
  const price = 8500 + (i * 380);
  
  const tags = ["New", "Trending", "Sale", ""];
  const tag = tags[i % tags.length];

  const seed = kidsImageSeeds[i % kidsImageSeeds.length];
  const queryKeyword = `${category.toLowerCase()},child,kid,apparel`;
  const img = `https://images.unsplash.com/photo-${seed}?w=600&auto=format&fit=crop&q=80&sig=${i + 600}&q=${queryKeyword}`;

  return { id: 500 + i, name, price, tag, category, img };
});

export default function Kids({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const brandBlue = "#0070f3";
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Initialize routing framework link hook

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Avoid triggering full screen card component redirect mappings
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  };

  const handleProductClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredProducts = useMemo(() => {
    return activeFilter === "All" ? kidProducts : kidProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#020202] text-white py-16 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* Restructured Clean Header (Search tools removed completely) */}
        <div className="mb-16 md:mb-20">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">STYLERHUB JUNIOR</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Kids & Junior Department</h1>
        </div>

        {/* Brand Presentation Text Block with Spacing and Maintained Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Kids Collection
          </h2>
          
          {/* Smooth, Infinite-Loop CSS Marquee Container */}
          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore comfortable, stylish, and trendy outfits designed for every child.</span>
              <span>• Premium Organic Textiles Crafted for Daily Adventures.</span>
              <span>• Shop Essential Sets, Dungarees, and Party Wear.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Explore comfortable, stylish, and trendy outfits designed for every child.</span>
              <span>• Premium Organic Textiles Crafted for Daily Adventures.</span>
              <span>• Shop Essential Sets, Dungarees, and Party Wear.</span>
            </div>
          </div>
        </div>

        {/* Clean Filter Controls */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10">
          {["All", "Boys", "Girls", "Unisex"].map((f) => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)} 
              className="px-5 py-2 text-xs font-black uppercase border border-white/10 transition-colors duration-200" 
              style={activeFilter === f ? { backgroundColor: brandBlue, borderColor: brandBlue } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid Presentation Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div 
              key={p.id} 
              onClick={() => handleProductClick(p)}
              className="group bg-[#0d0d0d] border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-white/10"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white/5">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-end transition-opacity">
                  <button onClick={(e) => handleAddToCart(p, e)} className="w-full py-4 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-2" style={{ backgroundColor: brandBlue }}>
                    <FiShoppingBag /> ADD TO CART  
                  </button>
                </div>
              </div>
              <div className="p-4 flex justify-between items-start">
                <div>
                  <p className="text-[9px] uppercase font-black tracking-wider" style={{ color: brandBlue }}>{p.category}</p>
                  <h3 className="text-sm font-bold text-white/90 line-clamp-1">{p.name}</h3>
                </div>
                <p className="text-sm font-black">₦{p.price.toLocaleString()}</p>
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
          animation: marquee 25s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 25s linear infinite;
        }
      `}</style>
    </main>
  );
}