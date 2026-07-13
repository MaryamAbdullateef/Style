import React, { useState, useMemo } from "react";
import { FiShoppingBag as FiShoppingBagIcon } from "react-icons/fi";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom"; // Import Router Engine

const womenCategories = ["Dresses", "Tops", "Trousers", "Outerwear", "Accessories"];

const womenAdjectives = [
  "Silk", "Linen", "Satin", "Floral", "Structured", "Boho", "Chic", "Knitwear", 
  "Pleated", "Velvet", "Monochrome", "Asymmetric", "Tailored", "Couture", "Minimal", "Resort"
];

const womenItemsPool = {
  Dresses: ["Wrap Dress", "Midi Skirt Set", "Slip Dress", "Maxi Gown", "Evening Dress"],
  Tops: ["Blouse", "Crop Top", "Ribbed Bodysuit", "Silk Camisole", "Corset Top"],
  Trousers: ["Wide Leg Trousers", "High-Waist Pants", "Tailored Shorts", "Culottes", "Straight Denim"],
  Outerwear: ["Blazer Set", "Trench Coat", "Bouclé Jacket", "Cardigan Shrug", "Leather Jacket"],
  Accessories: ["Structured Tote", "Leather Mules", "Statement Belt", "Clutch Bag", "Drop Earrings"]
};

const womenImageSeeds = [
  "1494790108377-be9c29b29330", "1524504388940-b1c1722653e1", "1509631179647-0177331693ae",
  "1515886657613-9f3515b0c78f", "1485462537746-965f33f7f6a7", "1539109136881-3be0616acf4b",
  "1554412933-514a83d2f3c8", "1609357605129-26f69add5d6e", "1487222477894-8943e31ef7b2",
  "1581044777550-4cfa60707c03", "1469334031218-e382a71b716b", "1566207274740-0f8cf6b7d5a5"
];

const womenProducts = Array.from({ length: 200 }, (_, i) => {
  const category = womenCategories[i % womenCategories.length];
  const items = womenItemsPool[category];
  const adj = womenAdjectives[(i + Math.floor(i / 4)) % womenAdjectives.length];
  const itemType = items[Math.floor(i / womenCategories.length) % items.length];
  
  const name = `${adj} ${itemType} Edt. ${Math.floor(i / 20) + i + 1}`;
  const tags = ["New", "Sale", "Exclusive", ""];
  const tag = tags[i % tags.length];
  const price = 17500 + (i * 550);
  
  const seed = womenImageSeeds[i % womenImageSeeds.length];
  const queryKeyword = `${category.toLowerCase()},women,style,runway`;
  const img = `https://images.unsplash.com/photo-${seed}?w=600&auto=format&fit=crop&q=80&sig=${i + 300}&q=${queryKeyword}`;

  return { id: 300 + i, name, price, tag, category, img };
});

export default function Women({ onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const brandBlue = "#0070f3";
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Setup navigation engine

  const handleAddToCart = (product, e) => {
    e.stopPropagation(); // Shield item details link callback execution mapping
    addToCart(product);
    if (onAddToCart) onAddToCart(product);
  };

  const handleProductClick = (product) => {
    navigate("/product-details", { state: { product } });
  };

  const filteredProducts = useMemo(() => {
    return activeFilter === "All" ? womenProducts : womenProducts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#020202] text-white pt-16 pb-16 md:pb-24">
      {/* 1. Pre-navbar label with clean spacing properties */}
      <div className="w-full text-center mb-8 px-6">
        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">
          GLOBAL ARCHIVE // LUXURY READY-TO-WEAR
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* 2. 3D Cube asset layout alignment element before header context */}
        <div className="w-full flex items-center justify-center mb-10">
          <div className="cube-wrapper relative w-12 h-12">
            <div className="cube-mesh">
              <div className="face top" style={{ borderColor: brandBlue }}></div>
              <div className="face bottom" style={{ borderColor: brandBlue }}></div>
              <div className="face left" style={{ borderColor: brandBlue }}></div>
              <div className="face right" style={{ borderColor: brandBlue }}></div>
              <div className="face front" style={{ borderColor: brandBlue }}></div>
              <div className="face back" style={{ borderColor: brandBlue }}></div>
            </div>
          </div>
        </div>

        {/* Restructured Clean Header (Search tools removed completely) */}
        <div className="mb-16 md:mb-20 w-full">
          <span style={{ color: brandBlue }} className="text-xs font-black tracking-widest uppercase">STYLERHUB WOMAN</span>
          <h1 className="text-4xl font-black uppercase italic mt-1">Women & Haute Department</h1>
        </div>

        {/* Brand Presentation Block with Custom Infinite-Scroll Text Marquee */}
        <div className="mb-16 md:mb-24 max-w-full border-l-2 pl-4 transition-all duration-300 overflow-hidden" style={{ borderColor: brandBlue }}>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-wide text-white">
            Discover Our Women's Collection
          </h2>
          
          {/* Loop-optimized Marquee Track (Pauses on Hover) */}
          <div className="relative flex overflow-x-hidden w-full mt-2 group cursor-pointer">
            <div className="animate-marquee whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Curated minimalist silhouettes, premium tailoring, and contemporary essentials.</span>
              <span>• Luxury Textiles Designed for Elevated Daily Wear and Runway Aesthetics.</span>
              <span>• Discover Exceptional Dresses, Tailored Tops, and Signature Accessories.</span>
            </div>
            <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-16 text-xs md:text-sm text-white/60 font-medium leading-relaxed group-hover:[animation-play-state:paused]">
              <span>Curated minimalist silhouettes, premium tailoring, and contemporary essentials.</span>
              <span>• Luxury Textiles Designed for Elevated Daily Wear and Runway Aesthetics.</span>
              <span>• Discover Exceptional Dresses, Tailored Tops, and Signature Accessories.</span>
            </div>
          </div>
        </div>

        {/* Filter Controls layout parameters */}
        <div className="flex gap-2 items-center justify-start md:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none w-full">
          {["All", "Dresses", "Tops", "Trousers", "Outerwear", "Accessories"].map((f) => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)} 
              className="px-6 py-2.5 text-xs font-black uppercase border border-white/10 tracking-widest transition-all duration-200 shrink-0 hover:bg-white/[0.02] hover:border-white/30" 
              style={activeFilter === f ? { backgroundColor: brandBlue, borderColor: brandBlue } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Standard grid alignment mapping parameters & product display templates */}
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
                    <FiShoppingBagIcon /> ADD TO CART 
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

      {/* Embedded CSS Engine Stylesheet to handle custom Marquee and 3D Cube natively */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        @keyframes cubeRotation {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 30s linear infinite;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .cube-wrapper {
          perspective: 400px;
        }
        .cube-mesh {
          width: 100%;
          height: 100%;
          position: absolute;
          transform-style: preserve-3d;
          animation: cubeRotation 12s linear infinite;
        }
        .face {
          position: absolute;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(0, 0, 0, 0.4);
        }
        .front  { transform: rotateY(0deg) translateZ(24px); }
        .back   { transform: rotateY(180deg) translateZ(24px); }
        .right  { transform: rotateY(90deg) translateZ(24px); }
        .left   { transform: rotateY(-90deg) translateZ(24px); }
        .top    { transform: rotateX(90deg) translateZ(24px); }
        .bottom { transform: rotateX(-90deg) translateZ(24px); }
      `}</style>
    </main>
  );
}