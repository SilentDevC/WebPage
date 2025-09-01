import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Contact from '@/pages/Contact';
import ProductDetail from '@/pages/ProductDetail';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import AdminPanel from '@/pages/AdminPanel';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white">
            <Helmet>
              <title>Minimal Merch - Premium Apparel & Accessories</title>
              <meta name="description" content="Discover premium merch with minimalist design and exceptional quality. Shop our curated collection of modern essentials." />
              <meta property="og:title" content="Minimal Merch - Premium Apparel & Accessories" />
              <meta property="og:description" content="Discover premium merch with minimalist design and exceptional quality. Shop our curated collection of modern essentials." />
            </Helmet>
            
            <Header />
            
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;