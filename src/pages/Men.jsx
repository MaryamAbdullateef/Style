import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import { useState } from "react";

const products = [
  {
    name: "Tailored Wool Overcoat",
    price: "₦98,000",
    tag: "New",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
  },
  {
    name: "Slim Fit Suit Set",
    price: "₦125,000",
    tag: "New",
    category: "Suits",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=85",
  },
  {
    name: "Linen Oxford Shirt",
    price: "₦22,500",
    tag: "",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=85",
  },
  {
    name: "Structured Bomber",
    price: "₦67,000",
    tag: "Sale",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&q=85",
  },
  {
    name: "Premium Chino Trousers",
    price: "₦35,000",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=85",
  },
  {
    name: "Leather Derby Shoes",
    price: "₦58,000",
    tag: "New",
    category: "Footwear",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
  },
  {
    name: "Merino Crewneck Knit",
    price: "₦29,000",
    tag: "Sale",
    category: "Tops",
    img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85",
  },
  {
    name: "Raw Denim Selvedge",
    price: "₦44,000",
    tag: "",
    category: "Trousers",
    img: "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=85",
  },
  {
    name: "Canvas Weekender Bag",
    price: "₦31,500",
    tag: "",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=85",
  },
];

const filters = [
  "All",
  "Suits",
  "Tops",
  "Trousers",
  "Outerwear",
  "Footwear",
  "Accessories",
];

const stats = [
  { value: "200+", label: "Men's Styles" },
  { value: "SS26", label: "Season" },
  { value: "100%", label: "Premium Quality" },
];

