import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      x: '-100px',
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      x: '0px',
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: {
      opacity: 0,
      x: '100px',
      filter: 'blur(10px)',
      transition: {
        duration: 0.7,
        ease: [0.5, 0, 0.75, 0],
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;