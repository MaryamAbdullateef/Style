import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Existing Pages
import Home from "./pages/Home";
import Women from "./pages/Women";
import Men from "./pages/Men";
import NewArrival from "./pages/NewArrival";
import Kids from "./pages/Kids";
import ContactPage from "./pages/ContactPage";
import Order from "./pages/Order";
import Collections from "./pages/Collections";

// Feature Pages
import Account from "./pages/account";
import Search from "./pages/search";
import AddToCart from "./pages/add-to-cart";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  // Premium UI: No Navbar/Footer on login page
  const isAccountPage = location.pathname === "/account";

  return (
    <div className="bg-black min-h-screen flex flex-col font-sans selection:bg-[#0070f3] selection:text-white">
      <ScrollToTop />

      {!isAccountPage && <Navbar />}

      <main className="grow">
        <Routes>
          {/* --- BASE ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />

          {/* --- THE WOMEN ROUTE --- */}
          {/* This is the standard route */}
          <Route path="/women" element={<Women />} />

          {/* --- SEARCH PROTECTION (ROUTING FIX) --- */}
          {/* If your search sends "Women" (Capital) or "woman" (Singular), 
              these lines catch it and force it to load the Women component */}
          <Route path="/women" element={<Women />} />
          {/* <Route path="/woman" element={<Women />} />
          <Route path="/Woman" element={<Women />} /> */}

          {/* --- OTHER ROUTES --- */}
          <Route path="/collections" element={<Collections />} />
          <Route path="/new" element={<NewArrival />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<Account />} />
          <Route path="/search" element={<Search />} />

          {/* --- PROTECTED ROUTES --- */}
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

          {/* --- CATCH-ALL REDIRECT --- */}
          {/* If a search generates a path that doesn't exist, it goes back home 
              instead of breaking the app */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAccountPage && <Footer />}
    </div>
  );
}
