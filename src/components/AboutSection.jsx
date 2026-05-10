import React from "react";
import { Award, Globe, Users, Zap } from "lucide-react";

const stats = [
  { label: "Founded", value: "2018", icon: Zap },
  { label: "Global Stores", value: "12", icon: Globe },
  { label: "Happy Clients", value: "50k+", icon: Users },
  { label: "Design Awards", value: "08", icon: Award },
];

const AboutSection = () => {
  return (
    <section className="bg-white py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION: Story & Image */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-64 h-64 bg-stone-100 rounded-full -z-10" />
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
              alt="Fashion Editorial"
              className="rounded-2xl shadow-2xl w-full h-150 object-cover"
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
            <h2
              className="text-4xl md:text-6xl font-bold leading-tight text-stone-900"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Defining the Modern <br />
              <em className="italic font-serif text-stone-500 font-light">
                Silhouette
              </em>
            </h2>
            <p className="text-stone-600 leading-relaxed text-lg">
              Started in a small studio in New York, FashionHub was born from a
              simple vision: to create timeless pieces that empower the
              individual. We believe that luxury shouldn't be loud; it should be
              felt in the quality of the fabric and the precision of the cut.
            </p>
            <p className="text-stone-500 leading-relaxed">
              Every collection we release is a balanced dialogue between classic
              tailoring and contemporary edge. We source our materials from
              sustainable mills and partner with artisans who share our
              commitment to ethical craftsmanship.
            </p>
            <button className="border-b-2 border-stone-900 pb-1 font-bold text-sm tracking-widest uppercase hover:text-amber-600 hover:border-amber-600 transition-all">
              Discover Our Process
            </button>
          </div>
        </div>

        {/* BOTTOM SECTION: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-stone-100">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="flex justify-center mb-4">
                <stat.icon
                  className="text-stone-300 group-hover:text-amber-500 transition-colors duration-300"
                  size={28}
                />
              </div>
              <h4 className="text-3xl font-bold text-stone-900 mb-1">
                {stat.value}
              </h4>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* MISSION STATEMENT */}
        <div className="mt-24 text-center max-w-3xl mx-auto">
          <h3
            className="text-2xl font-medium text-stone-800 mb-6 italic"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "We aren't just making clothes; we are curating confidence."
          </h3>
          <div className="h-1 w-12 bg-amber-400 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
