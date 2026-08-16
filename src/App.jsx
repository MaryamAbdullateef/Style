// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

// Import global state context provider wrappers
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

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
import ProductDetails from "./pages/ProductDetails";

// Data Integration Component
import ProductList from "./components/ProductList";

// Admin Interface Management Component
import AdminDashboard from "./pages/AdminDashboard";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Wrapper component to bundle Home and ProductList safely as a single component
function HomeWithProducts() {
  return (
    <>
      <Home />
      <ProductList />
    </>
  );
}

export default function App() {
  const location = useLocation();

  const isAccountPage = location.pathname === "/account";
  const isAdminPage = location.pathname === "/admin";

  return (
    <AuthProvider>
      <CartProvider>
        <div className="bg-black min-h-screen flex flex-col font-sans selection:bg-[#0070f3] selection:text-white">
          <ScrollToTop />

          {/* Hide regular navigation layout components if viewing account or admin portal views */}
          {!isAccountPage && !isAdminPage && <Navbar />}

          <main className="grow">
            <Routes>
              {/* Main Route displaying the home page layout alongside backend data */}
              <Route path="/" element={<HomeWithProducts />} />

              <Route path="/men" element={<Men />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/women" element={<Women />} />

              {/* Dynamic route matching navigate('/product/:id') from ProductList */}
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/product-details" element={<ProductDetails />} />
              <Route path="/products" element={<ProductList />} />

              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/returns-policy" element={<ReturnsPolicy />} />

              <Route path="/collections" element={<Collections />} />
              <Route path="/new" element={<NewArrival />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<Search />} />

              {/* Dashboard Portal Management View */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Secure Routing for checkout actions */}
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                }
              />

              {/* Unlocked Cart Route for unrestricted shopping bag view */}
              <Route path="/cart" element={<AddToCart />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {!isAccountPage && !isAdminPage && <Footer />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}