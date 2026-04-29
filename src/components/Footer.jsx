import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from "react-icons/fi";

const cols = [
  { title: "Shop", links: [["Women", "/women"], ["Men", "/men"], ["Kids", "/kids"], ["Sale", "/sale"]] },
  { title: "Help", links: [["Order Now", "/order"], ["Contact", "/contact"], ["Shipping", "/shipping"], ["Returns", "/returns"]] },
  { title: "Company", links: [["About", "/about"], ["Privacy", "/privacy"], ["Terms", "/terms"], ["Careers", "/careers"]] },
];

export default function Footer() {
  return (
    <footer className="bg-[#040404] border-t border-white/10 px-5 md:px-12 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="font-display text-3xl tracking-[0.1em] text-white mb-3">
              STYLER<span className="text-brand-blue">HUB</span>
            </p>

            <p className="text-white/30 text-xs leading-relaxed max-w-xs mb-6">
              Premium fashion for the modern Nigerian. Quality that speaks before you do.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-white/10 hover:border-brand-blue hover:text-brand-blue text-white/40 flex items-center justify-center transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {cols.map((col) => (
            <div key={col.title}>
              <p className="text-xs tracking-[0.2em] uppercase text-brand-blue mb-4">
                {col.title}
              </p>

              <ul className="space-y-2.5">
                {col.links.map(([label, to]) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-white/30 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-white/20 text-xs tracking-wider">
            © 2026 StylerHub. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <p className="text-white/20 text-xs tracking-wider">
              Lagos, Nigeria 🇳🇬
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}