import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const GoogleIcon = () => (
  <svg className="h-5 w-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.519-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
  </svg>
);

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email, formData.password, navigate);
  };

  const handleGoogleSignIn = () => {
    toast({
      title: '🚧 Google Sign-In',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10">
        <img  className="w-full h-full object-cover" alt="Lush wall of green leaves background" src="https://images.unsplash.com/photo-1494855591225-56ef6170ec5f" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={cn("w-full max-w-md rounded-2xl shadow-2xl p-8", "glass-effect")}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-primary mb-2">Welcome Back</h1>
          <p className="font-medium text-foreground/80">Sign in to continue to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
              Username or Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-input rounded-lg bg-background/50 text-foreground font-semibold focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-muted-foreground"
              placeholder="admin or your@email.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <a href="#" className="text-sm text-foreground/80 hover:text-foreground">Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-input rounded-lg bg-background/50 text-foreground font-semibold focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
            Sign In
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-transparent px-2 text-muted-foreground backdrop-blur-sm">OR</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full py-3 bg-card/90 text-foreground hover:bg-card"
        >
          <GoogleIcon />
          Sign in with Google
        </Button>
        
        <div className="text-center mt-8">
          <p className="text-sm text-foreground/80">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-primary hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;