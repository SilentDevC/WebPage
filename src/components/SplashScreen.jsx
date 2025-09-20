import React from 'react';
import { motion } from 'framer-motion';
import { Feather } from 'lucide-react';

const SplashScreen = ({ onAnimationComplete }) => {
  const containerVariants = {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
  };

  const fogVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 0,
      transition: { duration: 2, delay: 0.5, ease: 'easeOut' },
    },
  };
  
  const logoVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.5, delay: 1, type: 'spring', stiffness: 80 },
    },
  };
  
  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1, delay: 1.8 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      onAnimationComplete={onAnimationComplete}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1, transition: { duration: 3, ease: 'easeIn' } }}
        className="absolute inset-0 z-0"
      >
        <img class="w-full h-full object-cover" alt="Lone misty mountain in the center of the image" src="https://images.unsplash.com/photo-1550757627-155698319664" />
      </motion.div>

      <motion.div
        variants={fogVariants}
        className="absolute inset-0 z-10 bg-gradient-to-t from-background/50 via-background to-background"
        style={{ backdropFilter: 'blur(2px)' }}
      ></motion.div>

      <div className="relative z-20 text-center">
        <motion.div
          variants={logoVariants}
          className="text-white inline-block"
        >
          <Feather size={100} strokeWidth={1} />
        </motion.div>
        <motion.p
          variants={textVariants}
          className="text-center text-lg mt-2 font-light text-white/80"
        >
          Your Logo Here
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;