import React, { useState } from "react";
import { FiRefreshCw, FiShield, FiClock, FiTruck, FiArrowRight, FiX, FiMail } from "react-icons/fi";

export default function ReturnsPolicy() {
  const supportEmail = "uabdullateef01@gmail.com";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");

  const policies = [
    {
      id: "policy-14-day",
      icon: FiClock,
      title: "14-Day Window",
      desc: "Items must be returned within 14 days of delivery. Luxury pieces must be unworn with original tags attached.",
    },
    {
      id: "policy-quality",
      icon: FiShield,
      title: "Quality Guarantee",
      desc: "Every piece undergoes strict inspection. If your garment arrives with a defect, we issue an immediate exchange.",
    },
    {
      id: "policy-exchange",
      icon: FiRefreshCw,
      title: "Easy Exchange",
      desc: "Swap for an alternate size or opt for instant store credit once your returned item passes verification.",
    },
    {
      id: "policy-shipping",
      icon: FiTruck,
      title: "Return Shipping",
      desc: "Complimentary return shipping for Black Label members. Standard members incur a modest flat-rate logistics fee.",
    },
  ];

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim() || !email.trim()) return;

    const mailtoSubject = encodeURIComponent(`Return Request - Order ID: ${orderId}`);
    const mailtoBody = encodeURIComponent(
      `Hello Support Team,\n\nI would like to initiate a return for my order.\n\nOrder ID: ${orderId}\nCustomer Email: ${email}\n\nThank you.`
    );

    window.location.href = `mailto:${supportEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-28 md:pt-36 pb-20 px-4 md:px-6 relative overflow-hidden">
      {/* Subtle Background Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-tighter mb-4 leading-tight uppercase">
            RETURNS <span className="text-blue-500">&</span> EXCHANGES<span className="text-red-500">.</span>
          </h1>
          <div className="w-16 md:w-20 h-[2px] bg-blue-600 mx-auto mb-6 opacity-80" />
          <p className="text-white/50 uppercase tracking-[0.25em] md:tracking-[0.3em] text-[9px] md:text-xs max-w-lg mx-auto leading-relaxed px-4">
            Ensuring precision & satisfaction with the architecture of luxury fashion.
          </p>
        </div>

        {/* Grid of Policies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-16">
          {policies.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.id}
                className="group bg-white/[0.02] border border-white/10 hover:border-blue-500/50 p-6 md:p-8 rounded-[1.8rem] backdrop-blur-xl transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left shadow-lg hover:shadow-blue-500/5"
              >
                <div className="p-3.5 rounded-2xl bg-blue-600/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 mb-5">
                  <IconComponent size={24} />
                </div>
                <h2 className="text-base md:text-lg font-black uppercase tracking-wider mb-2.5">
                  {p.title}
                </h2>
                <p className="text-white/40 text-xs md:text-sm leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Primary Action Card */}
        <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/10 rounded-[2.2rem] p-8 md:p-12 text-center backdrop-blur-2xl shadow-2xl">
          <h3 className="text-lg md:text-2xl font-black uppercase tracking-widest mb-3">
            Initiate a Return
          </h3>
          <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-widest mb-8 max-w-md mx-auto">
            Provide your Order ID and Account Details to start your request instantly.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-lg shadow-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <span>Initialize Portal</span>
            <FiArrowRight size={16} />
          </button>
        </div>

        {/* Footer Info */}
        <p className="text-center mt-12 text-[10px] text-white/30 font-bold uppercase tracking-[0.3em]">
          Need immediate assistance?{" "}
          <a
            href={`mailto:${supportEmail}`}
            className="text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-500/30 underline-offset-4"
          >
            {supportEmail}
          </a>
        </p>
      </div>

      {/* Return Request Interactive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0A0F1D] border border-white/10 rounded-[2rem] p-6 md:p-8 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              aria-label="Close dialog"
            >
              <FiX size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-600/10 text-blue-400 rounded-xl">
                <FiMail size={20} />
              </div>
              <div>
                <h4 className="text-base font-black uppercase tracking-wider">Start Return Portal</h4>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">Enter details to proceed</p>
              </div>
            </div>

            <form onSubmit={handleReturnSubmit} className="space-y-4">
              <div>
                <label htmlFor="return-order-id" className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                  Order ID
                </label>
                <input
                  id="return-order-id"
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. STH-8942-X"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs font-semibold focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                />
              </div>

              <div>
                <label htmlFor="return-email" className="block text-[10px] font-black uppercase tracking-widest text-white/50 mb-2">
                  Email Address
                </label>
                <input
                  id="return-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3.5 px-4 text-white text-xs font-semibold focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3.5 rounded-xl border border-white/10 text-white/60 hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/40"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}