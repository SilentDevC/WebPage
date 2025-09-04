import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, Heart, Settings, LogOut, ChevronRight, ShieldCheck, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const MyDetails = ({ user, toast }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.username,
    email: `${user.username}@example.com`,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Details Saved",
      description: "Your personal information has been updated.",
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-light text-foreground">My Details</h3>
        <Button variant={isEditing ? 'default' : 'outline'} onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <label className="text-sm text-muted-foreground">Name</label>
          {isEditing ? (
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background" />
          ) : (
            <p className="text-lg text-foreground capitalize">{formData.name}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Email</label>
           {isEditing ? (
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background" />
          ) : (
            <p className="text-lg text-foreground">{formData.email}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <Button variant="link" className="p-0 h-auto text-primary" onClick={() => toast({title: "🚧 Feature in progress!"})}>Change Password</Button>
        </div>
      </div>
    </div>
  );
};


const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const { isAuthenticated, user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState('https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop');

  const handleLogout = () => {
    logout(navigate);
  };
  
  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
      toast({
        title: "Profile Picture Updated!",
        description: "Your new picture looks great!",
      });
    }
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
        return <MyDetails user={user} toast={toast} />;
      case 'orders':
        return <div className="p-8 text-muted-foreground">A list of your past orders, including tracking information and receipts, will be displayed here.</div>;
      case 'wishlist':
        return <div className="p-8 text-muted-foreground">All the cool merch you've saved for later will be shown here.</div>;
      case 'settings':
        return <div className="p-8 text-muted-foreground">Account settings, notification preferences, and password change options will be available here.</div>;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12">
          <h1 className="text-4xl font-light text-foreground">My Account</h1>
          <p className="text-lg text-muted-foreground mt-2">Manage your account details, orders, and more.</p>
        </div>
        
        {!isAuthenticated ? (
          <div className="bg-card rounded-2xl shadow-lg p-8 text-center border border-border">
              <h2 className="text-2xl font-light text-foreground mb-4">You're not logged in</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">Please log in to view your profile, manage your orders, and access your personal information.</p>
              <Button asChild>
                  <Link to="/login">Go to Login</Link>
              </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 group">
                    <img  src={profilePic} alt="User" className="rounded-full w-full h-full object-cover" />
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6" />
                    </button>
                  </div>
                  <h2 className="text-xl font-medium text-foreground capitalize">{user.username}</h2>
                  <p className="text-muted-foreground">{isAdmin ? 'Administrator' : 'Customer'}</p>
                </div>
                <nav className="space-y-2">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-secondary text-secondary-foreground'
                          : 'text-foreground/70 hover:bg-secondary/70 hover:text-secondary-foreground'
                      }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      <span>{tab.label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </button>
                  ))}
                  {isAdmin && (
                     <Link to="/admin" className="w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-lg transition-colors text-primary hover:bg-secondary/70">
                        <ShieldCheck className="h-5 w-5 mr-3" />
                        <span>Admin Panel</span>
                        <ChevronRight className="h-4 w-4 ml-auto" />
                     </Link>
                  )}
                </nav>
                <div className="border-t border-border mt-6 pt-6">
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
              <div className="bg-card rounded-2xl shadow-lg min-h-[400px] border border-border">
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
