import React, { useState } from "react";
import { FiPackage, FiSearch, FiTruck, FiCheckCircle } from "react-icons/fi";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // 0-based index: 1 = Processing

  const trackingSteps = [
    { icon: FiCheckCircle, label: "Confirmed" },
    { icon: FiPackage, label: "Processing" },
    { icon: FiTruck, label: "In Transit" },
    { icon: FiCheckCircle, label: "Delivered" },
  ];

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    // TODO: Connect your backend API fetch here
    console.log("Tracking order:", orderId);
  };

  // Calculate active line width percentage based on step index
  const progressPercentage = (currentStepIndex / (trackingSteps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-[#030712] text-white pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Premium Blue Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase">
            TRACK <span className="text-blue-500">ORDER.</span>
          </h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] md:text-xs">
            Enter your tracking ID to locate your luxury shipment.
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl">
          <form onSubmit={handleTrackSubmit} className="relative">
            <label 
              htmlFor="tracking-input" 
              className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 ml-2"
            >
              Shipment / Order ID
            </label>
            <div className="relative flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FiPackage
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 pointer-events-none"
                  size={20}
                />
                <input
                  id="tracking-input"
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="STH-XXXX-XXXX"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-white font-bold tracking-widest focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10 text-sm"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-blue-900/25 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FiSearch size={18} />
                Track
              </button>
            </div>
          </form>

          {/* Visual Progress Tracker */}
          <div className="mt-16 pt-16 border-t border-white/5">
            <div className="flex justify-between items-center relative">
              {/* Background Track Line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2 z-0" />
              
              {/* Highlighted Active Track Line */}
              <div 
                className="absolute top-1/2 left-0 h-[2px] bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              />

              {trackingSteps.map((step, index) => {
                const isActive = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <div
                    key={step.label}
                    className="relative z-10 flex flex-col items-center gap-3"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                        isActive
                          ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30"
                          : "bg-zinc-950 border-white/10 text-white/20"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-300 ${
                          isActive ? "text-white" : "text-white/20"
                        }`}
                      >
                        {step.label}
                      </span>

                      {/* Live Status Accent Dot */}
                      {isCurrent && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Support Notice */}
        <p className="text-center mt-12 text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">
          Need help? Contact{" "}
          <a
            href="mailto:logistics@stylerhub.com"
            className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            logistics@stylerhub.com
          </a>
        </p>
      </div>
    </div>
  );
}