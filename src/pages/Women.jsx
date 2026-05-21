import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight, FiSearch } from "react-icons/fi";

const products = [
  {
    id: 1,
    name: "Silk Wrap Dress",
    price: "₦42,000",
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600",
  },
  {
    id: 2,
    name: "Linen Blazer Set",
    price: "₦55,000",
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600",
  },
  {
    id: 3,
    name: "Camel Trench Coat",
    price: "₦85,000",
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=600",
  },
  {
    id: 4,
    name: "Floral Midi Skirt",
    price: "₦28,000",
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
  },
  {
    id: 5,
    name: "Knitwear Set",
    price: "₦32,000",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
  },
  {
    id: 6,
    name: "Structured Tote",
    price: "₦24,500",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
  },
  {
    id: 7,
    name: "Satin Slip Dress",
    price: "₦35,000",
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
  },
  {
    id: 8,
    name: "Wide Leg Trousers",
    price: "₦18,000",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600",
  },
  {
    id: 9,
    name: "Gold Hoop Earrings",
    price: "₦8,500",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
  },
  {
    id: 10,
    name: "Oversized White Shirt",
    price: "₦22,000",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?w=600",
  },
  {
    id: 11,
    name: "Minimalist Heels",
    price: "₦45,000",
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
  },
  {
    id: 12,
    name: "Denim Jacket",
    price: "₦38,000",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1527010154944-f2241763d806?w=600",
  },
  {
    id: 13,
    name: "Pleated Maxi",
    price: "₦30,000",
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600",
  },
  {
    id: 14,
    name: "Leather Corset Top",
    price: "₦25,000",
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?w=600",
  },
  {
    id: 15,
    name: "Velvet Evening Gown",
    price: "₦120,000",
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
  },
  {
    id: 16,
    name: "Cropped Cardigan",
    price: "₦15,000",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1583846783202-3c403370d068?w=600",
  },
  {
    id: 17,
    name: "Utility Cargos",
    price: "₦26,000",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600",
  },
  {
    id: 18,
    name: "Straw Sun Hat",
    price: "₦12,000",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1572451479139-6a308211d8be?w=600",
  },
  {
    id: 19,
    name: "Boho Blouse",
    price: "₦19,500",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600",
  },
  {
    id: 20,
    name: "Chain Link Necklace",
    price: "₦10,000",
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
  },
];

const filters = [
  "All",
  "Dresses",
  "Tops",
  "Trousers",
  "Outerwear",
  "Accessories",
];

