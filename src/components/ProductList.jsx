import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiFilter, FiLoader, FiAlertCircle, FiShoppingBag } from "react-icons/fi";
import API from "../utils/axios";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Categories
  useEffect(() => {
    let isMounted = true;
    const fetchCategories = async () => {
      try {
        const response = await API.get("/categories");
        if (isMounted) {
          setCategories(response.data?.data || response.data || []);
        }
      } catch (err) {
        // Non-critical, fallback to default categories
        console.error("Failed to load categories:", err);
      }
    };

    fetchCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Products with Search/Filter/Sort
  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const params = {};
        if (selectedCategory !== "all") params.category = selectedCategory;
        if (searchQuery.trim()) params.search = searchQuery.trim();
        if (sortBy !== "default") params.sort = sortBy;

        const response = await API.get("/products", { params });
        const data = response.data?.data || response.data || [];

        if (isMounted) {
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message || "Failed to fetch products. Please try again."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Debounce search input to avoid excessive requests
    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#030712] text-white py-10 px-4 sm:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight text-white">
            EXPLORE <span className="text-blue-500">COLLECTION</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Discover luxury apparel and accessories tailored for you.
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white/[0.02] p-4 rounded-2xl border border-white/10">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 py-3 pl-12 pr-4 rounded-xl outline-none focus:border-blue-500/50 text-sm text-white transition-colors"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap w-full md:w-auto gap-3 items-center">
            {/* Category Filter */}
            <div className="relative flex-1 sm:flex-initial">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#0b1329] border border-white/10 py-3 pl-10 pr-8 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 text-gray-300 appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.id || cat.slug} value={cat.slug || cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#0b1329] border border-white/10 py-3 px-4 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 text-gray-300 cursor-pointer"
            >
              <option value="default">Sort By: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <FiLoader className="animate-spin text-4xl text-blue-500 mb-3" />
            <p className="text-xs uppercase tracking-widest">Loading Products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl text-center max-w-md mx-auto my-12 flex flex-col items-center gap-2">
            <FiAlertCircle size={28} />
            <p className="text-sm">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white/[0.01] rounded-2xl border border-white/5">
            <FiShoppingBag className="mx-auto text-5xl mb-3 text-gray-600" />
            <p className="text-lg font-medium text-gray-400">No products found</p>
            <p className="text-xs text-gray-600 mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const productId = product._id || product.id;
              const imageUrl =
                product.image ||
                product.images?.[0] ||
                "https://via.placeholder.com/400x500?text=No+Image";

              return (
                <div
                  key={productId}
                  onClick={() => navigate(`/product/${productId}`)}
                  className="group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] bg-gray-900 overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={product.name || "Product"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.category && (
                      <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-400">
                        {product.category}
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                        {product.description || "No description available."}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-black text-white">
                        ${Number(product.price || 0).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;