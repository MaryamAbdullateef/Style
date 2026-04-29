import { FiPlay } from "react-icons/fi";
import { useState } from "react";

const tiles = [
  { title: "Craftsmanship", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", desc: "Every stitch, deliberate." },
  { title: "Style Stories", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80", desc: "Real people, real style." },
  { title: "New Season", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", desc: "Fresh drops every Friday." },
];

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="bg-brand-black py-20 px-5 md:px-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-brand-blue">
            Behind the brand
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-white mt-1 leading-none">
            THE <span className="text-brand-red">EXPERIENCE</span>
          </h2>
        </div>

        {/* Main Video */}
        <div className="relative w-full aspect-video mb-6 overflow-hidden border border-white/10 group">
          {playing ? (
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/hiqXmkOE15g?autoplay=1&controls=1&rel=0"
              title="StylerHub"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
                alt="Video cover"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setPlaying(true)}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-brand-blue hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <FiPlay className="text-white ml-1" size={24} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-6">
                <p className="font-display text-3xl text-white">
                  OUR STORY IN MOTION
                </p>
                <p className="text-white/40 text-sm mt-1">
                  Watch how we bring your style to life
                </p>
              </div>
            </>
          )}
        </div>

        {/* Three tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className="group relative overflow-hidden aspect-video border border-white/10 hover:border-brand-blue transition-colors duration-300"
            >
              <img
                src={tile.img}
                alt={tile.title}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h4 className="font-display text-xl text-white">{tile.title}</h4>
                <p className="text-white/40 text-xs mt-0.5">{tile.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}