import React, { useState } from "react";
import { FiPackage, FiSearch, FiTruck, FiCheckCircle } from "react-icons/fi";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="min-h-screen bg-[#001B3D] text-white pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
            TRACK <span className="text-red-500">ORDER.</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px] md:text-xs">
            Enter your tracking ID to locate your luxury shipment.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
          <div className="relative">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4 ml-2">
              Shipment / Order ID
            </label>
            <div className="relative flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FiPackage
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500"
                  size={20}
                />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="STH-XXXX-XXXX"
                  className="w-full bg-[#001229] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold tracking-widest focus:outline-none focus:border-red-500 transition-all placeholder:text-white/10"
                />
              </div>
              <button className="bg-red-600 hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95">
                <FiSearch size={18} />
                Track
              </button>
            </div>
          </div>

          {/* Visual Mockup for results (Hidden until searched in real app) */}
          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="flex justify-between items-center relative">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 z-0" />

              {[
                { icon: FiCheckCircle, label: "Confirmed", active: true },
                { icon: FiPackage, label: "Processing", active: true },
                { icon: FiTruck, label: "In Transit", active: false },
                { icon: FiCheckCircle, label: "Delivered", active: false },
              ].map((step, i) => (
                <div
                  key={i}
                  className="relative z-10 flex flex-col items-center gap-3"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step.active ? "bg-red-600 border-red-600" : "bg-[#001229] border-white/10 text-white/20"}`}
                  >
                    <step.icon size={20} />
                  </div>
                  <span
                    className={`text-[8px] font-black uppercase tracking-widest ${step.active ? "text-white" : "text-white/20"}`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center mt-12 text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">
          Need help? Contact{" "}
          <span className="text-blue-400">logistics@stylerhub.com</span>
        </p>
      </div>
    </div>
  );
}
