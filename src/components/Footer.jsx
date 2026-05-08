import React from "react";
import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiTwitter,
  FiSend,
  FiMessageCircle,
  FiYoutube,
  FiFacebook,
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
      { label: "Track Order", to: "/track" },
      { label: "Returns", to: "/returns" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export default function Footer() {
  // Corrected WhatsApp URL format for global compatibility
  const whatsappUrl = "https://wa.me/23481677576";

  return (
    <footer className="bg-[#001B3D] border-t border-white/10 pt-16 md:pt-20 pb-10 px-4 md:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 md:mb-20">
          {/* --- BRAND SECTION --- */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter group cursor-default">
              STYLER
              <span className="text-red-500 group-hover:text-blue-400 transition-colors duration-500">
                HUB.
              </span>
            </h2>
            <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.25em] leading-relaxed max-w-xs">
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
                  className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 border border-white/5 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 ${item.color || "hover:text-blue-400"}`}
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* --- LINKS SECTION --- */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 md:gap-8">
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 border-l-2 border-red-500 pl-3">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-white/40 hover:text-white text-[11px] font-bold transition-all duration-300 flex items-center gap-2 group"
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
          <div className="lg:col-span-4 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-8 rounded-[2rem] border border-white/10 backdrop-blur-md relative overflow-hidden">
            {/* Subtle UI accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 blur-3xl rounded-full -mr-10 -mt-10" />

            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-2">
              The Newsletter
            </h4>
            <p className="text-white/40 text-[10px] mb-6 leading-relaxed uppercase tracking-tighter">
              Get early access to drops and exclusive releases.
            </p>

            <div className="relative flex items-center mb-6">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-[#001229] border border-white/10 rounded-full py-4 pl-6 pr-14 text-white text-[10px] font-bold tracking-widest focus:outline-none focus:border-red-500/50 transition-all placeholder:text-white/10"
              />
              <button className="absolute right-1.5 w-11 h-11 bg-red-600 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all shadow-xl active:scale-90">
                <FiSend size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-[9px] text-white/20 font-black uppercase tracking-widest">
                Official Support
              </p>
              <a
                href="mailto:uabdullateef01@gmail.com"
                className="text-[11px] text-blue-400 font-bold hover:text-white transition-colors block"
              >
                uabdullateef01@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-red-500/10 rounded-full border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[8px] font-black text-red-500 uppercase tracking-[0.2em]">
                System Active
              </span>
            </div>
            <p className="text-[9px] text-white/30 font-bold uppercase tracking-[0.3em]">
              Lagos, Nigeria
            </p>
          </div>

          <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em] text-center">
            © 2026 STYLERHUB. <span className="hidden sm:inline">|</span>{" "}
            DESIGNED FOR THE ELITE.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 text-[9px] text-white/40 hover:text-red-500 font-black uppercase tracking-[0.2em] transition-all"
          >
            Top
            <span className="group-hover:-translate-y-1 transition-transform duration-300">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
