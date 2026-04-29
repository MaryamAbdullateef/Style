import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const cats = [
  {
    name: "Women",
    sub: "124 Styles",
    desc: "Bold, elegant and curated for every occasion.",
    to: "/women",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&q=80",
    accent: "bg-brand-blue",
  },
  {
    name: "Men",
    sub: "98 Styles",
    desc: "Sharp tailoring meets modern streetwear.",
    to: "/men",
    img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=600&q=80",
    accent: "bg-brand-red",
  },
  {
    name: "Kids",
    sub: "67 Styles",
    desc: "Colorful, comfy styles little ones love.",
    to: "/kids",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    accent: "bg-white",
  },
];

export default function CategoriesSection() {
  return (
    <section
      id="categories"
      className="bg-brand-black py-20 px-5 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-brand-blue">
              Collections
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white mt-1 leading-none">
              SHOP BY<br />
              <span className="text-brand-red">CATEGORY</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed">
            Three worlds, one destination. Discover styles crafted for everyone in your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cats.map((cat) => (
            <Link
              key={cat.name}
              to={cat.to}
              className="group relative overflow-hidden aspect-[3/4] block"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Tag top */}
              <span
                className={`absolute top-4 left-4 ${cat.accent} ${cat.accent === "bg-white" ? "text-black" : "text-white"} text-xs font-medium px-3 py-1 tracking-wider uppercase`}
              >
                {cat.sub}
              </span>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-4xl text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-white/50 text-sm mb-5">{cat.desc}</p>
                <span
                  className={`inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-medium ${cat.accent === "bg-white" ? "text-white" : "text-white"} border-b border-white/30 pb-0.5 group-hover:border-white transition-colors`}
                >
                  Explore <FiArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}