import React, { useState, useEffect } from "react";
import { Plus, Minus, ShoppingBag, ChevronRight, Lock, Globe, CreditCard, Landmark, Truck, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Import the global location database helpers
import { Country, State, City } from "country-state-city";

// Comprehensive Global Currency Array (10 Major Currencies)
const CURRENCY_CONFIG = {
  NGN: { symbol: "₦", rate: 1, shipping: 2500, label: "Nigeria (NGN ₦)" },
  USD: { symbol: "$", rate: 0.00067, shipping: 15, label: "United States (USD $)" },
  GBP: { symbol: "£", rate: 0.00053, shipping: 12, label: "United Kingdom (GBP £)" },
  EUR: { symbol: "€", rate: 0.00062, shipping: 14, label: "Eurozone (EUR €)" },
  CAD: { symbol: "C$", rate: 0.00091, shipping: 20, label: "Canada (CAD C$)" },
  AUD: { symbol: "A$", rate: 0.00102, shipping: 22, label: "Australia (AUD A$)" },
  ZAR: { symbol: "R", rate: 0.0125, shipping: 280, label: "South Africa (ZAR R)" },
  KES: { symbol: "KSh", rate: 0.087, shipping: 1900, label: "Kenya (KES KSh)" },
  GHS: { symbol: "GH₵", rate: 0.0101, shipping: 220, label: "Ghana (GHS GH₵)" },
  JPY: { symbol: "¥", rate: 0.103, shipping: 2200, label: "Japan (JPY ¥)" }
};

export default function Order() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [issubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currency, setCurrency] = useState("NGN");
  const [formError, setFormError] = useState("");

  // Dynamic Location Lists based on selections
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  // Authenticated State Sync using unified user token keys
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("styler_user");
    return savedUser ? JSON.parse(savedUser) : { name: "MABDULLATEEF80", email: "user@stylerhub.com" };
  });

  // State initialization with fallback mockup values
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("styler_cart"));
    if (savedCart && savedCart.length > 0) return savedCart;
    return [
      {
        id: "mock_1",
        name: "Luxury Oversized Streetwear Hoodie",
        price: 45000,
        qty: 1,
        color: "Midnight Black",
        size: "XL",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500"
      },
      {
        id: "mock_2",
        name: "Classic Heavyweight Cargo Pants",
        price: 38000,
        qty: 2,
        color: "Desert Khaki",
        size: "L",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"
      }
    ];
  });

  // Note: country and state fields now store ISO CODES (e.g., 'NG', 'LA') internally for accurate API lookup
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: "Mabdullateef80",
    phone: "",
    country: "", 
    state: "",   
    city: "",    
    address: "",
  });

  // Load countries on mount
  useEffect(() => {
    setCountriesList(Country.getAllCountries());
    if (user && !deliveryForm.fullName) {
      setDeliveryForm((prev) => ({ ...prev, fullName: user.name || "" }));
    }
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [user]);

  // Dynamic Cascade Hook: Fetch States when Country updates
  useEffect(() => {
    if (deliveryForm.country) {
      const states = State.getStatesOfCountry(deliveryForm.country);
      setStatesList(states);
      setCitiesList([]);
    } else {
      setStatesList([]);
      setCitiesList([]);
    }
  }, [deliveryForm.country]);

  // Dynamic Cascade Hook: Fetch Cities when State updates
  useEffect(() => {
    if (deliveryForm.country && deliveryForm.state) {
      const cities = City.getCitiesOfState(deliveryForm.country, deliveryForm.state);
      setCitiesList(cities);
    } else {
      setCitiesList([]);
    }
  }, [deliveryForm.country, deliveryForm.state]);

  const handleDeliveryChange = (e) => {
    setFormError("");
    const { name, value } = e.target;
    
    if (name === "country") {
      setDeliveryForm(prev => ({ ...prev, country: value, state: "", city: "" }));
    } else if (name === "state") {
      setDeliveryForm(prev => ({ ...prev, state: value, city: "" }));
    } else {
      setDeliveryForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const updateQty = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) } : item
    );
    setCart(updated);
    if (!id.toString().startsWith("mock_")) {
      localStorage.setItem("styler_cart", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    }
  };

  // Base Calculations
  const baseSubtotal = cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.qty || 1), 0);
  const currentCurrency = CURRENCY_CONFIG[currency];
  const calculatedSubtotal = baseSubtotal * currentCurrency.rate;
  const calculatedShipping = currentCurrency.shipping;
  const calculatedTotal = calculatedSubtotal + calculatedShipping;

  const formatPrice = (value) => {
    const fractionalDigits = ["NGN", "JPY"].includes(currency) ? 0 : 2;
    return `${currentCurrency.symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: fractionalDigits,
      maximumFractionDigits: fractionalDigits
    })}`;
  };

  const finalizeOrder = async () => {
    if (
      !deliveryForm.fullName || 
      !deliveryForm.phone || 
      !deliveryForm.country || 
      !deliveryForm.state || 
      !deliveryForm.city || 
      !deliveryForm.address
    ) {
      setFormError("Please fill out all delivery and location fields before authorizing your order.");
      window.scrollTo({ top: 200, behavior: "smooth" });
      return;
    }
    
    setFormError("");
    setIsSubmitting(true);

    setTimeout(() => {
      localStorage.removeItem("styler_cart");
      window.dispatchEvent(new Event("storage"));
      setIsSubmitting(false);
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1800);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Banner Segment */}
        <div className="bg-gradient-to-br from-[#001B3D] to-black rounded-3xl p-8 md:p-12 mb-10 border border-white/5 shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
            Checkout <span className="text-blue-500 underline decoration-1">Hub.</span>
          </h1>
          {user && !orderSuccess && (
            <p className="mt-4 text-blue-400 font-bold uppercase text-[10px] tracking-widest">
              Logged in as: {user.name || user.email}
            </p>
          )}
        </div>

        {orderSuccess ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white/5 rounded-4xl border border-white/10">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-4">Order Received!</h2>
            <p className="text-white/60 mb-8 px-10">
              Thank you for shopping with Styler Hub. Your global invoice tracking statement in {currency} is being processed.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-blue-700 transition-all"
            >
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Side Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Delivery Gateway */}
              <section className="bg-white/5 rounded-3xl p-6 md:p-10 border border-white/10">
                <h2 className="text-xl font-black uppercase mb-8 tracking-tight">Delivery Details</h2>
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase tracking-wide">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={deliveryForm.fullName}
                      onChange={handleDeliveryChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={deliveryForm.phone}
                      onChange={handleDeliveryChange}
                      placeholder="e.g. +234 801 234 5678"
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white"
                    />
                  </div>

                  {/* Country Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Country</label>
                    <select
                      name="country"
                      value={deliveryForm.country}
                      onChange={handleDeliveryChange}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white"
                    >
                      <option value="" className="text-zinc-500">Select Country</option>
                      {countriesList.map((country) => (
                        <option key={country.isoCode} value={country.isoCode} className="bg-neutral-900 text-white">
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Cascading State Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">State / Region</label>
                    <select
                      name="state"
                      value={deliveryForm.state}
                      onChange={handleDeliveryChange}
                      disabled={!deliveryForm.country}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white disabled:opacity-40"
                    >
                      <option value="" className="text-zinc-500">Select State</option>
                      {statesList.map((state) => (
                        <option key={state.isoCode} value={state.isoCode} className="bg-neutral-900 text-white">
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic Cascading City Selector */}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">City / District Area</label>
                    <select
                      name="city"
                      value={deliveryForm.city}
                      onChange={handleDeliveryChange}
                      disabled={!deliveryForm.state || citiesList.length === 0}
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white disabled:opacity-40"
                    >
                      <option value="" className="text-zinc-500">
                        {citiesList.length === 0 && deliveryForm.state ? "No specific cities found" : "Select City / Area"}
                      </option>
                      {citiesList.map((city) => (
                        <option key={city.name} value={city.name} className="bg-neutral-900 text-white">
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/30 tracking-widest">Specific House / Apartment Address</label>
                    <textarea
                      name="address"
                      value={deliveryForm.address}
                      onChange={handleDeliveryChange}
                      placeholder="Street, Suite, Building Number, etc."
                      className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 text-white"
                      rows="3"
                    />
                  </div>
                </div>

                {/* Payment Selector Cards */}
                <h2 className="text-xl font-black uppercase mt-12 mb-6 tracking-tight">Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <button
                    key="card"
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`group relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-gradient-to-b from-blue-950/40 to-black/60 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                        : "border-white/5 bg-black/40 hover:border-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-xl mb-4 transition-colors ${paymentMethod === "card" ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 group-hover:text-white"}`}>
                      <CreditCard size={20} />
                    </div>
                    <span className="font-black uppercase text-[11px] tracking-wider mb-1">Card Payment</span>
                    <span className="text-[9px] text-white/40 font-medium normal-case leading-relaxed">Supports local and international multi-currency credit/debit cards.</span>
                    {paymentMethod === "card" && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                  </button>

                  <button
                    key="transfer"
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`group relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 ${
                      paymentMethod === "transfer"
                        ? "border-blue-500 bg-gradient-to-b from-blue-950/40 to-black/60 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                        : "border-white/5 bg-black/40 hover:border-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-xl mb-4 transition-colors ${paymentMethod === "transfer" ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 group-hover:text-white"}`}>
                      <Landmark size={20} />
                    </div>
                    <span className="font-black uppercase text-[11px] tracking-wider mb-1">Bank Transfer</span>
                    <span className="text-[9px] text-white/40 font-medium normal-case leading-relaxed">Generates real-time virtual accounting tokens for direct processing.</span>
                    {paymentMethod === "transfer" && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                  </button>

                  <button
                    key="delivery"
                    type="button"
                    onClick={() => setPaymentMethod("delivery")}
                    className={`group relative flex flex-col items-start p-5 rounded-2xl border text-left transition-all duration-300 ${
                      paymentMethod === "delivery"
                        ? "border-blue-500 bg-gradient-to-b from-blue-950/40 to-black/60 shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                        : "border-white/5 bg-black/40 hover:border-white/20"
                    }`}
                  >
                    <div className={`p-3 rounded-xl mb-4 transition-colors ${paymentMethod === "delivery" ? "bg-blue-600 text-white" : "bg-white/5 text-white/60 group-hover:text-white"}`}>
                      <Truck size={20} />
                    </div>
                    <span className="font-black uppercase text-[11px] tracking-wider mb-1">Pay on Delivery</span>
                    <span className="text-[9px] text-white/40 font-medium normal-case leading-relaxed">Settle invoice using secure mobile point-of-sale terminals at delivery site.</span>
                    {paymentMethod === "delivery" && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
                  </button>

                </div>
              </section>

              {/* Staged Items preview section */}
              <section className="space-y-4">
                <h2 className="text-xl font-black uppercase tracking-tight">Review Staged Items ({cart.length})</h2>
                {cart.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-2xl p-4 flex gap-4 md:gap-6 border border-white/10">
                    <img src={item.image} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl" alt={item.name} />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-bold uppercase text-[12px] md:text-sm tracking-tight">{item.name}</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase mt-1">
                          {item.color} • Size {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-3 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
                          <button type="button" className="hover:text-blue-500" onClick={() => updateQty(item.id, -1)}><Minus size={12} /></button>
                          <span className="text-xs font-black w-4 text-center">{item.qty || 1}</span>
                          <button type="button" className="hover:text-blue-500" onClick={() => updateQty(item.id, 1)}><Plus size={12} /></button>
                        </div>
                        <p className="font-black italic text-md md:text-lg text-blue-500">
                          {formatPrice(Number(item.price) * currentCurrency.rate * (item.qty || 1))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            {/* Right Side Column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white text-black rounded-3xl p-6 md:p-8 shadow-2xl border border-black/5">
                
                {/* Expanded Local Currency Selection Field */}
                <div className="mb-6 pb-4 border-b border-black/10">
                  <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase text-black/50 tracking-widest">
                    <Globe size={14} className="text-blue-600" />
                    <span>Select Local Currency</span>
                  </div>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-zinc-100 border border-zinc-200 text-black rounded-xl p-3.5 text-xs font-black uppercase tracking-wider outline-none focus:border-blue-600 appearance-none cursor-pointer transition-colors"
                    style={{ 
                      backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`, 
                      backgroundRepeat: 'no-repeat', 
                      backgroundPosition: 'right 16px center', 
                      backgroundSize: '14px' 
                    }}
                  >
                    {Object.keys(CURRENCY_CONFIG).map((curKey) => (
                      <option key={curKey} value={curKey} className="text-black font-bold">
                        {CURRENCY_CONFIG[curKey].label}
                      </option>
                    ))}
                  </select>
                </div>

                <h3 className="font-black uppercase mb-6 tracking-widest text-xs opacity-80">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                    <span>Subtotal</span>
                    <span>{formatPrice(calculatedSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                    <span>Shipping Handling</span>
                    <span>{formatPrice(calculatedShipping)}</span>
                  </div>
                  <div className="pt-6 border-t border-black/5 flex justify-between items-end">
                    <span className="text-[10px] font-black text-blue-600 uppercase">Total Invoice</span>
                    <span className="text-2xl md:text-3xl font-black italic tracking-tight">{formatPrice(calculatedTotal)}</span>
                  </div>
                </div>

                {/* Interactive Action Button */}
                <button
                  type="button"
                  onClick={finalizeOrder}
                  disabled={issubmitting}
                  className={`w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border cursor-pointer ${
                    issubmitting 
                      ? "bg-zinc-950 border-zinc-900 text-zinc-500 cursor-wait"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-transparent text-white shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_35px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {issubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin text-blue-500" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <span>Authorize Order ({currency})</span>
                      <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                <div className="mt-6 flex items-center justify-center gap-2 opacity-30">
                  <Lock size={12} />
                  <span className="text-[8px] font-black uppercase tracking-widest">128-bit Encryption Secures Transaction</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}