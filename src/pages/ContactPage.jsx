import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiArrowRight, FiCheck } from "react-icons/fi";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Minimalist Header */}
      <section className="pt-32 pb-16 px-6 text-center border-b border-white/5">
        <p className="text-[10px] tracking-[0.5em] uppercase text-brand-blue font-bold mb-4">
          Client Relations
        </p>
        <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter">
          Contact <span className="text-white/80">Us</span>
        </h1>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Left Side: Information */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide">Get in Touch</h2>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Whether you have a question about our latest collection, an existing order, 
              or a bespoke styling inquiry, our team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-brand-blue">
                <FiMail size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Email</span>
              </div>
              <p className="text-sm text-gray-300">concierge@stylehub.com</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-brand-blue">
                <FiPhone size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Phone</span>
              </div>
              <p className="text-sm text-gray-300">+234 800 STYLE HUB</p>
            </div>

            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3 text-brand-blue">
                <FiMapPin size={16} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Atelier</span>
              </div>
              <p className="text-sm text-gray-300">
                12 Fashion District, Victoria Island, Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="pt-10 border-t border-white/5">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">Service Hours</h3>
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
        <div className="bg-[#111111] p-8 md:p-12 rounded-sm border border-white/5 shadow-2xl relative overflow-hidden">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-brand-blue/20 rounded-full flex items-center justify-center text-brand-blue mb-4">
                <FiCheck size={32} />
              </div>
              <h2 className="text-2xl font-serif italic">Message Sent</h2>
              <p className="text-gray-400 text-sm">A style consultant will contact you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] uppercase tracking-widest text-brand-blue font-bold pt-4 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-brand-blue transition-colors">Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-brand-blue transition-all" 
                  />
                </div>
                <div className="group space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-brand-blue transition-colors">Email</label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-brand-blue transition-all" 
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-brand-blue transition-colors">Subject</label>
                <select className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-brand-blue transition-all text-sm text-gray-400">
                  <option className="bg-[#111]">Order Inquiry</option>
                  <option className="bg-[#111]">Styling Advice</option>
                  <option className="bg-[#111]">Return/Exchange</option>
                  <option className="bg-[#111]">General Feedback</option>
                </select>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-brand-blue transition-colors">Message</label>
                <textarea 
                  rows="4" 
                  required
                  className="w-full bg-transparent border-b border-white/10 py-2 outline-none focus:border-brand-blue transition-all resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="group flex items-center gap-4 bg-white text-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-brand-blue hover:text-white transition-all w-full md:w-auto"
              >
                Send Message
                <FiArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="h-[400px] grayscale opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15859.41727787472!2d3.4189389!3d6.425575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e89519%3A0x7d019f1816f1947b!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1640000000000!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      {/* Social Footer Section */}
      <footer className="py-20 text-center space-y-6">
        <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500">Join the Collective</p>
        <div className="flex justify-center gap-8 text-sm font-light">
          <a href="#" className="hover:text-brand-blue transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Pinterest</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Vogue Runway</a>
        </div>
      </footer>
    </main>
  );
}