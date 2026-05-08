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

  // Memoize filtered products to optimize performance
  const filteredProducts = useMemo(() => {
    return activeFilter === "All"
      ? products
      : products.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-brand-blue selection:text-white">
      {/* Editorial Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80"
          alt="StyleHub Women's Collection"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-40 scale-100 transition-transform duration-[10s] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />

        <div className="relative z-10 text-center space-y-6 px-4">
          <p className="text-[10px] tracking-[0.6em] uppercase text-brand-blue font-bold animate-pulse">
            StyleHub Collective
          </p>
          <h1 className="text-6xl md:text-9xl font-serif italic tracking-tighter leading-none">
            Women's <span className="text-white/70 block md:inline">Shop</span>
          </h1>
          <p className="max-w-md mx-auto text-gray-400 text-xs tracking-widest uppercase font-light leading-loose">
            Curated pieces for the modern woman. Elegance redefined through
            minimalist silhouettes.
          </p>
        </div>
      </section>

      {/* Interactive Navigation Filter */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-y border-white/5">
        <div className="max-w-[1400px] mx-auto flex justify-center gap-6 md:gap-12 py-6 px-5 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`group relative text-[11px] tracking-[0.25em] uppercase font-bold transition-all duration-500 whitespace-nowrap ${
                activeFilter === f
                  ? "text-brand-blue"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {f}
              <span
                className={`absolute -bottom-2 left-0 h-[1px] bg-brand-blue transition-all duration-500 ${
                  activeFilter === f ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Product Grid */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-2xl font-serif italic mb-2">The Collection</h2>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
              Showing {filteredProducts.length} Results for{" "}
              <span className="text-brand-blue">{activeFilter}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 text-gray-500 border-b border-white/10 pb-1 w-full md:w-auto">
            <FiSearch size={14} />
            <input
              type="text"
              placeholder="SEARCH COLLECTION"
              className="bg-transparent border-none text-[10px] tracking-widest focus:outline-none focus:ring-0 w-full"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col transition-all duration-700 animate-in fade-in slide-in-from-bottom-6"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111] rounded-[2px]">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-out"
                  />

                  {/* Badge */}
                  {p.tag && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`text-[9px] font-bold tracking-tighter px-2.5 py-1 uppercase shadow-2xl ${
                          p.tag === "Sale"
                            ? "bg-red-600 text-white"
                            : p.tag === "Exclusive"
                              ? "bg-amber-500 text-black"
                              : "bg-brand-blue text-white"
                        }`}
                      >
                        {p.tag}
                      </span>
                    </div>
                  )}

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-0">
                    <button className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-blue hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                      <FiShoppingBag size={15} />
                      Quick Purchase
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="mt-6 flex justify-between items-start">
                  <div className="space-y-1.5">
                    <p className="text-[9px] text-brand-blue uppercase font-black tracking-[0.2em]">
                      {p.category}
                    </p>
                    <h3 className="text-sm font-light tracking-wide text-gray-100 group-hover:text-brand-blue transition-colors">
                      {p.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {p.price}
                    </p>
                    <p className="text-[8px] text-gray-600 tracking-tighter">
                      VAT INCL.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center border border-dashed border-white/10 rounded-lg">
            <p className="text-gray-500 tracking-[0.3em] uppercase text-xs">
              No items found in this category.
            </p>
          </div>
        )}
      </section>

      {/* Stylish CTA Section */}
      <section className="bg-white text-black py-32 px-6 mt-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400">
            Next Steps
          </p>
          <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter">
            Elevate your wardrobe.
          </h2>
          <div className="flex justify-center">
            <Link
              to="/order"
              className="group inline-flex items-center gap-8 border-b border-black pb-4 text-[11px] font-black uppercase tracking-[0.4em] hover:text-brand-blue hover:border-brand-blue transition-all"
            >
              Proceed to Checkout
              <FiArrowRight className="group-hover:translate-x-4 transition-transform duration-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center text-gray-500 border-t border-white/5 bg-[#080808]">
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.5em] uppercase font-bold">
            StyleHub Fashion House
          </p>
          <p className="text-[9px] tracking-widest text-gray-700">
            LAGOS • LONDON • NEW YORK
          </p>
          <div className="h-10 w-[1px] bg-white/10 mx-auto my-6" />
          <p className="text-[8px] tracking-[0.2em] opacity-40">
            © 2026 ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </main>
  );
}
