import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className={`relative z-10 w-full min-h-screen ${className}`}
  >
    {children}
  </motion.div>
);

export default PageTransition;
