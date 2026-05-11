import React from "react";
// Import the manual video file from your assets folder
import fashionVideo from "../assets/Fashion.mp4";

const VideoSection = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] lg:h-screen bg-black overflow-hidden">
      {/* 1. MANUAL VIDEO - Optimized for Responsiveness */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={fashionVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. UI OVERLAY - Fully Mobile Responsive */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-12">
        {/* Responsive Heading: Smaller on mobile (text-3xl), larger on desktop (text-7xl) */}
        <h2
          className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter uppercase mb-4 md:mb-6"
          style={{ fontFamily: "serif" }}
        >
          The <span className="text-[#0070f3]">Modern</span> Era
        </h2>

        {/* Responsive Paragraph: Hidden or smaller on tiny screens to save space */}
        <p className="text-gray-300 text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.5em] uppercase max-w-[90%] md:max-w-xl leading-relaxed mb-8 md:mb-12">
          Experience the intersection of luxury and street culture.{" "}
          <br className="hidden md:block" />
          New Season now available.
        </p>

        {/* Responsive Button: Larger tap area for mobile users */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="bg-[#0070f3] text-white px-10 py-4 md:px-12 md:py-5 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-sm shadow-xl">
            Shop Collection
          </button>
        </div>
      </div>

      {/* 3. GRADIENT FADE - Ensures smooth blending on all screens */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-40 bg-linear-to-t from-black via-black/50 to-transparent" />
    </section>
  );
};

export default VideoSection;
