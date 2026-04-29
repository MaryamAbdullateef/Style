import { useState } from "react";
import { FiMail, FiArrowRight } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="relative bg-brand-blue py-16 px-5 md:px-12 overflow-hidden">
      {/* BG decorative */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(60deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)" }} />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <FiMail className="text-white/30 mx-auto mb-4" size={36} />
        <span className="text-xs tracking-[0.3em] uppercase text-white/60">
          Join the inner circle
        </span>
        <h2 className="font-display text-4xl md:text-6xl text-white mt-2 mb-3 leading-none">
          GET EARLY ACCESS
        </h2>
        <p className="text-white/60 text-sm mb-8">
          New arrivals, exclusive deals and style guides — straight to your inbox.
        </p>
        {sent ? (
          <div className="bg-white/10 border border-white/20 py-4 px-8 inline-block">
            <p className="text-white font-medium tracking-wider text-sm">
              ✓ You're on the list!
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder-white/30 text-sm px-5 py-4 outline-none focus:border-white transition-colors"
            />
            <button
              onClick={() => email && setSent(true)}
              className="flex items-center justify-center gap-2 bg-brand-black hover:bg-zinc-900 text-white text-xs tracking-[0.2em] uppercase font-medium px-8 py-4 transition-colors"
            >
              Subscribe <FiArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}