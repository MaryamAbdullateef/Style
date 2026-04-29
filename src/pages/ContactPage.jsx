import React from "react";
import {
  Mail,
  // Phone,
  // MapPin,
  // Instagram,
  // Twitter,
  // Facebook, facebookicons // Fixed: Standardized to the library name
} from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted successfully");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header Section */}
      <div className="py-16 px-6 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-black">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto leading-relaxed">
          Questions about your order or our latest collections? Our team is here
          to help you find your perfect fit.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Information Side */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-5 group">
                <div className="bg-black p-4 rounded-full text-white transition-transform group-hover:scale-110">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Call Us
                  </p>
                  <p className="text-lg font-medium">+1 (555) 000-1234</p>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="bg-black p-4 rounded-full text-white transition-transform group-hover:scale-110">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Email Us
                  </p>
                  <p className="text-lg font-medium">support@fashionhub.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-5 group">
                <div className="bg-black p-4 rounded-full text-white transition-transform group-hover:scale-110">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    Visit Store
                  </p>
                  <p className="text-lg font-medium">
                    123 Fashion Ave, New York, NY
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-sm uppercase tracking-[0.2em] font-bold mb-6 text-gray-400">
              Follow Our Journey
            </h3>
            <div className="flex space-x-6">
              <Instagram
                className="cursor-pointer hover:text-pink-600 transition-all hover:-translate-y-1"
                size={28}
              />
              <Twitter
                className="cursor-pointer hover:text-blue-400 transition-all hover:-translate-y-1"
                size={28}
              />
              {/* <Facebook
                className="cursor-pointer hover:text-blue-700 transition-all hover:-translate-y-1"
                size={28}
              /> */}
            </div>
          </div>
        </div>

        {/* Contact Form Side */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-xs uppercase font-bold tracking-wider mb-2 ml-1">
                  First Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="John"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs uppercase font-bold tracking-wider mb-2 ml-1">
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Doe"
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase font-bold tracking-wider mb-2 ml-1">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="john@fashion.com"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase font-bold tracking-wider mb-2 ml-1">
                Inquiry Type
              </label>
              <select className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all outline-none appearance-none cursor-pointer">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Returns & Exchanges</option>
                <option>Wholesale</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs uppercase font-bold tracking-wider mb-2 ml-1">
                Message
              </label>
              <textarea
                required
                rows="4"
                placeholder="How can we help you?"
                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 transition-all outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-5 rounded-xl font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-lg shadow-gray-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
