import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Hook into the dynamic context data stream

const AddToCart = () => {
  const { cartItems, removeFromCart } = useCart(); // Access shared reactive states
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = () => {
    const user = localStorage.getItem("styler_user");
    if (!user) {
      // Redirect to account if not authenticated, passing the current location so they return here
      navigate("/account", { state: { from: { pathname: "/order" } } });
    } else {
      navigate("/order");
    }
  };

  // Calculates subtotal instantly using proper property keys (item.price and item.quantity)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center px-6 bg-black text-white">
        <span className="text-6xl mb-6">🛍️</span>
        <h2 className="text-4xl font-black tracking-tighter mb-4 text-center">
          YOUR BAG IS EMPTY.
        </h2>
        <p className="text-gray-400 mb-8 font-light text-center">
          Style has no limits, but your bag does.
        </p>
        <Link
          to="/"
          className="bg-white text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6 pb-24 text-white bg-black">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase">
          Your Bag
        </h1>
        <p className="text-blue-500 font-bold">{cartItems.length} ITEMS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 border-b border-white/10 pb-10"
            >
              {/* Image box fallback aligned with item.img key */}
              <div className="w-32 h-44 bg-zinc-900 rounded-4xl overflow-hidden shrink-0 shadow-lg">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-xl uppercase italic">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm tracking-widest">
                      {item.category || "Apparel"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-2xl">
                    ₦{item.price.toLocaleString()}
                  </span>
                  <div className="bg-zinc-900 text-gray-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                    Qty: {item.quantity || 1}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card Panel */}
        <div className="bg-zinc-950 p-10 rounded-[3rem] border border-white/10 shadow-2xl h-fit">
          <h3 className="font-black text-xl mb-8 uppercase tracking-tighter text-white">
            Checkout Details
          </h3>
          <div className="space-y-4 mb-8 text-sm font-medium">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-white">₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-blue-400">FREE</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between text-2xl font-black">
              <span>TOTAL</span>
              <span className="text-blue-500">₦{subtotal.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-900/30 cursor-pointer"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;