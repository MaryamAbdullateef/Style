import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import Kids from "./pages/Kids";
import ContactPage from "./pages/ContactPage";
import Order from "./pages/Order";
import Collections from "./pages/Collections";

import TrackOrder from "./pages/TrackOrder";
import ReturnsPolicy from "./pages/ReturnsPolicy";

// Feature Pages
import Account from "./pages/Account";
import Search from "./pages/Search";
import AddToCart from "./pages/AddToCart";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  const isAccountPage = location.pathname === "/account";

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans selection:bg-[#0070f3] selection:text-white">
      <ScrollToTop />

      {!isAccountPage && <Navbar />}

      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/women" element={<Women />} />

          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/returns-policy" element={<ReturnsPolicy />} />

          <Route path="/collections" element={<Collections />} />
          <Route path="/new" element={<NewArrival />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search" element={<Search />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <AddToCart />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAccountPage && <Footer />}
    </div>
  );
}
