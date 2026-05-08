import React from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Adesua Etomi",
    role: "Creative Director",
    content: "The quality of the fabric is unmatched. It's rare to find a brand that balances traditional silhouettes with such a modern, tech-forward aesthetic.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Tunde Afolayan",
    role: "Tech Entrepreneur",
    content: "StylerHub is my go-to for wardrobing. Their pieces speak 'authority' without being loud. The delivery to Lagos was seamless and the fit was perfect.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Chioma Nwosu",
    role: "Fashion Stylist",
    content: "As a stylist, I look for versatility. These collections transition perfectly from a high-level board meeting to a premium dinner in Victoria Island.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=150&h=150&auto=format&fit=crop",
  },
];

const TestimonialSection = () => {
  const brandBlue = "#0070f3";

  return (
    <section className="bg-[#040404] py-24 px-6 relative overflow-hidden">
      {/* Subtle Background Detail */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p 
              className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4"
              style={{ color: brandBlue }}
            >
              Voice of the Community
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Trusted by the Modern <br />
              <span className="italic font-serif text-white/60">Trendsetters.</span>
            </h2>
          </div>
          <div className="hidden md:block">
             <Quote size={60} className="text-white/5" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-all duration-500 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={brandBlue} stroke={brandBlue} />
                ))}
              </div>

              <p className="text-white/70 leading-relaxed mb-8 italic">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20">
                  <img 
                    src={t.image} 
                    alt={t.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-30 grayscale">
            <span className="text-xl font-bold text-white tracking-tighter">VOGUE</span>
            <span className="text-xl font-bold text-white tracking-tighter">GQ NIGERIA</span>
            <span className="text-xl font-bold text-white tracking-tighter">ESSENCE</span>
            <span className="text-xl font-bold text-white tracking-tighter">ARRISE</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;