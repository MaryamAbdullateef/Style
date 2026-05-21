import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "All",
  "Boys",
  "Girls",
  "Casual",
  "Traditional",
  "Party Wear",
  "Summer",
  "Winter",
];

const products = [
  {
    id: 1,
    name: "Sunshine Linen Shorts Set",
    price: "₦8,500",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    tag: "New",
  },
  {
    id: 2,
    name: "Floral Tiered Sundress",
    price: "₦11,200",
    category: "Girls",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 3,
    name: "Ankara Festival Suit",
    price: "₦19,000",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80",
    tag: "New",
  },
  {
    id: 4,
    name: "Sparkle Party Gown",
    price: "₦24,500",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 5,
    name: "Cozy Fleece Jogger Set",
    price: "₦13,000",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 6,
    name: "Rainbow Stripe Tee & Skirt",
    price: "₦9,800",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    tag: "New",
  },
  {
    id: 7,
    name: "Denim Dungaree Explorer",
    price: "₦14,200",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 8,
    name: "Adire Buba & Sokoto",
    price: "₦21,000",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&q=80",
    tag: "New",
  },
  {
    id: 9,
    name: "Tutu Ballet Party Dress",
    price: "₦18,700",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 10,
    name: "Polar Bear Puffer Jacket",
    price: "₦22,000",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    tag: "New",
  },
  {
    id: 11,
    name: "Mango Smocked Dress",
    price: "₦10,500",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 12,
    name: "Checkered Blazer Set",
    price: "₦16,800",
    category: "Party Wear",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80",
    tag: "New",
  },
  {
    id: 13,
    name: "Kente Print Dress",
    price: "₦20,500",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 14,
    name: "Sherpa Hoodie & Legging",
    price: "₦15,000",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 15,
    name: "Tropical Print Swimsuit",
    price: "₦7,200",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80",
    tag: "New",
  },
  {
    id: 16,
    name: "Velvet Bow Party Dress",
    price: "₦27,000",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 17,
    name: "Cargo Adventure Shorts",
    price: "₦6,500",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 18,
    name: "Agbada Junior Set",
    price: "₦32,000",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80",
    tag: "New",
  },
  {
    id: 19,
    name: "Pastel Pinafore Dress",
    price: "₦9,000",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    tag: "New",
  },
  {
    id: 20,
    name: "Winter Knit Romper",
    price: "₦12,500",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 21,
    name: "Graphic Dino Tee & Jeans",
    price: "₦8,900",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 22,
    name: "Cotton Kaftan Girls",
    price: "₦14,000",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "New",
  },
  {
    id: 23,
    name: "Confetti Party Romper",
    price: "₦16,200",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 24,
    name: "Beach Linen Trousers",
    price: "₦7,800",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 25,
    name: "Glitter Sneaker Dress",
    price: "₦20,000",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80",
    tag: "New",
  },
  {
    id: 26,
    name: "Padded Ski Jacket Boys",
    price: "₦25,500",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    tag: "New",
  },
  {
    id: 27,
    name: "Embroidered Isiagu Shirt",
    price: "₦18,000",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 28,
    name: "Tie-Dye Playsuit",
    price: "₦8,200",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 29,
    name: "Varsity Jacket & Chinos",
    price: "₦17,500",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80",
    tag: "New",
  },
  {
    id: 30,
    name: "Sequin Skirt Set",
    price: "₦22,300",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 31,
    name: "Cable-Knit Sweater & Cord",
    price: "₦14,700",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 32,
    name: "Print Wrap Skirt Blouse",
    price: "₦11,000",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "New",
  },
  {
    id: 33,
    name: "Polo & Khaki Shorts",
    price: "₦9,500",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    tag: "New",
  },
  {
    id: 34,
    name: "Flamingo Swim Dress",
    price: "₦8,000",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 35,
    name: "Prince Charming Tuxedo",
    price: "₦35,000",
    category: "Party Wear",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80",
    tag: "New",
  },
  {
    id: 36,
    name: "Fleece-Lined Legging Set",
    price: "₦10,200",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 37,
    name: "Batiked Shorts & Tank",
    price: "₦7,500",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80",
    tag: "New",
  },
  {
    id: 38,
    name: "Lace Overlay Party Gown",
    price: "₦29,000",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 39,
    name: "Wax Print Straight Trousers",
    price: "₦13,500",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 40,
    name: "Denim Jacket & Floral Dress",
    price: "₦15,800",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    tag: "New",
  },
  {
    id: 41,
    name: "Pom-Pom Beanie & Coat",
    price: "₦19,200",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 42,
    name: "Striped Sailor Top & Shorts",
    price: "₦8,700",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 43,
    name: "Butterfly Chiffon Dress",
    price: "₦12,000",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    tag: "New",
  },
  {
    id: 44,
    name: "Yoruba Aso-Oke Mini Set",
    price: "₦26,000",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 45,
    name: "Neon Windbreaker & Jogger",
    price: "₦16,500",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80",
    tag: "New",
  },
  {
    id: 46,
    name: "Mermaid Pageant Gown",
    price: "₦38,000",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    tag: "New",
  },
  {
    id: 47,
    name: "Corduroy Overall & Shirt",
    price: "₦11,500",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 48,
    name: "Snow Suit Quilted Girls",
    price: "₦28,000",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600&q=80",
    tag: "New",
  },
  {
    id: 49,
    name: "Hemp Shorts & Linen Top",
    price: "₦7,000",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 50,
    name: "Smart Shirt & Chino Boys",
    price: "₦12,800",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 51,
    name: "Iro & Buba Junior Set",
    price: "₦22,500",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "New",
  },
  {
    id: 52,
    name: "Dragon Emboss Hoodie",
    price: "₦14,000",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 53,
    name: "Daisy Patch Overalls",
    price: "₦10,000",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 54,
    name: "Gold-Trim Prince Kaftan",
    price: "₦30,000",
    category: "Traditional",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=600&q=80",
    tag: "New",
  },
  {
    id: 55,
    name: "Cotton Halter Jumpsuit",
    price: "₦9,300",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    tag: "New",
  },
  {
    id: 56,
    name: "Bowtie & Suspender Set",
    price: "₦17,000",
    category: "Party Wear",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 57,
    name: "Cloud Print Pyjama Set",
    price: "₦6,800",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 58,
    name: "Ruffle Hem Party Skirt",
    price: "₦13,700",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=600&q=80",
    tag: "New",
  },
  {
    id: 59,
    name: "Sherpa-Lined Denim Jacket",
    price: "₦20,800",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    tag: "New",
  },
  {
    id: 60,
    name: "Watercolour Print Blouse",
    price: "₦8,500",
    category: "Casual",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 61,
    name: "Khaki Explorer Cargo Set",
    price: "₦11,200",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 62,
    name: "Organza Ball Gown",
    price: "₦42,000",
    category: "Party Wear",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80",
    tag: "New",
  },
  {
    id: 63,
    name: "Ankara Crop Top & Skirt",
    price: "₦16,000",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 64,
    name: "Hooded Towel Cape Boys",
    price: "₦5,500",
    category: "Summer",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1560090995-01632a28895b?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 65,
    name: "Cashmere Turtleneck Girls",
    price: "₦18,500",
    category: "Winter",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1508280756091-9bdd7ef1f463?w=600&q=80",
    tag: "New",
  },
  {
    id: 66,
    name: "Formal 3-Piece Boys Suit",
    price: "₦33,000",
    category: "Party Wear",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=600&q=80",
    tag: "Trending",
  },
  {
    id: 67,
    name: "Boho Sundress with Belt",
    price: "₦10,700",
    category: "Summer",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1519278409-1f56fdda7fe5?w=600&q=80",
    tag: "New",
  },
  {
    id: 68,
    name: "Arctic Explorer Snowsuit",
    price: "₦31,000",
    category: "Winter",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80",
    tag: "Sale",
  },
  {
    id: 69,
    name: "Graphic Tracksuit Set",
    price: "₦13,200",
    category: "Casual",
    gender: "Boys",
    image:
      "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=600&q=80",
    tag: "New",
  },
  {
    id: 70,
    name: "Igbo George Blouse Set",
    price: "₦24,000",
    category: "Traditional",
    gender: "Girls",
    image:
      "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
    tag: "Trending",
  },
];

