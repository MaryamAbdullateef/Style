import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiTwitter,
  FiSend,
  FiMessageCircle,
  FiYoutube,
  FiCheckCircle,
} from "react-icons/fi";

const footerLinks = [
  {
    title: "Collections",
    links: [
      { label: "Men's Wear", to: "/men" },
      { label: "Women's Wear", to: "/women" },
      { label: "Kids Luxury", to: "/kids" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", to: "/track-order" },
      { label: "Returns Policy", to: "/returns-policy" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const whatsappUrl = "https://wa.me/23481677576";
  const supportEmail = "uabdullateef01@gmail.com";

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulated API call - In production, this would send to your backend/email service
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail("");
      // Success feedback in console for your tracking
      console.log(
        `Elite Subscription: ${email} registered for Styler Hub updates.`,
      );
    }, 1500);
  };

  return (
    <footer className="bg-[#001B3D] border-t border-white/10 pt-16 md:pt-24 pb-10 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 md:mb-24">
          {/* --- BRAND SECTION --- */}
          <div className="lg:col-span-4 space-y-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter group cursor-default">
              STYLER
              <span className="text-red-500 group-hover:text-blue-400 transition-colors duration-500">
                HUB.
              </span>
            </h2>
            <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.3em] leading-relaxed max-w-xs">
              The Architecture of Nigerian Fashion. <br />
              <span className="text-blue-400">Luxury</span> ·{" "}
              <span className="text-red-500">Heritage</span> ·{" "}
              <span className="text-white">Elite</span>
            </p>

            <div className="flex gap-4">
              {[
                { Icon: FiInstagram, href: "#" },
                { Icon: FiTwitter, href: "#" },
                {
                  Icon: FiMessageCircle,
                  href: whatsappUrl,
                  color: "hover:text-red-500",
                },
                { Icon: FiYoutube, href: "#" },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.includes("wa.me") ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/5 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 ${item.color || "hover:text-blue-400"}`}
                >
                  <item.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* --- LINKS SECTION --- */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 md:mt-4">
            {footerLinks.map((col) => (
              <div
                key={col.title}
                className="flex flex-col items-center md:items-start"
              >
                <h4 className="text-white text-[11px] font-black uppercase tracking-[0.4em] mb-8 border-l-2 border-red-500 pl-3">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-5 items-center md:items-start">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-white/40 hover:text-white text-[12px] font-bold transition-all duration-300 flex items-center gap-3 group"
                      >
                        <span className="w-0 h-[1px] bg-red-500 group-hover:w-4 transition-all duration-500" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* --- NEWSLETTER SECTION --- */}
          <div className="lg:col-span-4 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            {/* Ambient UI Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 blur-3xl rounded-full -mr-16 -mt-16" />

            <h4 className="text-white text-[11px] font-black uppercase tracking-[0.3em] mb-3">
              The Newsletter
            </h4>
            <p className="text-white/40 text-[10px] mb-8 leading-relaxed uppercase tracking-widest text-center md:text-left">
              {isSubscribed
                ? "Access Granted. Welcome to the Elite."
                : "Get early access to drops and exclusive releases."}
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="relative flex items-center mb-8"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  isSubscribed ? "SUBSCRIPTION ACTIVE" : "YOUR EMAIL"
                }
                disabled={isSubscribed}
                className="w-full bg-[#001229] border border-white/10 rounded-full py-5 pl-8 pr-16 text-white text-[11px] font-bold tracking-widest focus:outline-none focus:border-red-500 transition-all placeholder:text-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className={`absolute right-2 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-2xl active:scale-95 ${
                  isSubscribed ? "bg-green-500" : "bg-red-600 hover:bg-blue-600"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubscribed ? (
                  <FiCheckCircle size={20} className="text-white" />
                ) : (
                  <FiSend size={18} className="text-white" />
                )}
              </button>
            </form>

            <div className="space-y-2 text-center md:text-left">
              <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                Official Support
              </p>
              <a
                href={`mailto:${supportEmail}`}
                className="text-[12px] text-blue-400 font-bold hover:text-white transition-colors block underline underline-offset-4 decoration-white/10"
              >
                {supportEmail}
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center gap-3 px-5 py-2 bg-red-500/5 rounded-full border border-red-500/10">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
              <span className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em]">
                System Active
              </span>
            </div>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.4em]">
              Lagos, Nigeria
            </p>
          </div>

          <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.5em] text-center">
            © 2026 STYLERHUB.{" "}
            <span className="mx-2 opacity-0 md:opacity-100">|</span> DESIGNED
            FOR THE ELITE.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 text-[10px] text-white/40 hover:text-red-500 font-black uppercase tracking-[0.3em] transition-all"
          >
            Scroll to Top
            <span className="group-hover:-translate-y-2 transition-transform duration-500 ease-out text-lg">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
