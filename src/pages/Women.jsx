import React, { useState } from "react"; // Added useState
import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";

const products = [
  { id: 1, name: "Silk Wrap Dress", price: "₦42,000", tag: "New", category: "Dresses", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" },
  { id: 2, name: "Linen Blazer Set", price: "₦55,000", tag: "New", category: "Outerwear", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600" },
  { id: 3, name: "Camel Trench Coat", price: "₦85,000", tag: "", category: "Outerwear", img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600" },
  { id: 4, name: "Floral Midi Skirt", price: "₦28,000", tag: "Sale", category: "Dresses", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600" },
  { id: 5, name: "Knitwear Set", price: "₦32,000", tag: "", category: "Tops", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600" },
  { id: 6, name: "Structured Tote", price: "₦24,500", tag: "Sale", category: "Accessories", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
  { id: 7, name: "Satin Slip Dress", price: "₦35,000", tag: "New", category: "Dresses", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600" },
  { id: 8, name: "Wide Leg Trousers", price: "₦18,000", tag: "", category: "Trousers", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" },
  { id: 9, name: "Gold Hoop Earrings", price: "₦8,500", tag: "Sale", category: "Accessories", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600" },
  { id: 10, name: "Oversized White Shirt", price: "₦22,000", tag: "", category: "Tops", img: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?w=600" },
  { id: 11, name: "Minimalist Heels", price: "₦45,000", tag: "New", category: "Accessories", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600" },
  { id: 12, name: "Denim Jacket", price: "₦38,000", tag: "Sale", category: "Outerwear", img: "https://images.unsplash.com/photo-1527010154944-f2241763d806?w=600" },
  { id: 13, name: "Pleated Maxi", price: "₦30,000", tag: "", category: "Dresses", img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600" },
  { id: 14, name: "Leather Corset Top", price: "₦25,000", tag: "New", category: "Tops", img: "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?w=600" },
  { id: 15, name: "Velvet Evening Gown", price: "₦120,000", tag: "Exclusive", category: "Dresses", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600" },
  { id: 16, name: "Cropped Cardigan", price: "₦15,000", tag: "Sale", category: "Tops", img: "https://images.unsplash.com/photo-1583846783202-3c403370d068?w=600" },
  { id: 17, name: "Utility Cargos", price: "₦26,000", tag: "", category: "Trousers", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600" },
  { id: 18, name: "Straw Sun Hat", price: "₦12,000", tag: "Sale", category: "Accessories", img: "https://images.unsplash.com/photo-1572451479139-6a308211d8be?w=600" },
  { id: 19, name: "Boho Blouse", price: "₦19,500", tag: "", category: "Tops", img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600" },
  { id: 20, name: "Chain Link Necklace", price: "₦10,000", tag: "New", category: "Accessories", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600" },
];

const filters = ["All", "Dresses", "Tops", "Trousers", "Outerwear", "Accessories"];

export default function Women() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Logic: Filter products based on active selection
  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Editorial Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#0a0a0a]" />

        <div className="relative z-10 text-center space-y-4 px-4">
          <p className="text-[10px] tracking-[0.5em] uppercase text-brand-blue font-bold">StyleHub Collective</p>
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">
            Women's <span className="text-white/80">Shop</span>
          </h1>
        </div>
      </section>

      {/* Interactive Navigation Filter */}
      <nav className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/5">
        <div className="flex justify-center gap-6 md:gap-10 py-6 px-5 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`group relative text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 ${
                activeFilter === f ? "text-brand-blue" : "text-gray-500 hover:text-white"
              }`}
            >
              {f}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-brand-blue transition-all duration-300 ${
                activeFilter === f ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </button>
          ))}
        </div>
      </nav>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-16">
        {/* Counter to show how many items are found */}
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-10">
          Showing {filteredProducts.length} Results for <span className="text-white">{activeFilter}</span>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((p) => (
            <div key={p.id} className="group relative animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#151515] rounded-sm">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out"
                />
                
                {/* Sale/New Badge */}
                {p.tag && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`text-[8px] font-black tracking-widest px-3 py-1.5 uppercase ${
                      p.tag === "Sale" ? "bg-red-600 text-white" : "bg-brand-blue text-white"
                    }`}>
                      {p.tag}
                    </span>
                  </div>
                )}

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-4">
                   <button className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-brand-blue hover:text-white transition-colors">
                    <FiShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 flex justify-between items-start border-l border-white/5 pl-4">
                <div className="space-y-1">
                  <p className="text-[9px] text-brand-blue uppercase font-bold tracking-widest">{p.category}</p>
                  <h3 className="text-sm font-light tracking-wide text-gray-200">{p.name}</h3>
                </div>
                <p className="text-sm font-medium text-white">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stylish CTA Section */}
      <section className="bg-white text-black py-24 px-6 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter">Your style journey begins here.</h2>
          <Link
            to="/order"
            className="group inline-flex items-center gap-6 border-b-2 border-black pb-2 text-xs font-black uppercase tracking-[0.3em] hover:text-brand-blue hover:border-brand-blue transition-all"
          >
            Go to Checkout
            <FiArrowRight className="group-hover:translate-x-3 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 border-t border-white/5 bg-[#080808]">
        <p className="text-[10px] tracking-[0.4em] uppercase">StyleHub Fashion House • Est. 2026</p>
      </footer>
    </main>
  );
}