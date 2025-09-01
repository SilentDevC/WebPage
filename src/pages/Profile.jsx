import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut, ChevronRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  const handleAction = (feature) => {
    toast({
        title: `🚧 ${feature}`,
        description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const tabs = [
    { id: 'details', label: 'My Details', icon: User },
    { id: 'orders', label: 'Order History', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'details':
        return <div className="p-8">Your personal details will appear here. This includes options to update your name, email, and shipping addresses.</div>;
      case 'orders':
        return <div className="p-8">A list of your past orders, including tracking information and receipts, will be displayed here.</div>;
      case 'wishlist':
        return <div className="p-8">All the cool merch you've saved for later will be shown here.</div>;
      case 'settings':
        return <div className="p-8">Account settings, notification preferences, and password change options will be available here.</div>;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900">My Account</h1>
          <p className="text-lg text-gray-600 mt-2">Manage your account details, orders, and more.</p>
        </div>
        
        {!isAuthenticated ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-light text-gray-900 mb-4">You're not logged in</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">Please log in to view your profile, manage your orders, and access your personal information.</p>
              <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Link to="/login">Go to Login</Link>
              </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop" alt="User" className="rounded-full w-full h-full object-cover" src="https://images.unsplash.com/photo-1694157263770-1a844cb0f6e0" />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900 capitalize">{user.username}</h2>
                  <p className="text-gray-600">{isAdmin ? 'Administrator' : 'Customer'}</p>
                </div>
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      <span>{tab.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                  ))}
                  {isAdmin && (
                     <Link to="/admin" className="w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                        <ShieldCheck className="h-5 w-5 mr-3" />
                        <span>Admin Panel</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                     </Link>
                  )}
                </nav>
                <div className="border-t border-gray-200 mt-6 pt-6">
                   <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                </div>
              </div>
            </aside>

            <main className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </main>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;