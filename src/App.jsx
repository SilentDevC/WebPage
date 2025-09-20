import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import SplashScreen from '@/components/SplashScreen';
import PageTransition from '@/components/PageTransition';
import { AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('@/pages/Home'));
const Products = lazy(() => import('@/pages/Products'));
const Contact = lazy(() => import('@/pages/Contact'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));

const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        handleAnimationComplete();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAnimationComplete = () => {
    setLoading(false);
    sessionStorage.setItem('hasVisited', 'true');
  };

  return (
    <AuthProvider>
      <CartProvider>
        <AnimatePresence mode="wait">
          {loading && <SplashScreen key="splash" onAnimationComplete={handleAnimationComplete} />}
        </AnimatePresence>
        <div className="min-h-screen bg-background text-foreground">
          <Helmet>
            <title>Minimal Merch - Premium Apparel & Accessories</title>
            <meta name="description" content="Discover premium merch with minimalist design and exceptional quality. Shop our curated collection of modern essentials." />
            <meta property="og:title" content="Minimal Merch - Premium Apparel & Accessories" />
            <meta property="og:description" content="Discover premium merch with minimalist design and exceptional quality. Shop our curated collection of modern essentials." />
          </Helmet>
          
          <Header />
          
          <main className="pt-16">
            <Suspense fallback={<LoadingFallback />}>
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                  <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                  <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
                  <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                  <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                  <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                  <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;