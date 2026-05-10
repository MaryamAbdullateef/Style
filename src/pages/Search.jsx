import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // CATEGORY DATA
  const categories = [
    {
      name: "Men",
      route: "/men",
      keywords: ["man", "men", "male"],
      img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400",
    },
    {
      name: "Women",
      route: "/women",
      keywords: ["woman", "women", "female"],
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    },
    {
      name: "Kids",
      route: "/kids",
      keywords: ["kid", "kids", "child", "children"],
      img: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400",
    },
  ];


  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = query.toLowerCase().trim();

    // 1. We move Women to the top of the check OR use exact matching
    const matchedCategory = categories.find((category) =>
      category.keywords.some((keyword) => 
        // FIX: Use exact equality (===) so "women" doesn't match "men"
        searchText === keyword
      )
    );

    if (matchedCategory) {
      navigate(matchedCategory.route);
    } else {
      // Default fallback if no match is found
      navigate("/collections");
    }
  };

  return (
    <div className="min-h-screen bg-[#03152b] text-white pt-28 px-4 sm:px-6 lg:px-10 pb-16 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-red-600/20 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="bg-gradient-to-r from-blue-600 to-red-600 p-3 rounded-2xl shadow-lg">
              <FiSearch className="text-white text-xl sm:text-2xl" />
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH COLLECTIONS..."
              className="w-full bg-transparent text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight outline-none placeholder:text-gray-500"
            />
          </div>
          <div className="h-[2px] w-full bg-gray-700 mt-5 group-focus-within:bg-gradient-to-r group-focus-within:from-blue-500 group-focus-within:to-red-500 transition-all duration-500"></div>
        </form>

        {/* QUICK COLLECTIONS */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
            <h3 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
              Quick Collections
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm">
              Search Men, Women or Kids
            </p>
          </div>

          {/* CATEGORY GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                onClick={() => {
                  // Explicitly navigate using the specific object's route
                  navigate(cat.route);
                }}
                className="relative h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-blue-900/70 group-hover:to-red-900/70 transition-all duration-500"></div>

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight">
                    {cat.name}
                  </h2>
                  <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-300">
                    Explore Collection
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/70 rounded-3xl transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
