import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", onClick }) => (
  <motion.div
    whileHover={onClick ? { y: -3, boxShadow: "0 6px 24px rgba(18,140,126,0.15)" } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick}
    className={`wa-panel p-5 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

export default GlassCard;
