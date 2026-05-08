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
  New: { bg: "bg-emerald-400", text: "text-white" },
  Trending: { bg: "bg-fuchsia-500", text: "text-white" },
  Sale: { bg: "bg-orange-400", text: "text-white" },
};

// ─── SKELETON CARD ───────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-blue-400 rounded-3xl overflow-hidden animate-pulse shadow-sm">
    <div className="bg-gray-200 h-64 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded-full w-3/4" />
      <div className="h-3 bg-gray-100 rounded-full w-1/2" />
      <div className="flex justify-between items-center pt-1">
        <div className="h-5 bg-gray-200 rounded-full w-1/3" />
        <div className="h-8 bg-gray-200 rounded-2xl w-1/3" />
      </div>
    </div>
  </div>
);

// ─── PRODUCT CARD ────────────────────────────────────────────────────────────
const ProductCard = ({ product, onAddToCart }) => {
  const tag = tagConfig[product.tag];
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-60 sm:h-64 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Tag badge */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${tag.bg} ${tag.text} tracking-wide shadow`}
          >
            {product.tag}
          </span>
        )}
        {/* Quick-view overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-fuchsia-400 mb-1">
          {product.category} · {product.gender}
        </span>
        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-3 flex-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-extrabold text-gray-900">
            {product.price}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="text-xs font-bold bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white px-4 py-2 rounded-2xl hover:from-fuchsia-600 hover:to-violet-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-fuchsia-200"
          >
            + Cart
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
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          "linear-gradient(135deg,#fdf4ff 0%,#f0fdf4 50%,#fff7ed 100%)",
      }}
    >
      {/* ── TOAST ── */}
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-400 ${toastMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <div className="bg-gray-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
          <span>🛍️</span> {toastMsg}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-white/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-fuchsia-600 via-violet-500 to-orange-400 bg-clip-text text-transparent">
              StylerHub
            </span>
            <span className="hidden sm:inline-block bg-fuchsia-100 text-fuchsia-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ml-1">
              Kids
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => searchRef.current?.focus()}
              className="text-gray-500 hover:text-fuchsia-500 transition-colors"
              aria-label="Search"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </button>
            <button className="relative text-gray-600 hover:text-fuchsia-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-fuchsia-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-fuchsia-200 rounded-full opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-72 h-72 bg-orange-200 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-200 rounded-full opacity-20 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-16 text-center">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-white/80 border border-fuchsia-100 text-fuchsia-600 text-xs font-bold px-4 py-2 rounded-full shadow-sm mb-6 tracking-wide">
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse" />
            New Season · Kids Collection 2025
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-none tracking-tight mb-4">
            Dress Them in{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-fuchsia-500 via-violet-500 to-orange-400 bg-clip-text text-transparent">
                Pure Joy
              </span>
              {/* Underline squiggle */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <path
                  d="M2 8 Q75 2 150 8 Q225 14 298 8"
                  stroke="url(#grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d946ef" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="mt-6 text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Playful, premium, and perfectly sized — explore{" "}
            <strong className="text-gray-700">{products.length}+</strong>{" "}
            handpicked styles for little fashion stars.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { emoji: "👗", label: "70+ Outfits" },
              { emoji: "🎀", label: "Boys & Girls" },
              { emoji: "🌍", label: "Free Delivery" },
              { emoji: "✨", label: "New Weekly" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 bg-white/70 backdrop-blur px-4 py-2 rounded-2xl shadow-sm border border-white text-sm font-semibold text-gray-700"
              >
                <span>{s.emoji}</span> {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {/* Search bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 border ${
                  active
                    ? "bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white border-transparent shadow-lg shadow-fuchsia-200 scale-105"
                    : "bg-white text-gray-500 border-gray-100 hover:border-fuchsia-200 hover:text-fuchsia-500 hover:shadow-sm"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <p className="text-center text-xs text-gray-400 font-medium mt-5">
          {filtered.length} outfit{filtered.length !== 1 ? "s" : ""} found
          {activeCategory !== "All" && ` in "${activeCategory}"`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </section>

      {/* ── GRID ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🔍</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">
              No outfits found
            </h3>
            <p className="text-gray-400 text-sm">
              Try a different category or search term.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-bold px-6 py-3 rounded-2xl text-sm hover:opacity-90 transition"
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

            {/* Load More */}
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((v) => v + 12)}
                  className="group relative overflow-hidden bg-white border-2 border-fuchsia-200 text-fuchsia-600 font-bold px-10 py-4 rounded-2xl text-sm hover:border-fuchsia-400 transition-all duration-300 shadow-sm hover:shadow-fuchsia-100"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Load More Outfits
                    <svg
                      className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}

            {/* End of results message */}
            {visibleCount >= filtered.length && filtered.length > 12 && (
              <p className="text-center text-gray-400 text-sm mt-10">
                🎉 You've seen all {filtered.length} outfits!
              </p>
            )}
          </>
        )}
      </section>

      {/* ── FOOTER BANNER ── */}
      <section className="bg-gradient-to-r from-fuchsia-600 via-violet-600 to-purple-700 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <p className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
            Styled for Every Little Adventure 🌟
          </p>
          <p className="text-white/80 text-sm sm:text-base mb-8">
            Sign up and get 15% off your first order. New arrivals every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-2xl text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white/60"
            />
            <button className="bg-white text-fuchsia-600 font-bold px-6 py-3.5 rounded-2xl text-sm hover:bg-fuchsia-50 transition-colors shadow-lg">
              Get 15% Off
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
