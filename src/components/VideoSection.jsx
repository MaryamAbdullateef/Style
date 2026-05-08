import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const brandBlue = "#0070f3";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="bg-[#040404] py-24 px-5 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <p
              className="text-[10px] tracking-[0.4em] uppercase font-bold mb-4"
              style={{ color: brandBlue }}
            >
              The Brand Film
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Crafting the <br />
              <span className="italic font-serif text-white/60">
                Future of Identity.
              </span>
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed border-l border-white/10 pl-6 hidden md:block">
            Take a behind-the-scenes look at our 2026 atelier process in Lagos,
            where traditional craftsmanship meets digital precision.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video md:aspect-[21/9] shadow-2xl">
          {/* Video Element */}
          <video
            src="H&M Fashion Haul: Men's, Boys, Toddlers & Women's Clothes"
            type="video/mp4"
            ref={videoRef}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
          ></video>

          {/* Custom Overlay Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause fill="black" size={20} />
                  ) : (
                    <Play fill="black" size={20} className="ml-1" />
                  )}
                </button>

                <div className="hidden sm:block">
                  <p className="text-white text-xs font-bold tracking-widest uppercase">
                    StylerHub: The Origin
                  </p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">
                    Chapter 01 — 03:45
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-xl border border-white/10 hover:bg-white/10 text-white transition-all"
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <button className="p-3 rounded-xl border border-white/10 hover:bg-white/10 text-white transition-all">
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Big Play Button (shown only when paused/not hovered) */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={togglePlay}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:scale-110 transition-all duration-500">
                <Play fill="white" size={32} className="ml-1" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
