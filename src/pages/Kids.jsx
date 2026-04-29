import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiStar, FiHeart } from "react-icons/fi";

const kidsProducts = [
  // DRESSES (10)
  {
    id: 1,
    name: "Tulle Party Dress",
    price: "₦15,500",
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1621452287533-b33cf5d70560?w=500",
  },
  {
    id: 2,
    name: "Cotton Sundress",
    price: "₦12,000",
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
  },
  {
    id: 3,
    name: "Floral Tiered Gown",
    price: "₦22,000",
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500",
  },
  {
    id: 4,
    name: "Velvet Ribbon Dress",
    price: "₦18,500",
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1603910309175-eb329f68892c?w=500",
  },
  {
    id: 5,
    name: "Denim Pinafore",
    price: "₦9,500",
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500",
  },
  {
    id: 6,
    name: "Lace Flower Girl Dress",
    price: "₦35,000",
    tag: "Exclusive",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1519234164112-1f3a2f8b584d?w=500",
  },
  {
    id: 7,
    name: "Polka Dot Midi",
    price: "₦14,000",
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500",
  },
  {
    id: 8,
    name: "Sparkle Mesh Dress",
    price: "₦25,000",
    tag: "New",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
  },
  {
    id: 9,
    name: "Linen Shift Dress",
    price: "₦11,000",
    tag: "Sale",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=500",
  },
  {
    id: 10,
    name: "Checkered Smock Dress",
    price: "₦13,500",
    tag: "",
    category: "Dresses",
    img: "https://images.unsplash.com/photo-1596450514735-373305607c3f?w=500",
  },

  // TOPS (10)
  {
    id: 11,
    name: "Graphic Dino Tee",
    price: "₦5,000",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1519235106638-30cc49b5fcfe?w=500",
  },
  {
    id: 12,
    name: "Striped Breton Top",
    price: "₦7,500",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1519457431-75514b723b69?w=500",
  },
  {
    id: 13,
    name: "Puff Sleeve Blouse",
    price: "₦9,000",
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1505377059068-e32585f9d17d?w=500",
  },
  {
    id: 14,
    name: "Basic Linen Shirt",
    price: "₦8,500",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1514311548104-ae305aac4688?w=500",
  },
  {
    id: 15,
    name: "Superhero Hoodie",
    price: "₦12,500",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
  },
  {
    id: 16,
    name: "Peter Pan Collar Top",
    price: "₦10,000",
    tag: "New",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=500",
  },
  {
    id: 17,
    name: "Tie-Dye Sweatshirt",
    price: "₦11,500",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500",
  },
  {
    id: 18,
    name: "Checked Flannel Shirt",
    price: "₦9,500",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1444124818704-4d89a495bdec?w=500",
  },
  {
    id: 19,
    name: "Embroidered Peplum",
    price: "₦12,000",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500",
  },
  {
    id: 20,
    name: "Rugby Polo Shirt",
    price: "₦8,000",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1603554162234-455b85e05141?w=500",
  },

  // TROUSERS/BOTTOMS (10)
  {
    id: 21,
    name: "Slim Fit Chinos",
    price: "₦10,500",
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1519457431-75514b723b69?w=500",
  },
  {
    id: 22,
    name: "Denim Jeggings",
    price: "₦7,500",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1537262107991-2244a13de401?w=500",
  },
  {
    id: 23,
    name: "Paperbag Waist Shorts",
    price: "₦6,000",
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1519235106638-30cc49b5fcfe?w=500",
  },
  {
    id: 24,
    name: "Corduroy Trousers",
    price: "₦13,000",
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500",
  },
  {
    id: 25,
    name: "Cargo Joggers",
    price: "₦9,500",
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1596450514735-373305607c3f?w=500",
  },
  {
    id: 26,
    name: "Seersucker Shorts",
    price: "₦5,500",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500",
  },
  {
    id: 27,
    name: "Tracksuit Bottoms",
    price: "₦8,000",
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
  },
  {
    id: 28,
    name: "Lace Edge Leggings",
    price: "₦4,500",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
  },
  {
    id: 29,
    name: "Suspender Pants",
    price: "₦14,500",
    tag: "New",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=500",
  },
  {
    id: 30,
    name: "Velvet Flare Pants",
    price: "₦11,000",
    tag: "Sale",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1603910309175-eb329f68892c?w=500",
  },

  // OUTERWEAR (10)
  {
    id: 31,
    name: "Puffer Jacket",
    price: "₦25,000",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1511406361295-0a1ff814c0ce?w=500",
  },
  {
    id: 32,
    name: "Raincoat with Ears",
    price: "₦15,000",
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1632053106316-249591456d6a?w=500",
  },
  {
    id: 33,
    name: "Denim Sherpa Jacket",
    price: "₦22,000",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1527633412781-f4044961556d?w=500",
  },
  {
    id: 34,
    name: "Wool Pea Coat",
    price: "₦30,000",
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1515488350384-11c1403c9514?w=500",
  },
  {
    id: 35,
    name: "Biker Faux Leather",
    price: "₦19,500",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500",
  },
  {
    id: 36,
    name: "Quilted Vest",
    price: "₦12,500",
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?w=500",
  },
  {
    id: 37,
    name: "Windbreaker Neon",
    price: "₦14,000",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1521674205156-f94d9307775c?w=500",
  },
  {
    id: 38,
    name: "Cardigan Knitted",
    price: "₦11,000",
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500",
  },
  {
    id: 39,
    name: "Fleece Zip-up",
    price: "₦9,500",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1473625247510-8ceb1760943f?w=500",
  },
  {
    id: 40,
    name: "Varsity Jacket",
    price: "₦20,000",
    tag: "",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1618517048181-422204c35a64?w=500",
  },

  // ACCESSORIES (10)
  {
    id: 41,
    name: "Glitter Sneakers",
    price: "₦12,000",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1514989125334-e8ef8016558a?w=500",
  },
  {
    id: 42,
    name: "Bunny Ear Beanie",
    price: "₦4,500",
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1520102188229-72ed277a02be?w=500",
  },
  {
    id: 43,
    name: "Leather School Bag",
    price: "₦18,000",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1544816153-12ad5d714b21?w=500",
  },
  {
    id: 44,
    name: "Bow Headband Set",
    price: "₦3,000",
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1617331721458-bd3bd3f9c7f8?w=500",
  },
  {
    id: 45,
    name: "Sunglasses Kids",
    price: "₦5,500",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1500336624523-d727130c3328?w=500",
  },
  {
    id: 46,
    name: "Canvas Slip-ons",
    price: "₦9,000",
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500",
  },
  {
    id: 47,
    name: "Animal Socks Pack",
    price: "₦4,000",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=500",
  },
  {
    id: 48,
    name: "Fairy Wand Set",
    price: "₦6,500",
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500",
  },
  {
    id: 49,
    name: "Tassel Scarf",
    price: "₦5,000",
    tag: "Sale",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1520903074185-8ec362b39c67?w=500",
  },
  {
    id: 50,
    name: "Mini Crossbody Bag",
    price: "₦8,500",
    tag: "New",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1513373319109-eb154073eb0b?w=500",
  },
];

