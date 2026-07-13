import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiShoppingBag } from "react-icons/fi";
import { allProducts } from "../context/ProductData"; // Shared catalog
import { useCart } from "../context/CartContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const brandBlue = "#0070f3";

  const categories = [
    {
      name: "Men",
      route: "/men",
      keywords: ["man", "men", "male", "menswear"],
      img: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400",
    },
    {
      name: "Women",
      route: "/women",
      keywords: ["woman", "women", "female", "womenswear", "ladies"],
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400",
    },
    {
      name: "Kids",
      route: "/kids",
      keywords: ["kid", "kids", "child", "children", "junior", "boys", "girls", "unisex"],
      img: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=400",
    },
  ];

  // Smart Matching Search Engine Engine Loop
  const searchResults = useMemo(() => {
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return [];

    const searchTokens = cleanQuery.split(/\s+/); // Handle multi-word searches like "black top"

    return allProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const productCat = product.category.toLowerCase();
      const productSection = product.section.toLowerCase();
      
      // Map gender subcategories for better matching
      const targetTags = [...(product.tags || []), productSection, productCat];
      if (productCat === "boys" || productCat === "girls" || productCat === "unisex") {
        targetTags.push("kids", "child", "children", "junior");
      }

      // Every word in the user's query must match either the name, category, or section tags
      return searchTokens.every((token) => {
        return (
          productName.includes(token) ||
          productCat.includes(token) ||
          productSection.includes(token) ||
          targetTags.some((tag) => tag.toLowerCase().includes(token))
        );
      });
    });
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchText = query.toLowerCase().trim();
    if (!searchText) return;

    // Direct routing fallback matching
    const matchedCategory = categories.find((cat) =>
      cat.keywords.some((keyword) => searchText === keyword)
    );

    if (matchedCategory) {
      navigate(matchedCategory.route);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-28 px-4 sm:px-6 lg:px-10 pb-16 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-900/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="relative group">
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="p-3 rounded-2xl shadow-lg" style={{ backgroundColor: brandBlue }}>
              <FiSearch className="text-white text-xl sm:text-2xl" />
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH PRODUCT CATALOG..."
              className="w-full bg-transparent text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight outline-none placeholder:text-gray-800 uppercase"
            />
          </div>
          <div className="h-0.5 w-full bg-white/10 mt-5 group-focus-within:bg-[#0070f3] transition-all duration-500"></div>
        </form>

        {/* CONDITIONAL CONDITIONS FOR SEARCH RESULTS GRID */}
        {query.trim() !== "" ? (
          <div className="mt-16">
            <h3 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 font-black mb-8">
              Found Products ({searchResults.length})
            </h3>

            {searchResults.length === 0 ? (
              <p className="text-gray-500 text-lg py-12">No products found. Try another search.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {searchResults.map((p) => (
                  <div key={p.id} className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col justify-between">
                    <div className="relative aspect-[3/4] bg-white/5 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <button
                        onClick={() => addToCart(p)}
                        className="absolute bottom-0 left-0 right-0 py-3 text-[11px] font-black uppercase tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"
                        style={{ backgroundColor: brandBlue }}
                      >
                        <FiShoppingBag size={14} /> Quick Purchase
                      </button>
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] uppercase font-black tracking-wider" style={{ color: brandBlue }}>{p.section} &bull; {p.category}</p>
                      <h3 className="text-sm font-black mt-1 text-white/90 line-clamp-1">{p.name}</h3>
                      <p className="font-black text-sm mt-2">₦{p.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* QUICK COLLECTIONS DISPLAY ON BLANK QUERY STATE */
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
              <h3 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-400 font-black">
                Quick Departments
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => navigate(cat.route)}
                  className="relative h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden cursor-pointer group border border-white/10"
                >
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight">
                      {cat.name}
                    </h2>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-400 group-hover:text-white transition-colors">
                      Explore Collection &rarr;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;