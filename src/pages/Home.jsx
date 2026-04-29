import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import VideoSection from "../components/VideoSection";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <CategoriesSection />
      <VideoSection />
      <TestimonialsSection />
      <NewsletterSection />
    </main>
  );
}