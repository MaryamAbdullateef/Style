import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { FiArrowDown } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";

export default function HeroSection() {
  // react-simple-typewriter hook configuration
  const [text] = useTypewriter({
    words: ["IMPRESS.", "INSPIRE.", "EXPRESS.", "SUCCEED."],
    loop: true,
    typeSpeed: 80,
    deleteSpeed: 50,
    delaySpeed: 1800,
  });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-brand-black" />

      {/* Blue glow top-left */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-brand-blue/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/4" />

      {/* Red glow bottom-right */}
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-brand-red/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/4" />

      {/* Diagonal lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(60deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-6 animate-fadeUp">
          <span className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <BsStarFill key={i} className="text-brand-blue" size={10} />
            ))}
          </span>
          <span className="text-white/40 text-xs tracking-[0.2em] uppercase">
            Trusted by 10,000+ customers
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-6xl sm:text-7xl md:text-9xl leading-none mb-2 animate-fadeUp text-white"
          style={{ animationDelay: "0.1s" }}
        >
          DRESS TO
        </h1>

        <div
          className="font-display text-6xl sm:text-7xl md:text-9xl leading-none mb-6 animate-fadeUp flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Updated Typewriter Implementation */}
          <span className="text-brand-blue min-h-[1em]">
            {text}
            <Cursor cursorStyle="_" cursorColor="#E0190F" />
          </span>
        </div>

        <p
          className="text-white/40 max-w-md text-sm md:text-base leading-relaxed mb-10 animate-fadeUp"
          style={{ animationDelay: "0.2s" }}
        >
          Premium fashion for men, women and kids. Curated styles that turn
          heads — delivered to your door across Nigeria.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-16 animate-fadeUp"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            to="/order"
            className="bg-brand-blue hover:bg-blue-700 text-white text-xs tracking-[0.2em] uppercase font-medium px-8 py-4 transition-all duration-200 hover:-translate-y-1 text-center"
          >
            Shop Now
          </Link>
          <Link
            to="/women"
            className="border border-white/20 hover:border-brand-red text-white hover:text-brand-red text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-200 text-center"
          >
            Explore Collections
          </Link>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap gap-8 animate-fadeUp border-t border-white/10 pt-8"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            ["10K+", "Happy Customers"],
            ["500+", "Styles Available"],
            ["48h", "Delivery in Lagos"],
            ["100%", "Authentic Pieces"],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="font-display text-3xl text-brand-blue">{val}</p>
              <p className="text-white/30 text-xs tracking-wider uppercase mt-1">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Category Circles */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12 w-full mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
        {[
          {
            label: "Women",
            to: "/women",
            img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&q=80",
            accent: "border-brand-blue",
          },
          {
            label: "Men",
            to: "/men",
            img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400&q=80",
            accent: "border-brand-red",
          },
          {
            label: "Kids",
            to: "/kids",
            img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&q=80",
            accent: "border-white/40",
          },
        ].map((cat) => (
          <Link
            key={cat.to}
            to={cat.to}
            className={`group relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 ${cat.accent} hover:scale-105 transition-all duration-300 flex-shrink-0`}
          >
            <img
              src={cat.img}
              alt={cat.label}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <span className="font-display text-white text-2xl md:text-3xl tracking-[0.15em]">
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Scroll down cue */}
      <ScrollLink
        to="marquee"
        spy
        smooth
        offset={0}
        duration={600}
        className="relative z-10 mx-auto mt-12 flex flex-col items-center gap-2 cursor-pointer text-white/30 hover:text-brand-blue transition-colors"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <FiArrowDown className="animate-bounce" size={16} />
      </ScrollLink>
    </section>
  );
}