// ─── TAG CONFIG ──────────────────────────────────────────────────────────────
const tagConfig = {
  New: { bg: "bg-blue-600/80 border border-blue-500/30", text: "text-white" },
  Trending: { bg: "bg-white/10 backdrop-blur-md border border-white/20", text: "text-white" },
  Sale: { bg: "bg-zinc-800 border border-zinc-700", text: "text-white/90" },
};

// ─── SKELETON CARD ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden animate-pulse shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
    <div className="bg-zinc-900 h-64 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-zinc-800 rounded-full w-3/4" />
      <div className="h-3 bg-zinc-800 rounded-full w-1/2" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-5 bg-zinc-800 rounded-full w-1/3" />
        <div className="h-8 bg-zinc-800 rounded-2xl w-1/3" />
      </div>
    </div>
  </div>
);

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart }) => {
  const tag = tagConfig[product.tag];
  return (
    <div className="group bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:border-white/30 hover:shadow-[0_0_40px_rgba(0,112,243,0.25)] transition-all duration-500 flex flex-col relative">
      {/* Image Container */}
      <div className="relative overflow-hidden h-60 sm:h-64 bg-[#0a0a0a]">
        <img
          src={product.image}
          alt={product.name}
          /* REMOVED: grayscale and brightness-90 filters. The image starts completely clear. */
          className="w-full h-full object-cover transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-110"
          loading="lazy"
        />
        {/* Tag badge */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-[10px] uppercase tracking-[0.2em] font-black px-3 py-1 rounded-full ${tag.bg} ${tag.text} shadow-lg`}
          >
            {product.tag}
          </span>
        )}
        {/* Dynamic Vignette Depth Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      </div>

      {/* Info Overlay Panel */}
      <div className="p-5 flex flex-col flex-1 bg-[#020202]/40 transform group-hover:-translate-y-1 transition-transform duration-500 ease-out">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 mb-1">
          {product.category} · {product.gender}
        </span>
        <h3 className="text-sm font-bold text-white/90 leading-snug mb-4 flex-1 line-clamp-2 uppercase italic tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
          <span className="text-base font-black text-white tracking-tight">
            {product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="group/btn relative overflow-hidden text-[10px] font-black uppercase tracking-widest bg-blue-600 text-white px-4 py-2.5 rounded-xl hover:shadow-[0_0_25px_rgba(0,112,243,0.5)] active:scale-95 transition-all duration-200"
          >
            <span className="relative z-10">+ Cart</span>
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Kids() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState("");
  const searchRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  // Re-trigger skeleton when filter changes
  const handleCategoryChange = (cat) => {
    setLoading(true);
    setActiveCategory(cat);
    setVisibleCount(12);
    setTimeout(() => setLoading(false), 600);
  };

  // Filtering
  const filtered = products.filter((p) => {
    const matchCat =
      activeCategory === "All" ||
      p.category === activeCategory ||
      p.gender === activeCategory;
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const visible = filtered.slice(0, visibleCount);

  const handleAddToCart = (product) => {
    setCartCount((c) => c + 1);
    setToastMsg(`"${product.name}" added to cart!`);
    setTimeout(() => setToastMsg(""), 2500);
  };

  return (
    <div className="min-h-screen font-sans bg-[#020202] text-white overflow-hidden relative selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Large Text */}
      <div className="absolute top-40 right-10 text-[16vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
        Junior
      </div>
      <div className="absolute bottom-40 left-10 text-[12vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-widest italic">
        Couture
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-[-5%] right-[-5%] w-120 h-120 rounded-full blur-[150px] opacity-15 pointer-events-none bg-[#0070f3]" />
      <div className="absolute bottom-[20%] left-[-10%] w-100 h-100 rounded-full blur-[130px] opacity-10 pointer-events-none bg-[#0070f3]" />

      {/* ── TOAST ── */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-400 ${toastMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <div className="bg-white/10 backdrop-blur-2xl text-white text-xs font-black uppercase tracking-widest px-6 py-4 rounded-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-3">
          <span className="text-blue-500">🛍️</span> {toastMsg}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-xl bg-[#020202]/70 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-[0.15em] uppercase text-white">
              StylerHub
            </span>
            <span className="hidden sm:inline-block border border-blue-500/30 bg-blue-600/10 text-blue-500 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-[0.2em] ml-2">
              Kids
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => searchRef.current?.focus()}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>
            <button className="relative text-white/60 hover:text-white transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-blue-600 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(0,112,243,0.8)]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center z-10">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl mb-8 tracking-[0.3em] uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#0070f3]" />
            New Season · Kids Collection 2026
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-6 uppercase italic">
            Dress Them in{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block text-blue-500">
              Pure Joy
              <svg
                className="absolute -bottom-3 left-0 w-full opacity-60"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8 Q75 2 150 8 Q225 14 298 8"
                  stroke="#0070f3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-8 text-white/40 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
            Playful, premium, and perfectly sized — explore{" "}
            <strong className="text-white/80 font-black">{products.length}+</strong>{" "}
            handpicked styles for little fashion stars.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              { emoji: "👗", label: "70+ Outfits" },
              { emoji: "🎀", label: "Boys & Girls" },
              { emoji: "🌍", label: "Free Delivery" },
              { emoji: "✨", label: "New Weekly" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 bg-white/5 backdrop-blur-xl px-5 py-2.5 rounded-xl shadow-lg border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/80 hover:border-white/20 hover:text-white transition-all"
              >
                <span className="brightness-90">{s.emoji}</span> {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="relative max-w-lg mx-auto mb-10">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(12);
            }}
            placeholder="Search outfits, styles, seasons…"
            className="w-full pl-11 pr-10 py-4 rounded-xl bg-white/5 border border-white/10 shadow-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs font-bold"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  active
                    ? "bg-blue-600 text-white border-transparent shadow-[0_0_25px_rgba(0,112,243,0.55)] scale-105"
                    : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mt-8">
          {filtered.length} outfit{filtered.length !== 1 ? "s" : ""} found
          {activeCategory !== "All" && ` in "${activeCategory}"`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md max-w-xl mx-auto">
            <p className="text-5xl mb-4 opacity-40">🔍</p>
            <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">
              No outfits found
            </h3>
            <p className="text-white/40 text-xs tracking-wide max-w-xs mx-auto">
              Try a different category or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 bg-transparent border border-white/20 hover:bg-white hover:text-black text-white font-black uppercase tracking-widest px-6 py-3 rounded-xl text-xs transition-all"
            >
              View All Outfits
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {visible.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
              <div className="text-center mt-14">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="group relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 text-white text-[11px] font-black uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition-all shadow-xl"
                >
                  <span className="relative z-10">Load More Outfits</span>
                  <div className="absolute inset-0 bg-white/[0.04] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}