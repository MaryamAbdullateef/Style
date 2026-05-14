import { useState, useEffect, useRef, useMemo } from "react";

/* ─── DYNAMIC DATA GENERATOR (150 Unique Items) ──────────────── */
const generateData = () => {
  const categories = ["Men", "Women", "Kids"];
  const accents = ["#b8975a", "#e2d9cc", "#d4b47a", "#c9bfb3", "#f5c97a"];
  
  const descriptors = ["Tailored", "Silk", "Linen", "Oversized", "Vintage", "Minimalist", "Velvet", "Cashmere", "Structured", "Flowing"];
  const garments = {
    Men: ["Blazer", "Trousers", "Overcoat", "Chelsea Boot", "Utility Vest", "Oxford Shirt", "Knit Polo", "Cuban Shirt"],
    Women: ["Evening Gown", "Slip Dress", "Wrap Skirt", "Corset Top", "Palazzo Pants", "Trench Coat", "Midi Dress", "Blouse"],
    Kids: ["Cardigan", "Cotton Romper", "Denim Jacket", "Smock Dress", "Overalls", "Hoodie", "Sun Hat", "Chinos"]
  };

  // Curated premium Unsplash IDs categorized to match high-end fashion aesthetics
  const imagePools = {
    Men: [
      "photo-1617137968427-85924c800a22", // Minimalist Tailored Suit
      "photo-1507679799987-c73779587ccf", // Modern Classic Suit
      "photo-1618886614638-80e3c103d31a", // High-end Blazer
      "photo-1534030347209-467a5b0ad3e6", // Premium Suit Details
      "photo-1621570168297-40734ec08be5", // Editorial Menswear Jacket
      "photo-1519085360753-af0119f7cbe7", // Luxury Outerwear
      "photo-1602810318383-e386cc2a3ccf", // Tailored Classic Shirt
      "photo-1614975058789-41316d0e2e9c"  // Clean Urban Avant Garde
    ],
    Women: [
      "photo-1490481651871-ab68de25d43d", // Luxury Silk Wrap Dress
      "photo-1483985988355-763728e1935b", // Editorial Evening Gown
      "photo-1539109132382-381bb3f1c2b3", // Premium Avant Garde Suit
      "photo-1515886657613-9f3515b0c78f", // Minimalist Fluid Garments
      "photo-1520975916090-3105956dac38", // Luxury Editorial Overcoat
      "photo-1509631179647-0177331693ae", // High-Fashion Textured Gown
      "photo-1554412933-514a83d2f3c8", // High-end Blazer Lifestyle
      "photo-1479064566235-aa2742b96a4e"  // Studio Evening Silhouette
    ],
    Kids: [
      "photo-1519457431-44ccd64a579b", // Premium Knit Wear Kid
      "photo-1622243697926-26fc54045353", // Minimalist Organic Cotton Wear
      "photo-1519238263530-99bdd11df2ea", // Editorial Earthy Romper
      "photo-1607990283143-e81e7a2c93ab", // Clean Structured Cardigan
      "photo-1566492031773-4f4e44671857", // Premium Minimalist Chinos Look
      "photo-1503919545889-aef636e10ad4", // Luxury Kids Linen Top
      "photo-1471286174243-e7a4d9afb34a", // Organic Summer Wear
      "photo-1540475820923-f14d41e7be7d"  // Sustainable Knit Outerwear
    ]
  };

  return Array.from({ length: 150 }, (_, i) => {
    const category = categories[i % categories.length];
    const styleList = garments[category];
    const descriptor = descriptors[i % descriptors.length];
    const garment = styleList[i % styleList.length];
    const title = `${descriptor} ${garment}`;
    
    // Choose specific pool to map image accurately to content parameters
    const currentPool = imagePools[category];
    const imageId = currentPool[i % currentPool.length];
    
    return {
      id: i + 1,
      category: category,
      title: title,
      subtitle: `${category} · Edition No. ${i + 1}`,
      description: "A masterclass in modern silhouette and fabric integrity. Designed for the 2026 global aesthetic.",
      tag: i % 10 === 0 ? "Limited Edition" : i % 5 === 0 ? "New Arrival" : "Essential",
      // Completely fixed structural string path layout
      image: `https://images.unsplash.com/${imageId}?w=800&auto=format&fit=crop&q=80`,
      accent: accents[i % accents.length],
    };
  });
};

