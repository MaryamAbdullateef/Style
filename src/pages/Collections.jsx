import { useState, useEffect, useRef, useMemo } from "react";

/* ─── DYNAMIC DATA GENERATOR (65 Unique Items) ──────────────── */
const generateData = () => {
  const categories = ["Men", "Women", "Kids"];
  const styles = ["Luxury", "Streetwear", "Heritage", "Office", "Resort"];
  const accents = ["#b8975a", "#e2d9cc", "#d4b47a", "#c9bfb3", "#f5c97a"];

  return Array.from({ length: 65 }, (_, i) => ({
    id: i + 1,
    category: categories[i % categories.length],
    title: `${styles[i % styles.length]} ${i + 1}`,
    subtitle: `${categories[i % categories.length]} · SS 2026`,
    description:
      "Expertly tailored silhouettes using premium textures sourced from across the globe. Redefining modern presence.",
    tag: i % 5 === 0 ? "Featured" : i % 3 === 0 ? "Limited" : "New",
    // Fixed image URL logic to ensure Unsplash returns valid images
    image: `https://plus.unsplash.com/premium_photo-1664201890375-f8fe37f27d60?w=800&auto=format&fit=crop&q=60&sig=${i}`,
    accent: accents[i % accents.length],
  }));
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
    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 75 : speed,
    );
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
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── COMPONENT: COLLECTION CARD ─────────────────────────── */
function CollectionCard({ col, height = "400px", className = "" }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      // Added touch support for mobile "hover" effect
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      className={`relative overflow-hidden rounded-[2rem] cursor-pointer bg-[#1a1a1a] transition-all duration-700 ${className}`}
      style={{
        height,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        boxShadow: hovered ? "0 30px 60px -15px rgba(0,0,0,0.5)" : "none",
      }}
    >
      <img
        src={col.image}
        alt={col.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000"
        style={{ transform: hovered ? "scale(1.1) rotate(1deg)" : "scale(1)" }}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${hovered ? "opacity-90" : "opacity-70"}`}
      />

      <div className="absolute top-4 left-4 md:top-6 md:left-6">
        <span
          className="text-[8px] md:text-[9px] font-black tracking-[0.3em] uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full backdrop-blur-md border border-white/10 text-white"
          style={{ backgroundColor: `${col.accent}44` }}
        >
          {col.tag}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p
          className="text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase mb-2 text-white/50"
          style={{ color: hovered ? col.accent : "" }}
        >
          {col.subtitle}
        </p>
        <h3 className="text-xl md:text-2xl font-black text-white italic uppercase tracking-tighter mb-3 leading-none">
          {col.title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-500 ${hovered ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <p className="text-[10px] md:text-xs text-white/60 leading-relaxed mb-6 font-medium">
            {col.description}
          </p>
        </div>

        <div className="flex items-center gap-2 group/btn">
          <div
            className="h-px w-8 bg-white/20 group-hover/btn:w-12 transition-all duration-500"
            style={{ backgroundColor: hovered ? col.accent : "" }}
          />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">
            Explore
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
export default function Collections() {
  const [activeTab, setActiveTab] = useState("All");
  const typedWord = useTypewriter([
    "Masterpieces",
    "Silhouettes",
    "Traditions",
    "Elegance",
  ]);
  const [headerRef, headerVisible] = useReveal();

  const filteredItems = useMemo(() => {
    return activeTab === "All"
      ? allItems
      : allItems.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <section className="bg-[#0a0a0a] min-h-screen py-12 md:py-24 px-4 md:px-6 overflow-hidden">
      <div ref={headerRef} className="max-w-7xl mx-auto mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">
          <div className="space-y-4">
            <h2 className="text-white text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
              Curated <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px #b8975a" }}
              >
                {typedWord}
              </span>
              <span className="animate-pulse ml-1">_</span>
            </h2>
            <p className="text-white/30 text-[10px] md:text-sm font-medium tracking-widest uppercase">
              Exclusive Access — Season 2026
            </p>
          </div>

          {/* Luxury Tab Switcher - Now scrollable on tiny screens */}
          <div className="flex overflow-x-auto no-scrollbar bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-xl shrink-0">
            {["All", "Men", "Women", "Kids"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#b8975a] text-black shadow-lg"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* THE EDITORIAL GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6">
          {filteredItems.map((item, idx) => {
            // Default: Full width on mobile (col-span-1 in a 1-col grid)
            let colSpan = "lg:col-span-4";
            let height = "400px"; // Default height for mobile

            // Desktop Pattern Logic
            if (idx % 7 === 0) {
              colSpan = "lg:col-span-8";
              height = "450px";
            }
            if (idx % 10 === 0) {
              colSpan = "lg:col-span-12";
              height = "400px";
            }

            // Adjust heights for larger screens
            const responsiveHeight = `h-[400px] md:h-[500px] ${idx % 7 === 0 ? "lg:h-[600px]" : ""}`;

            return (
              <CollectionCard
                key={item.id}
                col={item}
                className={colSpan}
                height={undefined} // Using Tailwind classes for height instead
                className={`${colSpan} ${responsiveHeight}`}
              />
            );
          })}
        </div>

        {/* Dynamic Footer CTA */}
        <div className="mt-20 md:mt-32 text-center space-y-6 md:space-y-8 border-t border-white/5 pt-16 md:pt-20">
          <p className="text-white/20 text-[9px] md:text-xs font-bold tracking-[0.5em] uppercase">
            New arrivals dropping weekly
          </p>
          <button className="px-10 md:px-16 py-5 md:py-6 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-[0.3em] rounded-full hover:bg-[#b8975a] hover:scale-105 transition-all shadow-2xl">
            View Lookbook 2026
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');
        h2 { font-family: 'Syncopate', sans-serif; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #b8975a; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
