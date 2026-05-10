import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ─── PALETTE: Obsidian + Ivory + Burnished Gold ─────────────────────────────
// #0D0D0D  obsidian black  |  #F7F4EF warm ivory  |  #C9A84C burnished gold

// ─── ALL IMAGES ARE VERIFIED MENSWEAR-ONLY UNSPLASH PHOTOS ─────────────────
const menProducts = [

  // ── SHIRTS · 15 items ────────────────────────────────────────────────────
  { id: 101, name: "Premium Linen Shirt",      price: 25000, tag: "New",       category: "Shirts",      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80" },
  { id: 102, name: "Oxford Button-Down",        price: 18500, tag: "Sale",      category: "Shirts",      img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80" },
  { id: 103, name: "Cuban Collar Print",        price: 15000, tag: "",          category: "Shirts",      img: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=80" },
  { id: 104, name: "Slim Fit Dress Shirt",      price: 22000, tag: "Exclusive", category: "Shirts",      img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80" },
  { id: 105, name: "Mandarin Collar Linen",     price: 19500, tag: "New",       category: "Shirts",      img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=600&auto=format&fit=crop&q=80" },
  { id: 106, name: "Paisley Jacquard Shirt",    price: 28000, tag: "Trending",  category: "Shirts",      img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80" },
  { id: 107, name: "Washed Chambray Shirt",     price: 16500, tag: "Sale",      category: "Shirts",      img: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&auto=format&fit=crop&q=80" },
  { id: 108, name: "Seersucker Stripe",         price: 21000, tag: "",          category: "Shirts",      img: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&auto=format&fit=crop&q=80" },
  { id: 109, name: "Micro-Check Flannel",       price: 17500, tag: "New",       category: "Shirts",      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80" },
  { id: 110, name: "Resort Linen Print",        price: 24000, tag: "Trending",  category: "Shirts",      img: "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=600&auto=format&fit=crop&q=80" },
  { id: 115, name: "Poplin Band Collar",        price: 14500, tag: "Sale",      category: "Shirts",      img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80" },
  { id: 116, name: "Dobby Texture Shirt",       price: 23000, tag: "Exclusive", category: "Shirts",      img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80" },
  { id: 117, name: "Relaxed Tencel Shirt",      price: 20000, tag: "",          category: "Shirts",      img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&auto=format&fit=crop&q=80" },
  { id: 118, name: "Patterned Silk Blend",      price: 32000, tag: "Exclusive", category: "Shirts",      img: "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&auto=format&fit=crop&q=80" },
  { id: 119, name: "Heritage Twill Shirt",      price: 26000, tag: "New",       category: "Shirts",      img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80" },

  // ── TEES · 13 items ──────────────────────────────────────────────────────
  { id: 111, name: "Heavyweight Boxy Tee",      price: 9500,  tag: "Exclusive", category: "Tees",        img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80" },
  { id: 112, name: "Piqué Cotton Polo",         price: 12000, tag: "Sale",      category: "Tees",        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80" },
  { id: 113, name: "Graphic Archive Tee",       price: 11500, tag: "Trending",  category: "Tees",        img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80" },
  { id: 114, name: "Slub Henley Tee",           price: 8500,  tag: "New",       category: "Tees",        img: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22?w=600&auto=format&fit=crop&q=80" },
  { id: 120, name: "Luxe Pima Cotton Tee",      price: 13500, tag: "Exclusive", category: "Tees",        img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80" },
  { id: 123, name: "Oversized Drop-Shoulder",   price: 10500, tag: "Trending",  category: "Tees",        img: "https://images.unsplash.com/photo-1588117260148-b47818741c74?w=600&auto=format&fit=crop&q=80" },
  { id: 124, name: "Merino Wool Tee",           price: 15000, tag: "New",       category: "Tees",        img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80" },
  { id: 125, name: "Long-Line Split Hem",       price: 11000, tag: "Sale",      category: "Tees",        img: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&auto=format&fit=crop&q=80" },
  { id: 126, name: "Classic Crew Neck",         price: 7500,  tag: "",          category: "Tees",        img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=80" },
  { id: 127, name: "Pigment Dye Tee",           price: 9000,  tag: "Trending",  category: "Tees",        img: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&auto=format&fit=crop&q=80" },
  { id: 128, name: "Waffle Knit Henley",        price: 10000, tag: "New",       category: "Tees",        img: "https://images.unsplash.com/photo-1617196034538-239cb3ba6952?w=600&auto=format&fit=crop&q=80" },
  { id: 129, name: "Contrast Rib Polo",         price: 14000, tag: "Exclusive", category: "Tees",        img: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&auto=format&fit=crop&q=80" },
  { id: 172, name: "Essential V-Neck Tee",      price: 8000,  tag: "Sale",      category: "Tees",        img: "https://images.unsplash.com/photo-1598033438371-2ab8a5de77a7?w=600&auto=format&fit=crop&q=80" },

  // ── TROUSERS · 14 items ──────────────────────────────────────────────────
  { id: 121, name: "Slim Fit Chinos",           price: 22000, tag: "New",       category: "Trousers",    img: "https://images.unsplash.com/photo-1473966968600-fa804b869622?w=600&auto=format&fit=crop&q=80" },
  { id: 122, name: "Selvedge Denim Jeans",      price: 35000, tag: "",          category: "Trousers",    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&auto=format&fit=crop&q=80" },
  { id: 130, name: "Relaxed Linen Trousers",    price: 27000, tag: "Trending",  category: "Trousers",    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80" },
  { id: 133, name: "Wide-Leg Wool Blend",       price: 38000, tag: "Exclusive", category: "Trousers",    img: "https://images.unsplash.com/photo-1519564822639-564b8eacb8b4?w=600&auto=format&fit=crop&q=80" },
  { id: 134, name: "Cargo Utility Pants",       price: 24000, tag: "Sale",      category: "Trousers",    img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&auto=format&fit=crop&q=80" },
  { id: 135, name: "Tapered Jogger",            price: 18000, tag: "New",       category: "Trousers",    img: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=600&auto=format&fit=crop&q=80" },
  { id: 136, name: "Slim Cord Trousers",        price: 26000, tag: "Trending",  category: "Trousers",    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4d20?w=600&auto=format&fit=crop&q=80" },
  { id: 137, name: "Pleated Dress Pants",       price: 32000, tag: "Exclusive", category: "Trousers",    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80" },
  { id: 138, name: "Distressed Slim Jeans",     price: 29000, tag: "Sale",      category: "Trousers",    img: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&auto=format&fit=crop&q=80" },
  { id: 139, name: "Straight Cut Jeans",        price: 31000, tag: "",          category: "Trousers",    img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600&auto=format&fit=crop&q=80" },
  { id: 140, name: "Chino Bermuda Shorts",      price: 16000, tag: "New",       category: "Trousers",    img: "https://images.unsplash.com/photo-1591047139756-5f3cd44f4b97?w=600&auto=format&fit=crop&q=80" },
  { id: 143, name: "Tech Jogger Pants",         price: 20000, tag: "Trending",  category: "Trousers",    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80" },
  { id: 173, name: "Linen Drawstring Shorts",   price: 14000, tag: "New",       category: "Trousers",    img: "https://images.unsplash.com/photo-1565084888279-aca607bb7c12?w=600&auto=format&fit=crop&q=80" },
  { id: 174, name: "Tailored Suit Trousers",    price: 42000, tag: "Exclusive", category: "Trousers",    img: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80" },

  // ── OUTERWEAR · 14 items ─────────────────────────────────────────────────
  { id: 131, name: "Suede Bomber Jacket",       price: 55000, tag: "Exclusive", category: "Outerwear",   img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&auto=format&fit=crop&q=80" },
  { id: 132, name: "Technical Windbreaker",     price: 28000, tag: "Sale",      category: "Outerwear",   img: "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop&q=80" },
  { id: 144, name: "Wool Overcoat",             price: 75000, tag: "Exclusive", category: "Outerwear",   img: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&auto=format&fit=crop&q=80" },
  { id: 145, name: "Quilted Puffer Jacket",     price: 42000, tag: "New",       category: "Outerwear",   img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=80" },
  { id: 146, name: "Denim Trucker Jacket",      price: 32000, tag: "Trending",  category: "Outerwear",   img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=80" },
  { id: 147, name: "Sherpa Fleece Jacket",      price: 38000, tag: "Sale",      category: "Outerwear",   img: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&auto=format&fit=crop&q=80" },
  { id: 148, name: "Leather Moto Jacket",       price: 88000, tag: "Exclusive", category: "Outerwear",   img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&auto=format&fit=crop&q=80" },
  { id: 149, name: "Trench Coat Classic",       price: 62000, tag: "New",       category: "Outerwear",   img: "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=600&auto=format&fit=crop&q=80" },
  { id: 150, name: "Coach Jacket",              price: 25000, tag: "Trending",  category: "Outerwear",   img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&auto=format&fit=crop&q=80" },
  { id: 151, name: "Down-Fill Parka",           price: 52000, tag: "Sale",      category: "Outerwear",   img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&auto=format&fit=crop&q=80" },
  { id: 152, name: "Harrington Jacket",         price: 30000, tag: "New",       category: "Outerwear",   img: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&auto=format&fit=crop&q=80" },
  { id: 153, name: "Utility Field Jacket",      price: 36000, tag: "Exclusive", category: "Outerwear",   img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80" },
  { id: 175, name: "Varsity Letterman",         price: 45000, tag: "Trending",  category: "Outerwear",   img: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&auto=format&fit=crop&q=80" },
  { id: 176, name: "Waxed Cotton Jacket",       price: 48000, tag: "New",       category: "Outerwear",   img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop&q=80" },

  // ── ACCESSORIES · 16 items ───────────────────────────────────────────────
  { id: 141, name: "Leather Minimalist Watch",  price: 42000, tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&auto=format&fit=crop&q=80" },
  { id: 142, name: "Polarized Wayfarers",       price: 12500, tag: "Sale",      category: "Accessories", img: "https://images.unsplash.com/photo-1511499767390-903390e6fbc4?w=600&auto=format&fit=crop&q=80" },
  { id: 154, name: "Slim Leather Wallet",       price: 8500,  tag: "Trending",  category: "Accessories", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80" },
  { id: 155, name: "Woven Canvas Belt",         price: 6500,  tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80" },
  { id: 157, name: "Wool Flat Cap",             price: 9500,  tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?w=600&auto=format&fit=crop&q=80" },
  { id: 158, name: "Leather Weekender Bag",     price: 65000, tag: "Exclusive", category: "Accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80" },
  { id: 160, name: "Chronograph Watch",         price: 85000, tag: "Exclusive", category: "Accessories", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80" },
  { id: 161, name: "Crossbody Messenger Bag",   price: 28000, tag: "Trending",  category: "Accessories", img: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&auto=format&fit=crop&q=80" },
  { id: 162, name: "Merino Wool Beanie",        price: 7500,  tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&auto=format&fit=crop&q=80" },
  { id: 164, name: "Aviator Sunglasses",        price: 15000, tag: "Trending",  category: "Accessories", img: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&auto=format&fit=crop&q=80" },
  { id: 165, name: "Leather Card Holder",       price: 5000,  tag: "Sale",      category: "Accessories", img: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=600&auto=format&fit=crop&q=80" },
  { id: 166, name: "Canvas Backpack",           price: 22000, tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80" },
  { id: 168, name: "Leather Driving Gloves",    price: 14000, tag: "Exclusive", category: "Accessories", img: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=80" },
  { id: 169, name: "Woven Straw Hat",           price: 10000, tag: "Trending",  category: "Accessories", img: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&auto=format&fit=crop&q=80" },
  { id: 170, name: "Titanium Cufflinks",        price: 12000, tag: "New",       category: "Accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&auto=format&fit=crop&q=80" },
  { id: 171, name: "Gym Duffel Bag",            price: 19000, tag: "Sale",      category: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80" },
];

// ─── CONFIG ─────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Shirts", "Tees", "Trousers", "Outerwear", "Accessories"];

const TAG_CONFIG = {
  Sale:      { bg: "bg-red-600",     text: "SALE"  },
  New:       { bg: "bg-blue-600",    text: "NEW"   },
  Exclusive: { bg: "bg-amber-600",   text: "EXCL"  },
  Trending:  { bg: "bg-emerald-600", text: "TREND" },
};

const FEATURED = menProducts.filter((p) => p.tag === "Exclusive").slice(0, 3);
const TRENDING  = menProducts.filter((p) => p.tag === "Trending").slice(0, 4);

const fmt         = (n) => `₦${n.toLocaleString()}`;
const strikePrice = (n) => `₦${Math.round(n * 1.28).toLocaleString()}`;

// ─── REUSABLE COMPONENTS ────────────────────────────────────────────────────

function TagBadge({ tag }) {
  if (!tag || !TAG_CONFIG[tag]) return null;
  const { bg, text } = TAG_CONFIG[tag];
  return (
    <span className={`${bg} text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded-sm`}>
      {text}
    </span>
  );
}

function WishlistBtn({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle wishlist"
      className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4"
        fill={active ? "#C9A84C" : "none"}
        stroke={active ? "#C9A84C" : "#0D0D0D"}
        strokeWidth={2}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-[#E8E3DA] animate-pulse">
      <div className="aspect-4/5 bg-[#E8E3DA]" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-[#E8E3DA] rounded w-3/4" />
        <div className="h-4 bg-[#E8E3DA] rounded w-1/2" />
      </div>
    </div>
  );
}

function ProductCard({ p, wishlist, onWishlist, onCart }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className="group relative rounded-xl overflow-hidden border border-[#E8E3DA] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10">
      {/* ── Image area ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F0EDE6]">
        {!imgLoaded && <div className="absolute inset-0 bg-[#E8E3DA] animate-pulse" />}
        <img
          src={p.img}
          alt={p.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07] ${imgLoaded ? "opacity-100" : "opacity-0"}`}
        />
        {/* hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* badge */}
        <div className="absolute top-3 left-3"><TagBadge tag={p.tag} /></div>
        {/* wishlist */}
        <div className="absolute top-3 right-3">
          <WishlistBtn active={wishlist.includes(p.id)} onClick={() => onWishlist(p.id)} />
        </div>
        {/* quick add — slides up on hover */}
        <button
          onClick={() => onCart(p.name)}
          className="absolute bottom-0 left-0 right-0 py-3 bg-[#C9A84C] text-[#0D0D0D] text-[11px] font-black tracking-[0.2em] uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#b5923e] active:scale-[0.98]"
        >
          + Add to Cart
        </button>
      </div>
      {/* ── Info area ── */}
      <div className="p-4">
        <p className="text-[11px] text-[#9B9189] font-semibold tracking-widest uppercase mb-1">{p.category}</p>
        <h3 className="text-sm font-bold text-[#0D0D0D] leading-snug mb-2 line-clamp-1">{p.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="font-black text-[#0D0D0D] text-base">{fmt(p.price)}</span>
          {p.tag === "Sale" && (
            <span className="text-xs text-[#9B9189] line-through">{strikePrice(p.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] font-black uppercase mb-2">{eyebrow}</p>
      <h2 className="text-3xl md:text-4xl font-black text-[#0D0D0D] leading-tight">{title}</h2>
    </div>
  );
}

function FeaturedCard({ p, onCart }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
      <div className="aspect-3/4 overflow-hidden">
        <img src={p.img} alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <TagBadge tag={p.tag} />
        <h3 className="text-xl font-black mt-2 mb-1">{p.name}</h3>
        <p className="text-[#C9A84C] font-black text-lg mb-4">{fmt(p.price)}</p>
        <button
          onClick={() => onCart(p.name)}
          className="w-full py-2.5 border border-[#C9A84C] text-[#C9A84C] text-xs font-black tracking-widest uppercase rounded-lg hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-all duration-250"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Man() {
  const [activeFilter,    setActiveFilter]    = useState("All");
  const [wishlist,        setWishlist]        = useState([]);
  const [cartToast,       setCartToast]       = useState(null);
  const [search,          setSearch]          = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading,         setLoading]         = useState(true);
  const [email,           setEmail]           = useState("");
  const gridRef = useRef(null);

  // Simulate page load skeleton (900 ms)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  // Filter + search — runs only on menProducts (no women's items)
  const filteredItems = useMemo(() => {
    let items = activeFilter === "All"
      ? menProducts
      : menProducts.filter((p) => p.category === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeFilter, search]);

  const toggleWishlist = (id) =>
    setWishlist((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);

  const handleCart = (name) => {
    setCartToast(null);
    setTimeout(() => setCartToast(name), 20);
    setTimeout(() => setCartToast(null), 3000);
  };

  const handleFilter = (filter) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setIsTransitioning(false);
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return (
    <main
      className="min-h-screen"
      style={{ background: "#F7F4EF", fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif" }}
    >

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative h-[92vh] min-h-[580px] overflow-hidden bg-[#0D0D0D]">
        <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1800&auto=format"
          alt="Men's Collection"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        {/* film-grain overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/85 via-[#0D0D0D]/30 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 max-w-7xl mx-auto">
          <p className="text-[#C9A84C] text-[11px] tracking-[0.5em] font-black uppercase mb-6">
            StylerHub · Men's Collection 2026
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.93] mb-8 max-w-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Wear Your<br />
            <span className="text-transparent bg-clip-text" style={{
              backgroundImage: "linear-gradient(135deg,#C9A84C 0%,#F0D080 50%,#C9A84C 100%)"
            }}>Story</span>.
          </h1>
          <p className="text-white/60 max-w-md text-base md:text-lg leading-relaxed mb-10">
            Premium menswear crafted for the modern gentleman. Quality fabrics, timeless tailoring.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 bg-[#C9A84C] text-[#0D0D0D] font-black text-sm tracking-widest uppercase rounded-full hover:bg-[#b5923e] transition-colors active:scale-95"
            >
              Shop Now
            </button>
            <button
              onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded-full hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
            >
              View Featured
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40">
          <p className="text-[9px] tracking-[0.4em] uppercase font-semibold">Scroll</p>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════ */}
      <div className="bg-[#0D0D0D] text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-y-3 justify-between md:justify-around">
          {[
            { n: "72",   l: "Men's Styles"    },
            { n: "Free", l: "Lagos Delivery"  },
            { n: "100%", l: "Authentic Quality" },
            { n: "24h",  l: "Customer Support" },
          ].map(({ n, l }) => (
            <div key={l} className="flex items-center gap-3">
              <span className="text-[#C9A84C] font-black text-lg">{n}</span>
              <span className="text-white/50 text-xs tracking-wide">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED COLLECTION (Exclusive picks)
      ══════════════════════════════════════════════════════════════ */}
      <section id="featured" className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <SectionHeading eyebrow="Handpicked for you" title="Featured Collection" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED.map((p) => <FeaturedCard key={p.id} p={p} onCart={handleCart} />)}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          TRENDING STRIP
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.35em] text-[#C9A84C] font-black uppercase mb-2">What's Hot Right Now</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Trending This Week</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TRENDING.map((p) => (
              <div
                key={p.id}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => handleCart(p.name)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm leading-snug">{p.name}</p>
                  <p className="text-[#C9A84C] font-black text-sm">{fmt(p.price)}</p>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-500 text-white text-[9px] font-black tracking-widest px-2 py-0.5 rounded-sm">TRENDING</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          STICKY FILTER BAR + SEARCH
      ══════════════════════════════════════════════════════════════ */}
      <div
        id="collection"
        className="sticky top-0 z-40 bg-[#F7F4EF]/90 backdrop-blur-md border-b border-[#E0D9CE]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 w-full sm:w-auto" style={{ scrollbarWidth: "none" }}>
            {CATEGORIES.map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase border transition-all duration-200 ${
                  activeFilter === f
                    ? "bg-[#0D0D0D] text-white border-[#0D0D0D]"
                    : "bg-transparent text-[#6B6B6B] border-[#D0C9BE] hover:border-[#C9A84C] hover:text-[#C9A84C]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9B9189]"
              fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text" value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search men's styles…"
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#E0D9CE] rounded-full text-[#0D0D0D] placeholder-[#9B9189] focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
        </div>
        {/* Item count */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 pb-3">
          <p className="text-[11px] text-[#9B9189] tracking-wide">
            Showing <span className="font-bold text-[#0D0D0D]">{filteredItems.length}</span> men's items
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          PRODUCT GRID  (72 men's-only products)
      ══════════════════════════════════════════════════════════════ */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-16 py-12">
        <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 transition-opacity duration-300 ${isTransitioning ? "opacity-0" : "opacity-100"}`}>
          {loading
            ? Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)
            : filteredItems.length > 0
              ? filteredItems.map((p) => (
                  <ProductCard
                    key={p.id} p={p}
                    wishlist={wishlist}
                    onWishlist={toggleWishlist}
                    onCart={handleCart}
                  />
                ))
              : (
                <div className="col-span-full py-24 text-center">
                  <p className="text-5xl mb-4">🔍</p>
                  <p className="text-xl font-bold text-[#0D0D0D] mb-2">No results found</p>
                  <p className="text-[#9B9189] text-sm">Try adjusting your search or filter</p>
                  <button
                    onClick={() => { setSearch(""); setActiveFilter("All"); }}
                    className="mt-6 px-6 py-2.5 bg-[#0D0D0D] text-white text-xs font-black tracking-widest uppercase rounded-full hover:bg-[#C9A84C] hover:text-[#0D0D0D] transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )
          }
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          NEWSLETTER
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-16 bg-[#0D0D0D] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 70% 50%,#C9A84C 0%,transparent 70%)"
        }} />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-[10px] tracking-[0.5em] text-[#C9A84C] font-black uppercase mb-4">Stay in the loop</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Style Updates,<br />Zero Noise.
          </h2>
          <p className="text-white/50 mb-8 text-sm max-w-sm mx-auto">
            Early access to new drops, exclusive deals, and curated men's edits — delivered directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-full text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
            <button
              onClick={() => { if (email) { alert("You're in! 🎉"); setEmail(""); } }}
              className="px-7 py-3.5 bg-[#C9A84C] text-[#0D0D0D] font-black text-xs tracking-widest uppercase rounded-full hover:bg-[#b5923e] transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#0A0A0A] border-t border-white/5 text-white/40 py-10 px-6 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-black text-xl tracking-tight mb-1">
              Styler<span className="text-[#C9A84C]">Hub</span>
            </p>
            <p className="text-xs">Premium Fashion for the Modern Man</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-wider uppercase">
            {["Men", "Women", "Kids", "Sale", "About", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-[#C9A84C] transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-[11px]">© 2026 StylerHub. All rights reserved.</p>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════
          CART TOAST
      ══════════════════════════════════════════════════════════════ */}
      {cartToast && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#0D0D0D] text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/30 border border-white/10"
          style={{ animation: "slideUp 0.35s ease forwards" }}
        >
          <span className="text-[#C9A84C] text-lg">✓</span>
          <div>
            <p className="text-xs font-bold leading-snug">{cartToast}</p>
            <p className="text-[10px] text-white/40">Added to your cart</p>
          </div>
          <Link to="/cart"
            className="ml-2 text-[10px] font-black tracking-widest uppercase text-[#C9A84C] hover:text-white transition-colors"
          >
            View Cart →
          </Link>
        </div>
      )}

      {/* Global keyframes */}
      <style>{`
        @keyframes slideUp    { from { opacity:0; transform:translateY(16px);  } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        * { -webkit-font-smoothing: antialiased; }
      `}</style>
    </main>
  );
}