import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search, User, ShieldCheck, Feather } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import CartDrawer from '@/components/CartDrawer';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { toast } = useToast();
  const { isAdmin } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleSearchClick = () => {
    toast({
      title: "🔍 Search Feature",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("fixed top-0 left-0 right-0 z-40 border-b", "glass-effect")}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                <Feather /> Minimal
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      location.pathname === item.href
                        ? 'text-primary border-b-2 border-primary pb-1'
                        : 'text-foreground/80 hover:text-primary'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {location.pathname === '/products' && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearchClick}
                  className="p-2 text-foreground/80 hover:text-primary transition-colors"
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {getCartItemsCount()}
                  </motion.span>
                )}
              </motion.button>
              
              {isAdmin && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                   <Link to="/admin" className="p-2 text-blue-600 hover:text-blue-700 transition-colors">
                      <ShieldCheck className="h-5 w-5" />
                   </Link>
                </motion.div>
              )}

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                 <Link to="/profile" className="p-2 text-foreground/80 hover:text-primary transition-colors">
                    <User className="h-5 w-5" />
                 </Link>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-foreground/80 hover:text-primary transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-effect border-t"
            >
              <div className="px-4 py-4 space-y-4">
                {navigation.map((item) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-base font-medium transition-colors duration-200 ${
                        location.pathname === item.href
                          ? 'text-primary'
                          : 'text-foreground/80 hover:text-primary'
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;