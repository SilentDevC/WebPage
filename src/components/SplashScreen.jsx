
import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

const SplashScreen = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 2.2, ease: 'easeInOut' }}
      onAnimationComplete={onAnimationComplete}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 120 }}
        className="text-primary"
      >
        <Feather size={100} strokeWidth={1} />
        <p className="text-center text-lg mt-2 font-light">Your Logo Here</p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
