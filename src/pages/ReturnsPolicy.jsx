import React from "react";
import { FiRefreshCw, FiShield, FiClock, FiTruck } from "react-icons/fi";

export default function ReturnsPolicy() {
  const supportEmail = "uabdullateef01@gmail.com";

  const policies = [
    {
      icon: <FiClock className="text-2xl md:text-3xl" />,
      title: "14-Day Window",
      desc: "Items must be returned within 14 days of delivery. Luxury items must be unworn with all tags attached.",
    },
    {
      icon: <FiShield className="text-2xl md:text-3xl" />,
      title: "Quality Guarantee",
      desc: "Every piece is inspected. If your elite wear arrives with a defect, we provide immediate exchange.",
    },
    {
      icon: <FiRefreshCw className="text-2xl md:text-3xl" />,
      title: "Easy Exchange",
      desc: "Swap for a different size or receive store credit instantly once the return is processed.",
    },
    {
      icon: <FiTruck className="text-2xl md:text-3xl" />,
      title: "Return Shipping",
      desc: "Complimentary return shipping for our Black Label members. Standard members incur a small logistics fee.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#001B3D] text-white pt-24 md:pt-40 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black italic tracking-tighter mb-4 leading-tight">
            RETURNS <span className="text-red-500">&</span>{" "}
            <br className="block md:hidden" /> EXCHANGES.
          </h1>
          <div className="w-16 md:w-20 h-1 bg-red-600 mx-auto mb-6" />
          <p className="text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[9px] md:text-xs max-w-lg mx-auto leading-relaxed px-4">
            Ensuring your satisfaction with the architecture of Nigerian
            fashion.
          </p>
        </div>

        {/* Grid of Policies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-16">
          {policies.map((p, i) => (
            <div
              key={i}
              className="group bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-red-500/30 transition-all duration-500 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="text-red-500 mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                {p.icon}
              </div>
              <h3 className="text-base md:text-lg font-black uppercase tracking-widest mb-3 md:mb-4">
                {p.title}
              </h3>
              <p className="text-white/40 text-xs md:text-sm leading-relaxed font-medium italic">
                "{p.desc}"
              </p>
            </div>
          ))}
        </div>

        {/* Action Box */}
        <div className="bg-gradient-to-r from-red-600 to-blue-700 p-[1px] rounded-[2rem] md:rounded-[2.5rem]">
          <div className="bg-[#001B3D] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-center">
            <h4 className="text-lg md:text-xl font-black uppercase tracking-widest mb-3">
              Start a Return
            </h4>
            <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-widest mb-8 px-2">
              Have your Order ID and Email ready to begin the process.
            </p>

            {/* The button now opens an email draft to you by default */}
            <a
              href={`mailto:${supportEmail}?subject=Return Request - Order ID: [ENTER HERE]`}
              className="inline-block bg-white text-[#001B3D] px-8 md:px-12 py-4 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl"
            >
              Initialize Portal
            </a>
          </div>
        </div>

        {/* Support Footer */}
        <p className="text-center mt-12 text-[9px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.4em]">
          Need immediate help?{" "}
          <span className="text-blue-400">Support@stylerhub.com</span>
        </p>
      </div>
    </div>
  );
}
