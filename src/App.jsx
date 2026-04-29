import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import Kids from "./pages/Kids";
import ContactPage from "./pages/ContactPage";
// import Order from "./pages/Order";
import TestimonialsSection from "./components/TestimonialsSection";

export default function App() {
  return (
     <div className="bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/women" element={<Women />} />
        <Route path="/men" element={<Men />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/order" element={<Order />} /> */}
      </Routes>
      <Footer /> </div>
    
  );
}