export default function Men() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main
      className="pt-20 min-h-screen bg-brand-black"
      style={{ fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}
    >
      {/* ── Hero ── */}
      <section className="relative h-[70vh] overflow-hidden flex items-end">
        <img
          src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=1600&q=85"
          alt="Men's Collection Hero"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />

        {/* Vertical accent line */}
        <div className="absolute left-5 md:left-16 top-16 bottom-0 w-px bg-brand-blue/40" />

        <div className="relative z-10 px-8 md:px-20 pb-14 w-full">
          <span className="inline-flex items-center gap-2 text-brand-blue text-xs tracking-[0.35em] uppercase mb-4">
            <span className="w-8 h-px bg-brand-blue inline-block" />
            Spring · Summer 2026
          </span>

          <h1
            className="text-7xl md:text-[9rem] leading-none mb-6 text-white"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            }}
          >
            MEN'S
            <br />
            <span
              className="text-brand-red [-webkit-text-stroke:1px_#E0190F] text-transparent"
              style={{ WebkitTextStroke: "2px #E0190F", color: "transparent" }}
            >
              COLLECTION
            </span>
          </h1>

          {/* Stats row */}
          <div className="flex gap-10 mt-2">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="text-white text-2xl md:text-3xl"
                  style={{
                    fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-white/40 text-xs tracking-widest uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Corner badge */}
        <div className="absolute top-8 right-8 md:right-16 border border-white/20 px-4 py-2 text-center hidden md:block">
          <p className="text-white/50 text-[10px] tracking-[0.25em] uppercase">
            New Arrivals
          </p>
          <p
            className="text-white text-lg"
            style={{
              fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
            }}
          >
            Just Dropped
          </p>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="bg-brand-blue py-2.5 overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-12 animate-marquee">
          {Array(6)
            .fill([
              "MEN'S FASHION",
              "NEW ARRIVALS",
              "SS 2026",
              "PREMIUM QUALITY",
              "STYLE ELEVATED",
            ])
            .flat()
            .map((t, i) => (
              <span
                key={i}
                className="text-white text-xs tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
                  fontSize: "0.85rem",
                }}
              >
                {t} <span className="text-white/50 mx-4">✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="sticky top-20 z-30 bg-brand-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="flex gap-1 px-5 md:px-16 py-4 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`flex-shrink-0 text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-200 ${
                active === f
                  ? "bg-brand-blue text-white"
                  : "border border-white/15 text-white/40 hover:border-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}

          <div className="ml-auto flex-shrink-0 flex items-center gap-2 text-white/30 text-xs tracking-widest uppercase pl-4 border-l border-white/10">
            <span>{filtered.length} items</span>
          </div>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-16 py-14">
        {/* Featured first product (larger) */}
        {active === "All" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-5">
            {/* Big card */}
            <div className="md:col-span-3 group cursor-pointer relative">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-[520px] overflow-hidden border border-white/5">
                <img
                  src={products[0].img}
                  alt={products[0].name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-4 left-4 bg-brand-blue text-white text-xs px-3 py-1 tracking-wider uppercase">
                  {products[0].tag}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                  <div>
                    <p className="text-white/40 text-xs tracking-widest uppercase mb-1">
                      Featured
                    </p>
                    <p
                      className="text-white text-3xl leading-tight"
                      style={{
                        fontFamily:
                          "var(--font-display, 'Bebas Neue', sans-serif)",
                      }}
                    >
                      {products[0].name}
                    </p>
                    <p className="text-brand-blue text-base font-medium mt-1">
                      {products[0].price}
                    </p>
                  </div>
                  <Link
                    to="/order"
                    className="bg-white text-black text-xs tracking-[0.15em] uppercase font-medium px-5 py-3 flex items-center gap-2 hover:bg-brand-blue hover:text-white transition-all"
                  >
                    <FiShoppingBag size={13} /> Order
                  </Link>
                </div>
              </div>
            </div>

            {/* Two stacked on the right */}
            <div className="md:col-span-2 flex flex-col gap-5">
              {products.slice(1, 3).map((p) => (
                <ProductCard key={p.name} p={p} tall />
              ))}
            </div>
          </div>
        )}

        {/* Regular grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {(active === "All" ? products.slice(3) : filtered).map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>

      {/* ── Editorial strip ── */}
      <div className="relative my-10 mx-5 md:mx-16 border border-white/10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=1400&q=80"
          alt="Editorial"
          className="w-full h-52 object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-between px-10 md:px-20">
          <div>
            <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-2">
              Style Guide
            </p>
            <p
              className="text-white text-4xl md:text-6xl"
              style={{
                fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)",
              }}
            >
              Dress Sharp.
              <br />
              Live Bolder.
            </p>
          </div>
          <Link
            to="/order"
            className="hidden md:flex items-center gap-3 border border-white/30 text-white text-xs tracking-[0.2em] uppercase px-8 py-4 hover:bg-brand-blue hover:border-brand-blue transition-all"
          >
            Shop All <FiArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="text-center pb-20 px-5">
        <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-4">
          Ready to elevate your style?
        </p>
        <Link
          to="/order"
          className="inline-flex items-center gap-3 bg-brand-blue hover:bg-blue-700 text-white text-xs tracking-[0.25em] uppercase font-medium px-12 py-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-blue/30"
        >
          <FiShoppingBag size={16} /> Place Your Order
        </Link>
      </div>
    </main>
  );
}

// ── Reusable Product Card ──
function ProductCard({ p, tall }) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`relative overflow-hidden mb-3 border border-white/5 ${
          tall ? "h-[248px]" : "aspect-[3/4]"
        }`}
      >
        <img
          src={p.img}
          alt={p.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {p.tag && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] px-2.5 py-0.5 tracking-wider uppercase font-medium ${
              p.tag === "Sale" ? "bg-brand-red" : "bg-brand-blue"
            }`}
          >
            {p.tag}
          </span>
        )}

        {/* Category chip */}
        <span className="absolute top-3 right-3 bg-black/60 text-white/60 text-[10px] px-2 py-0.5 tracking-wider uppercase backdrop-blur-sm">
          {p.category}
        </span>

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3">
          <Link
            to="/order"
            className="w-full bg-white text-black text-[10px] tracking-[0.15em] uppercase font-medium py-2.5 flex items-center justify-center gap-2 hover:bg-brand-blue hover:text-white transition-colors"
          >
            <FiShoppingBag size={12} /> Quick Order
          </Link>
        </div>
      </div>

      <p className="text-white/30 text-[10px] tracking-wider uppercase mb-1">
        {p.category}
      </p>
      <p
        className="text-white text-xl leading-tight"
        style={{ fontFamily: "var(--font-display, 'Bebas Neue', sans-serif)" }}
      >
        {p.name}
      </p>
      <p className="text-brand-blue text-sm mt-0.5 font-medium">{p.price}</p>
    </div>
  );
}
