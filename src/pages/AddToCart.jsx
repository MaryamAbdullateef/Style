import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("styler_cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handleCheckout = () => {
    const user = localStorage.getItem("styler_user");
    if (!user) {
      // Stubborn user protection: Redirect to account if not logged in
      alert("Please login to place an order.");
      navigate("/account", { state: { from: { pathname: "/order" } } });
    } else {
      navigate("/order");
    }
  };

  const removeProduct = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("styler_cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage")); // Updates Navbar badge
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center px-6">
        <span className="text-6xl mb-6">🛍️</span>
        <h2 className="text-4xl font-black tracking-tighter mb-4 text-center">
          YOUR BAG IS EMPTY.
        </h2>
        <p className="text-gray-400 mb-8 font-light text-center">
          Style has no limits, but your bag does.
        </p>
        <Link
          to="/shop"
          className="bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-32 px-6 pb-24">
      <div className="flex justify-between items-end mb-12">
        <h1 className="text-5xl font-black tracking-tighter uppercase">
          Your Bag
        </h1>
        <p className="text-red-500 font-bold">{cartItems.length} ITEMS</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-10">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-8 border-b border-gray-100 pb-10"
            >
              <div className="w-32 h-44 bg-gray-100 rounded-4xl overflow-hidden shrink-0 shadow-lg">
                <img src={item.image} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-xl uppercase italic">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm tracking-widest">
                      {item.category}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProduct(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-black text-2xl">${item.price}</span>
                  <div className="bg-gray-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                    Qty: 1
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)] h-fit">
          <h3 className="font-black text-xl mb-8 uppercase tracking-tighter">
            Checkout Details
          </h3>
          <div className="space-y-4 mb-8 text-sm font-medium">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="text-black">$450.00</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-green-500">FREE</span>
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between text-2xl font-black">
              <span>TOTAL</span>
              <span>$450.00</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-red-200"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
