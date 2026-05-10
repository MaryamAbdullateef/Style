import React, { useState, useEffect } from "react";
import { ArrowRight, ShoppingBag, Star, ShieldCheck, Zap } from "lucide-react";

const HeroSection = () => {
  const brandBlue = "#0070f3";

  // --- Typewriter Logic ---
  const words = ["Speaks", "Refines", "Resonates", "Inspires"];
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
      reverse ? 75 : 150,
    );
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <section className="relative w-full min-h-screen bg-[#020202] flex items-center overflow-hidden px-6 md:px-16 py-24">
      {/* --- EXTRA DECORATIVE ELEMENTS (The "Much Things" aspect) --- */}
      <div className="absolute top-20 left-10 text-[14vw] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Premium
      </div>
      <div className="absolute bottom-10 right-10 text-[10vw] font-black text-white/[0.02] select-none pointer-events-none uppercase italic">
        Boutique
      </div>

      {/* Ambient Glows */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20"
        style={{ backgroundColor: brandBlue }}
      />
      <div
        className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[130px] opacity-10"
        style={{ backgroundColor: brandBlue }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* --- TEXT CONTENT --- */}
        <div className="space-y-10 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-5 py-2 border border-white/10 bg-white/5 rounded-full backdrop-blur-xl">
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[10px] tracking-[0.4em] uppercase font-black text-white/90">
                StylerHub Exclusive 2026
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter uppercase italic">
              Quality That <br />
              <span
                className="relative inline-block"
                style={{ color: brandBlue }}
              >
                {words[index].substring(0, subIndex)}
                <span className="absolute right-[-12px] top-0 h-full w-[5px] bg-white animate-pulse" />
              </span>
              <br />
              Before You Do.
            </h1>

            <p className="text-white/40 text-lg max-w-lg leading-relaxed font-medium">
              Redefining the African fashion landscape with artisanal precision
              and silhouettes that command respect in any room.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <button className="group relative overflow-hidden flex items-center justify-center gap-3 px-10 py-5 text-white font-black text-xs uppercase tracking-[0.2em] transition-all bg-blue-600 hover:shadow-[0_0_40px_rgba(0,112,243,0.6)] active:scale-95">
              <ShoppingBag size={18} />
              Shop Now
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            </button>
            <button className="flex items-center justify-center gap-2 px-10 py-5 text-white border-2 border-white/10 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              See Lookbook <ArrowRight size={16} />
            </button>
          </div>

          {/* Stats & Trust */}
          <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5 max-w-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white font-black text-3xl">
                15K <span className="text-blue-500 text-sm">+</span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                Orders Delivered
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-white font-black text-3xl">
                4.9{" "}
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
              </div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">
                User Feedback
              </p>
            </div>
          </div>
        </div>

        {/* --- IMAGE COMPOSITION (Attractive & Much More) --- */}
        <div className="relative order-1 lg:order-2 group">
          {/* Decorative Floating Circle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 border border-white/10 rounded-full animate-spin-slow pointer-events-none" />

          {/* Main Photo Container */}
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_60px_100px_-20px_rgba(0,0,0,1)]">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1974&auto=format&fit=crop"
              alt="Fashion Model"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {/* Dark Overlay for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-70" />
          </div>

          {/* OVERLAPPING ARTISAN CARD (Made more obvious) */}
          <div className="absolute -bottom-10 -left-6 md:-left-16 bg-white/10 backdrop-blur-2xl p-7 rounded-[2rem] shadow-2xl z-30 max-w-[260px] border border-white/20 transform hover:-rotate-2 transition-transform">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <ShieldCheck size={18} className="text-white" />
              </div>
              <p className="text-white font-black text-xs uppercase tracking-widest leading-none">
                Authentic <br />{" "}
                <span className="text-white/50">Nigerian Craft</span>
              </p>
            </div>

            <p className="text-white/60 text-[10px] leading-relaxed mb-5 font-medium">
              Each thread is hand-picked and verified for premium texture.
            </p>

            {/* OVERLAPPING IMAGES (VERY OBVIOUS VERSION) */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-[3px] border-[#1a1a1a] bg-stone-800 overflow-hidden shadow-xl transition-transform hover:scale-110 hover:z-50 relative"
                    style={{ zIndex: 10 - i }} // Ensures clear stacking
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="Artisan"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                ))}
              </div>
              <span className="text-[9px] text-white/50 font-black uppercase tracking-widest">
                +12 Experts
              </span>
            </div>
          </div>

          {/* FLOATING TOP BADGE */}
          <div className="absolute top-10 -right-4 bg-white text-black p-4 rounded-2xl shadow-2xl z-20 animate-bounce-slow hidden sm:block">
            <p className="text-[10px] font-black uppercase tracking-tighter leading-none">
              Limitless
            </p>
            <p className="text-[18px] font-black leading-none">STYLE</p>
          </div>
        </div>
      </div>

    
      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-bounce-slow { animation: bounce 3s ease-in-out infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
      `}</style>
    </section>
  );
};

export default HeroSection;
