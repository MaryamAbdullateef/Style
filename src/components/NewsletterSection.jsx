import React, { useEffect, useState } from "react";
import { Send, CheckCircle, BellRing } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success


    useEffect(()=> {

    AOS.init({
      duration:2000,
      once:true,
    })
    },[])
  const brandBlue = "#0070f3";

  const handleSubscribe = (e) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="bg-[#040404] py-24 px-6 relative overflow-hidden " data-aos="fade-up">
      {/* Decorative background glow */}
      <div 
        className="absolute bottom-[-20%] left-[-10%] w-100 h-100 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ backgroundColor: brandBlue }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10"
            style={{ color: brandBlue }}
          >
            <BellRing size={24} />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Join the <span style={{ color: brandBlue }}>Inner Circle</span>
        </h2>
        
        <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Be the first to access limited drops, private sales, and the latest in Nigerian high-fashion. No spam, just style.
        </p>

        {status === "success" ? (
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl animate-fade-in">
            <CheckCircle className="mx-auto mb-4" style={{ color: brandBlue }} size={40} />
            <h4 className="text-white text-xl font-bold">You're on the list!</h4>
            <p className="text-white/40 text-sm mt-2">Check your inbox for your 10% welcome discount.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubscribe} 
            className="relative max-w-lg mx-auto group"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 text-white px-6 py-4 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-white/20"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-white text-black font-bold px-8 py-4 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                style={status === "loading" ? { opacity: 0.7 } : {}}
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    Subscribe
                    <Send size={16} />
                  </>
                )}
              </button>
            </div>
            
            {/* Minimalist Trust Badge */}
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-white/20 font-medium">
              Join 12,000+ Style Enthusiasts
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;