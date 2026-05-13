import React from "react";
import { useCountUp } from "react-countup";
import { Award, Globe, Users, Zap } from "lucide-react";

// --- STATS DATA ---
const stats = [
  { label: "Founded", value: "2018", id: "zap" },
  { label: "Global Stores", value: "12", id: "globe" },
  { label: "Happy Clients", value: "50", id: "users", isCountUp: true },
  { label: "Design Awards", value: "08", id: "award" },
];

// --- SLOW MOTION COUNTER COMPONENT ---
const HappyClientCounter = ({ endValue }) => {
  const countUpRef = React.useRef(null);

  useCountUp({
    ref: countUpRef,
    start: 0,
    end: endValue,
    duration: 7, // Increased to 7 seconds for a much slower, premium feel
    enableScrollSpy: true,
    scrollSpyOnce: true,
    useEasing: true, // Smooths out the start and finish
  });

  return <span ref={countUpRef} />;
};

const AboutSection = () => {
  const renderIcon = (id) => {
    const iconProps = {
      size: 28,
      className: "text-stone-300 group-hover:text-amber-500 transition-colors duration-300",
    };
    switch (id) {
      case "zap": return <Zap {...iconProps} />;
      case "globe": return <Globe {...iconProps} />;
      case "users": return <Users {...iconProps} />;
      case "award": return <Award {...iconProps} />;
      default: return null;
    }
  };

  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* TOP CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-stone-100 rounded-full -z-10" />
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
              alt="Fashion Editorial"
              className="rounded-2xl shadow-2xl w-full h-80 md:h-150 object-cover"
            />
            <div className="absolute -bottom-8 -right-8 bg-stone-900 text-white p-8 rounded-xl hidden md:block max-w-xs">
              <p className="text-amber-400 font-serif italic text-xl mb-2">
                "Style is a way to say who you are without having to speak."
              </p>
              <span className="text-[10px] tracking-widest uppercase text-stone-400">
                — Rachel Zoe
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-amber-600">
              Our Heritage
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-stone-900" style={{ fontFamily: "serif" }}>
              Defining the Modern <br />
              <em className="italic font-light text-stone-500">Silhouette</em>
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              Started in a small studio in New York, <strong>Styler Hub</strong> was born from a
              simple vision: to create timeless pieces.
            </p>
            <button className="border-b-2 border-stone-900 pb-1 font-bold text-sm tracking-widest uppercase hover:text-amber-600 cursor-pointer transition-all">
              Discover Our Process
            </button>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-stone-100">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="flex justify-center mb-4">
                {renderIcon(stat.id)}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-stone-900 mb-1 flex justify-center items-baseline">
                {stat.isCountUp ? (
                  <div className="flex items-baseline">
                    <HappyClientCounter endValue={50} />
                    <span className="ml-0.5 text-xl md:text-2xl">k+</span>
                  </div>
                ) : (
                  <span>{stat.value}</span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold px-2 text-center">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;