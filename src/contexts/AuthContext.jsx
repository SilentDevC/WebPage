import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const { toast } = useToast();

  const login = (username, password, navigate) => {
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUser({ username: 'admin' });
      toast({
        title: 'Login Successful',
        description: 'Welcome, Admin!',
      });
      navigate('/admin');
      return true;
    }
    
    if (username && password) {
        setIsAuthenticated(true);
        setIsAdmin(false);
        setUser({ username });
        toast({
            title: 'Login Successful',
            description: `Welcome, ${username}!`,
        });
        navigate('/profile');
        return true;
    }

    toast({
      title: 'Login Failed',
      description: 'Invalid credentials. Please try again.',
      variant: 'destructive',
    });
    return false;
  };

  const logout = (navigate) => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const value = {
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};