const kidsFilters = [
  "All",
  "Dresses",
  "Tops",
  "Trousers",
  "Outerwear",
  "Accessories",
];

export default function Kids() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? kidsProducts
      : kidsProducts.filter((item) => item.category === activeFilter);

  return (
    <main className="min-h-screen bg-black text-[#2D2D2D]">
      {/* Playful Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1514090458221-65bb69cf63e9?w=1600&q=80"
          alt="Kids Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCF8]/90 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl w-full px-8 md:px-16">
          <div className="max-w-xl space-y-6">
            <span className="inline-block bg-brand-red text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full">
              StyleHub Junior
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-tight">
              Playful <br />
              <span className="italic text-brand-blue">Elegance.</span>
            </h1>
            <p className="text-sm font-medium tracking-wide text-gray-600 max-w-sm">
              Discover a collection where comfort meets high-fashion for the
              little trendsetters.
            </p>
          </div>
        </div>
      </section>

      {/* Modern Bubble Filters */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center gap-4 py-6 px-5 overflow-x-auto no-scrollbar">
          {kidsFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border-2 ${
                activeFilter === f
                  ? "bg-brand-blue border-brand-blue text-white shadow-lg scale-105"
                  : "bg-transparent border-gray-200 text-gray-400 hover:border-brand-blue hover:text-brand-blue"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </nav>

      {/* Dynamic Results Header */}
      <section className="max-w-7xl mx-auto px-8 pt-16">
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-6">
          <h2 className="text-2xl font-serif italic text-brand-blue">
            {activeFilter}{" "}
            <span className="text-gray-300 font-sans not-italic text-sm ml-2">
              / {filteredItems.length} styles
            </span>
          </h2>
          <div className="hidden md:flex gap-4 text-xs font-bold uppercase tracking-tighter text-gray-400">
            <span>Filter By Size</span>
            <span>•</span>
            <span>Sort By Latest</span>
          </div>
        </div>
      </section>

      {/* Grid - 50 Items */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredItems.map((p) => (
            <div key={p.id} className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50 shadow-sm">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Heart/Wishlist Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-gray-400 hover:text-brand-red transition-colors">
                  <FiHeart size={16} />
                </button>

                {p.tag && (
                  <span
                    className={`absolute top-4 left-4 text-[8px] font-black tracking-widest px-3 py-1 rounded-full uppercase ${
                      p.tag === "Sale"
                        ? "bg-brand-red text-white"
                        : "bg-brand-blue text-white"
                    }`}
                  >
                    {p.tag}
                  </span>
                )}

                {/* Quick Add - Vertical Style */}
                <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-black text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <FiShoppingBag size={14} /> Quick Add
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-center">
                <h3 className="text-sm font-medium text-gray-800">{p.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-bold text-brand-blue">
                    {p.price}
                  </span>
                  {p.tag === "Sale" && (
                    <span className="text-[10px] line-through text-gray-400">
                      ₦25,000
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creative Newsletter / Giving Section */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="bg-brand-blue rounded-[3rem] p-12 md:p-24 text-white text-center relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <FiStar className="mx-auto text-brand-red text-4xl animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-serif italic">
              Join the StyleHub Club
            </h2>
            <p className="max-w-md mx-auto text-sm text-white/80 tracking-widest leading-loose">
              Get exclusive early access to our seasonal sales and limited
              edition drops for your little ones.
            </p>
            <Link
              to="/order"
              className="inline-block bg-white text-black px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-brand-red hover:text-white transition-all shadow-xl"
            >
              Start Shopping Now
            </Link>
          </div>
          {/* Decorative shapes */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-red/20 rounded-full blur-3xl" />
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-100">
        <p className="text-[10px] tracking-[0.5em] uppercase">
          StyleHub Kids Division • 2026
        </p>
      </footer>
    </main>
  );
}