export default function Women() {
  const [activeFilter, setActiveFilter] = useState("All");
  const brandBlue = "#0070f3";

  // Memoize filtered products to optimize performance
  const filteredProducts = useMemo(() => {
    return activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-[#0070f3] selection:text-white overflow-x-hidden relative">
      
      {/* Decorative Brand Elements matching Hero */}
      <div className="absolute top-96 left-5 text-[10vw] font-black text-white/2 select-none pointer-events-none uppercase italic hidden md:block">
        Artisanal
      </div>

      {/* Ambient Lighting Glows */}
      <div
        className="absolute top-[10%] left-[-10%] w-96 h-96 rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ backgroundColor: brandBlue }}
      />
      <div
        className="absolute bottom-[30%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.12] pointer-events-none"
        style={{ backgroundColor: brandBlue }}
      />

      {/* Editorial Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden px-4">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="StylerHub Women's Collection"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-30 transition-transform duration-[10s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/50 via-transparent to-[#020202]" />

        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <p 
            className="text-[10px] tracking-[0.6em] uppercase font-black"
            style={{ color: brandBlue }}
          >
            StylerHub Collective 2026
          </p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
            Women's <span className="text-white/60 block sm:inline">Shop</span>
          </h1>
          <p className="max-w-md mx-auto text-white/40 text-xs md:text-sm tracking-widest uppercase font-medium leading-loose px-2">
            Curated pieces for the modern woman. Elegance redefined through
            minimalist silhouettes and premium Nigerian craft.
          </p>
        </div>
      </section>

      {/* Interactive Navigation Filter */}
      <nav className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-xl border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex justify-start md:justify-center gap-6 md:gap-12 py-6 px-6 overflow-x-auto overflow-y-hidden scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`group relative text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-black transition-all duration-300 whitespace-nowrap bg-transparent border-none cursor-pointer pb-1 ${
                activeFilter === f
                  ? "text-white"
                  : "text-white/40 hover:text-white"
              }`}
              style={activeFilter === f ? { color: brandBlue } : {}}
            >
              {f}
              <span
                className="absolute bottom-0 left-0 h-[2px] transition-all duration-300"
                style={{ 
                  backgroundColor: brandBlue,
                  width: activeFilter === f ? "100%" : "0%"
                }}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Product Grid Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-12 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight mb-2">The Collection</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
              Showing {filteredProducts.length} Results for{" "}
              <span style={{ color: brandBlue }}>{activeFilter}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-white/40 border-b border-white/10 pb-2 w-full md:w-72 focus-within:border-white transition-colors">
            <FiSearch size={14} style={{ color: brandBlue }} />
            <input
              type="text"
              placeholder="SEARCH PIECES"
              className="bg-transparent border-none p-0 text-[10px] tracking-widest text-white placeholder-white/30 focus:outline-none focus:ring-0 uppercase font-bold w-full"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 md:gap-y-24">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col transition-all duration-500"
              >
                {/* Image Wrap Box */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0d0d0d] rounded-2xl border border-white/5 shadow-xl">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dynamic Tag Overlay */}
                  {p.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`text-[9px] font-black tracking-widest px-3 py-1.5 uppercase rounded-md shadow-lg ${
                          p.tag === "Sale"
                            ? "bg-red-600 text-white"
                            : p.tag === "Exclusive"
                              ? "bg-amber-500 text-black"
                              : "text-white"
                        }`}
                        style={p.tag !== "Sale" && p.tag !== "Exclusive" ? { backgroundColor: brandBlue } : {}}
                      >
                        {p.tag}
                      </span>
                    </div>
                  )}

                  {/* Interactive Quick Add Overlay */}
                  <div className="absolute inset-0 bg-[#020202]/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-0">
                    <button 
                      className="w-full text-white py-5 text-[10px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-2xl"
                      style={{ backgroundColor: brandBlue }}
                    >
                      <FiShoppingBag size={14} />
                      Quick Purchase
                    </button>
                  </div>
                </div>

                {/* Product Metadata Context */}
                <div className="mt-5 flex justify-between items-start px-1">
                  <div className="space-y-1">
                    <p 
                      className="text-[9px] uppercase font-black tracking-[0.15em]"
                      style={{ color: brandBlue }}
                    >
                      {p.category}
                    </p>
                    <h3 className="text-sm font-bold text-white/90 tracking-wide uppercase transition-colors duration-300 group-hover:text-white">
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white tracking-tight">
                      {p.price}
                    </p>
                    <p className="text-[8px] text-white/20 tracking-tighter font-bold uppercase mt-0.5">
                      VAT INCL.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl bg-white/5 backdrop-blur-md">
            <p className="text-white/30 tracking-[0.3em] uppercase text-xs font-black">
              No items available inside this collection branch.
            </p>
          </div>
        )}
      </section>

      {/* Stylish Action Segment */}
      <section className="bg-white text-black py-24 md:py-32 px-6 mt-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-[10px] tracking-[0.5em] uppercase font-black text-black/30">
            Next Level Wardrobe
          </p>
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Elevate your presence.
          </h2>
          <div className="flex justify-center pt-4">
            <Link
              to="/order"
              className="group inline-flex items-center gap-6 border-b-2 border-black pb-3 text-[11px] font-black uppercase tracking-[0.35em] transition-all hover:border-blue-600 duration-300"
              style={{ "--hover-color": brandBlue }}
            >
              <span className="group-hover:text-[#0070f3] transition-colors duration-300">Proceed to Checkout</span>
              <FiArrowRight size={16} className="group-hover:translate-x-3 transition-transform duration-300 group-hover:text-[#0070f3]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Global Appended Minimal Stylesheet logic */}
      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Synchronized Footer Architecture */}
      <footer className="py-16 text-center text-white/30 border-t border-white/5 bg-[#010101] relative z-10 px-4">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.5em] uppercase font-black text-white/80">
            StylerHub Fashion House
          </p>
          <p className="text-[9px] tracking-[0.3em] text-white/40 font-bold">
            LAGOS • LONDON • NEW YORK
          </p>
          <div className="h-8 w-[1px] bg-white/10 mx-auto my-6" />
          <p className="text-[8px] tracking-[0.2em] font-medium text-white/20">
            © 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </main>
  );
}