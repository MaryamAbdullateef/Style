import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-brand-black py-20 px-5 md:px-12 border-t border-white/10 overflow-hidden"
    >
      {/* Blue accent line left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-blue via-brand-red to-transparent" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Images */}
        <div className="relative">
          <div className="w-full h-[350px] md:h-[480px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=80"
              alt="Fashion"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-2/3 h-[200px] md:h-[260px] overflow-hidden border-t-4 border-brand-blue shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80"
              alt="Fashion"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -top-4 -left-4 bg-brand-blue text-white px-5 py-3">
            <p className="font-display text-2xl">2019</p>
            <p className="text-xs text-white/60 tracking-wider">Est.</p>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-6 md:pl-6 mt-10 md:mt-0">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-brand-blue font-medium">
              Our Story
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white mt-2 leading-none">
              REDEFINING<br />
              <span className="text-brand-red">ELEGANCE</span>
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-md">
            Born in Lagos, StylerHub was built on one belief — that premium fashion should be accessible to every Nigerian. From trending streetwear to luxury occasionwear, we curate the best for men, women, and kids.
          </p>

          {/* Checkpoints */}
          <ul className="space-y-3">
            {[
              "Authentic products, zero compromise",
              "Fast delivery across all 36 states",
              "Easy returns within 7 days",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                <MdVerified className="text-brand-blue flex-shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>

          <Link
            to="/order"
            className="group inline-flex items-center gap-3 bg-brand-red hover:bg-red-700 text-white text-xs tracking-[0.2em] uppercase font-medium px-8 py-4 transition-all duration-200 hover:-translate-y-0.5 w-fit"
          >
            Shop the Collection
            <FiArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
            {[["100%", "Authentic"],["36", "States"],["7-day", "Returns"]].map(([val, label]) => (
              <div key={label}>
                <p className="font-display text-2xl text-brand-blue">{val}</p>
                <p className="text-xs text-white/30 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}