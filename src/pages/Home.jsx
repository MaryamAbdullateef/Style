import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import VideoSection from "../components/VideoSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";

/**
 * Home Page
 * Component-based architecture for better maintainability.
 * Ensure each imported component uses the same Tailwind 'dark' aesthetic.
 */
export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden scroll-smooth selection:bg-brand-blue selection:text-white">
      {/* The IDs (e.g., id="about") should be defined inside 
          the individual component sections for the anchor links to work.
      */}
      
      <HeroSection />
      
      <section id="about">
        <AboutSection />
      </section>

      <section id="categories">
        <CategoriesSection />
      </section>

      <VideoSection />

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="newsletter">
        <NewsletterSection />
      </section>

      {/* Optional: Unified Footer for the Home Page */}
      <footer className="py-12 text-center text-gray-600 border-t border-white/5 bg-[#080808]">
        <p className="text-[10px] tracking-[0.4em] uppercase">
          StyleHub Fashion House • Est. 2026
        </p>
      </footer>
    </main>
  );
}