const allItems = generateData();

/* ─── HOOK: TYPEWRITER EFFECT ────────────────────────────── */
function useTypewriter(words, speed = 150) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  return words[index].substring(0, subIndex);
}

/* ─── HOOK: REVEAL ON SCROLL ─────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── COMPONENT: COLLECTION CARD ─────────────────────────── */
function CollectionCard({ col, className = "" }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      className={`relative overflow-hidden rounded-4xl md:rounded-[3rem] cursor-pointer bg-[#111] transition-all duration-1000 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        boxShadow: hovered ? "0 40px 80px -20px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <img
        src={col.image}
        alt={col.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out"
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)" }}
      />
      <div className={`absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent transition-opacity duration-700 ${hovered ? "opacity-95" : "opacity-70"}`} />

      <div className="absolute top-6 left-6">
        <span className="text-[9px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full backdrop-blur-xl border border-white/10 text-white"
          style={{ backgroundColor: `${col.accent}33` }}>
          {col.tag}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-white/40" style={{ color: hovered ? col.accent : "" }}>
          {col.subtitle}
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-white italic uppercase tracking-tighter mb-3 leading-tight">
          {col.title}
        </h3>

        <div className={`overflow-hidden transition-all duration-700 ${hovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-xs text-white/50 leading-relaxed mb-6">
            {col.description}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-white/20 transition-all duration-500" style={{ width: hovered ? "48px" : "32px", backgroundColor: hovered ? col.accent : "" }} />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Discover</span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Collections() {
  const [activeTab, setActiveTab] = useState("All");
  const typedWord = useTypewriter(["Masterpieces", "Silhouettes", "Traditions", "Elegance"]);
  const [headerRef, headerVisible] = useReveal();

  const filteredItems = useMemo(() => {
    return activeTab === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className="bg-[#050505] min-h-screen py-16 md:py-32 px-4 md:px-10">
      <div ref={headerRef} className="max-w-350 mx-auto mb-16 md:mb-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-6">
            <h2 className="text-white text-5xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase italic">
              Curated <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #b8975a" }}>
                {typedWord}
              </span>
              <span className="animate-pulse ml-2 text-[#b8975a]">_</span>
            </h2>
            <p className="text-white/20 text-xs md:text-sm font-medium tracking-[0.5em] uppercase">
              The Archive — Global Collection 2026
            </p>
          </div>

          <div className="flex overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-2xl">
            {["All", "Men", "Women", "Kids"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 md:px-12 py-3.5 md:py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-[#b8975a] text-black shadow-2xl" : "text-white/30 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {filteredItems.map((item, idx) => {
            let colSpan = "lg:col-span-4";
            if (idx % 10 === 0) colSpan = "lg:col-span-12";
            else if (idx % 7 === 0) colSpan = "lg:col-span-8";
            else if (idx % 3 === 0) colSpan = "lg:col-span-4";

            return (
              <CollectionCard
                key={item.id}
                col={item}
                className={`${colSpan} h-112.5 md:h-137.5 lg:h-162.5`}
              />
            );
          })}
        </div>

        <div className="mt-32 text-center border-t border-white/5 pt-24">
          <p className="text-white/10 text-[10px] font-bold tracking-[1em] uppercase mb-10">
            End of Current Curation
          </p>
          <button className="group relative px-16 py-8 bg-transparent text-white border border-white/20 font-black text-xs uppercase tracking-[0.4em] rounded-full overflow-hidden transition-all hover:border-[#b8975a]">
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">Request Custom Fit</span>
            <div className="absolute inset-0 bg-[#b8975a] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');
        h2 { font-family: 'Syncopate', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        body { background-color: #050505; }
      `}</style>
    </section>
  );
}