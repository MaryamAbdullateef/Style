import React from "react";

import fashionVideo from "../assets/Fashion.mp4";

const VideoSection = () => {
  return (
    <section className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-screen bg-black overflow-hidden">
     
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={fashionVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

    
      <div className="absolute bottom-0 left-0 w-full h-16 md:h-32 bg-linear-to-t from-black to-transparent opacity-50" />
    </section>
  );
};

export default VideoSection;