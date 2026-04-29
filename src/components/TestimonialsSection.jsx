import { BsStarFill } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";

const reviews = [
  {
    name: "Amara O.",
    role: "Fashion Blogger · Lagos",
    text: "StylerHub changed my wardrobe game completely. The quality is incredible and delivery was surprisingly fast!",
    stars: 5,
  },
  {
    name: "Chidi N.",
    role: "Verified Buyer · Abuja",
    text: "Ordered a full suit for my wedding. It arrived perfectly and looked even better in person. Will buy again!",
    stars: 5,
  },
  {
    name: "Fatima K.",
    role: "Loyal Customer · Kano",
    text: "The kids' section is adorable. My daughter absolutely refuses to wear anything else now — she loves it!",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="bg-brand-black py-20 px-5 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-brand-blue">
              Social proof
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-white mt-1 leading-none">
              WHAT THEY <span className="text-brand-red">SAY</span>
            </h2>
          </div>
          <FiMessageSquare className="text-white/10" size={64} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className={`border p-8 transition-all duration-300 hover:-translate-y-1 ${
                i === 1
                  ? "border-brand-blue bg-brand-blue/5"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(r.stars)].map((_, j) => (
                  <BsStarFill key={j} className="text-brand-blue" size={12} />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                "{r.text}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white text-sm font-medium">{r.name}</p>
                <p className="text-white/30 text-xs tracking-wider mt-0.5">
                  {r.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
