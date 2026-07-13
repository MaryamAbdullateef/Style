import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa"; // Imported WhatsApp Icon

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const brandBlue = "#0070f3"; // Unified Theme Color Token

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleWhatsAppRedirect = () => {
    const msg = encodeURIComponent("Hello STYLERHUB, I would like to make an inquiry regarding your collections.");
    window.open(`https://wa.me/2340000000000?text=${msg}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white relative">
      {/* Dynamic Keyframe Injection for the Bouncing WhatsApp CTA Widget */}
      <style>{`
        @keyframes customBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .whatsapp-bounce {
          animation: customBounce 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* Minimalist Header */}
      <section className="pt-32 pb-16 px-6 text-center border-b border-white/5">
        <p style={{ color: brandBlue }} className="text-[10px] tracking-[0.5em] uppercase font-bold mb-4">
          Client Relations
        </p>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
          Contact <span className="text-white/80">Us</span>
        </h1>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Information */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-wide">Get in Touch</h2>
            <p className="text-gray-400 leading-relaxed max-w-md text-sm">
              Whether you have a question about our latest collection, an existing order, 
              or a bespoke styling inquiry, our team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <div style={{ color: brandBlue }} className="flex items-center gap-3">
                <FiMail size={16} />
                <span className="text-[10px] uppercase tracking-widest font-black">Email</span>
              </div>
              <p className="text-sm text-gray-300">concierge@stylehub.com</p>
            </div>

            <div className="space-y-3">
              <div style={{ color: brandBlue }} className="flex items-center gap-3">
                <FiPhone size={16} />
                <span className="text-[10px] uppercase tracking-widest font-black">Phone</span>
              </div>
              <p className="text-sm text-gray-300">+234 800 STYLE HUB</p>
            </div>

            <div className="space-y-3 md:col-span-2">
              <div style={{ color: brandBlue }} className="flex items-center gap-3">
                <FiMapPin size={16} />
                <span className="text-[10px] uppercase tracking-widest font-black">Atelier</span>
              </div>
              <p className="text-sm text-gray-300">
                12 Fashion District, Victoria Island, Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="pt-10 border-t border-white/5">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 font-black">Service Hours</h3>
            <div className="flex justify-between text-xs text-gray-400 max-w-xs">
              <span>Mon — Fri</span>
              <span>09:00 — 18:00</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 max-w-xs mt-2">
              <span>Sat — Sun</span>
              <span>10:00 — 16:00</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="bg-[#0d0d0d] p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div style={{ backgroundColor: `${brandBlue}20`, color: brandBlue }} className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <FiCheck size={32} />
              </div>
              <h2 className="text-2xl font-black uppercase">Message Sent</h2>
              <p className="text-gray-400 text-sm">A style consultant will contact you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                style={{ color: brandBlue }}
                className="text-[10px] uppercase tracking-widest font-bold pt-4 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-white transition-colors font-black">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-all text-sm" 
                  />
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-white transition-colors font-black">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-all text-sm" 
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-white transition-colors font-black">Subject</label>
                <select className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-all text-sm text-gray-400">
                  <option className="bg-[#0d0d0d] text-white">Order Inquiry</option>
                  <option className="bg-[#0d0d0d] text-white">Styling Advice</option>
                  <option className="bg-[#0d0d0d] text-white">Return/Exchange</option>
                  <option className="bg-[#0d0d0d] text-white">General Feedback</option>
                </select>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-white transition-colors font-black">Message</label>
                <textarea 
                  rows="4" 
                  required
                  className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-white transition-all resize-none text-sm"
                ></textarea>
              </div>

              <button 
                type="submit"
                style={{ backgroundColor: brandBlue }}
                className="group flex items-center gap-4 text-white px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all w-full md:w-auto rounded-xl justify-center active:scale-95"
              >
                Send Message
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000 border-y border-white/5">
        <iframe
          title="location"
          src="https://maps.google.com/maps?q=Victoria%20Island,%20Lagos&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Social Footer Section */}
      <footer className="py-20 text-center space-y-6">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-black">Join the Collective</p>
        <div className="flex justify-center gap-8 text-xs font-bold uppercase tracking-wider">
          <a href="#" style={{ "&:hover": { color: brandBlue } }} className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          <a href="#" className="hover:text-white transition-colors">Vogue Runway</a>
        </div>
      </footer>

      {/* Bouncing Sticky Floating WhatsApp CTA Button */}
      <button
        onClick={handleWhatsAppRedirect}
        className="whatsapp-bounce fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:scale-110 active:scale-90 transition-transform duration-300 flex items-center justify-center group"
        title="Chat with us"
      >
        <FaWhatsapp size={28} />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-xs font-black uppercase tracking-widest transition-all duration-500 ease-out whitespace-nowrap">
          Chat With Us
        </span>
      </button>
    </main>
  );
}