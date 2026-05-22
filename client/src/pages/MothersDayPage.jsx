import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Gift } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const HeartsBackground = () => {
  // generate multiple floating hearts
  const [hearts, setHearts] = useState([]);
  
  useEffect(() => {
    // Generate static initial values to avoid hydration mismatches, though we are client side only here
    const newHearts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 24 + 12,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-pink-400/40"
          initial={{ y: '100vh', x: `${heart.left}vw`, opacity: 0 }}
          animate={{
            y: '-20vh',
            opacity: [0, 1, 0],
            rotate: [0, 90, -90, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ left: `${heart.left}%` }}
        >
          <Heart size={heart.size} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

const PixelArtHeart = () => {
  const grid = [
    "  XXXX   XXXX  ",
    " XXXXXX XXXXXX ",
    "XXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXX",
    " XXXXXXXXXXXXX ",
    "  XXXXXXXXXXX  ",
    "   XXXXXXXXX   ",
    "    XXXXXXX    ",
    "     XXXXX     ",
    "      XXX      ",
    "       X       "
  ];
  
  const pixels = [];
  const pixelSize = 14; // Larger pixels for premium look
  const gap = 2;       
  const cx = 7.5;      // Center X
  const cy = 5.5;      // Center Y
  
  grid.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === 'X') {
        const targetX = x * (pixelSize + gap) - (row.length * (pixelSize + gap)) / 2;
        const targetY = y * (pixelSize + gap) - (grid.length * (pixelSize + gap)) / 2;
        
        // 3D Bulge effect: Center pixels pop out more than edge pixels
        const dist = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
        const targetZ = Math.max(0, 70 - dist * 10); 
        
        pixels.push({
          id: `${x}-${y}`,
          targetX,
          targetY,
          targetZ,
          // Start deep in Z-space (near the camera) and scattered
          startX: (Math.random() - 0.5) * 2000, 
          startY: (Math.random() - 0.5) * 2000,
          startZ: Math.random() * 1500 + 500,
          delay: Math.random() * 2.5, 
        });
      }
    }
  });

  return (
    <motion.div 
      className="relative w-full h-[240px] flex items-center justify-center my-6 z-20"
      style={{ perspective: 1200 }}
      animate={{
        rotateX: [0, 12, -8, 0],
        rotateY: [0, -15, 15, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.div className="relative" style={{ transformStyle: "preserve-3d" }}>
        {pixels.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-[3px] bg-gradient-to-br from-white via-rose-400 to-rose-700"
            style={{ 
              width: pixelSize, 
              height: pixelSize,
              // Intense 8K 3D Bevel and Glow
              boxShadow: `
                inset 2px 2px 4px rgba(255,255,255,0.9), 
                inset -2px -2px 5px rgba(0,0,0,0.4), 
                0 0 15px rgba(255,20,147,0.8)
              `,
              transformOrigin: "center center"
            }}
            initial={{ 
              x: p.startX, 
              y: p.startY, 
              z: p.startZ, 
              opacity: 0, 
              scale: 0, 
              rotateX: Math.random() * 720,
              rotateY: Math.random() * 720
            }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              z: p.targetZ,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              rotateY: 0
            }}
            transition={{
              duration: 2.5,
              delay: p.delay,
              type: "spring",
              stiffness: 45,
              damping: 12
            }}
          />
        ))}
      </motion.div>
      
      {/* 8K Premium Background Glow */}
      <motion.div
        className="absolute rounded-full mix-blend-screen filter blur-[80px] z-0 pointer-events-none"
        style={{ 
          width: 280, 
          height: 280, 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,105,180,1) 0%, rgba(255,20,147,0.4) 50%, rgba(0,0,0,0) 100%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
        transition={{ delay: 2.5, duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

const MothersDayPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      
      // Multi-stage confetti blast
      const duration = 3500;
      const end = Date.now() + duration;

      const frame = () => {
        // Left edge
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 70,
          origin: { x: 0, y: 0.8 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffd700']
        });
        // Right edge
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 70,
          origin: { x: 1, y: 0.8 },
          colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffd700']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      
      // Center Pop
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#ffc0cb', '#ffffff', '#ffd700']
      });

      frame();
    }
  };

  return (
    <PageTransition>
      <div className="min-h-[100dvh] relative flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-100 to-fuchsia-50 overflow-hidden z-10 pt-16">
        <HeartsBackground />
        
        {/* Glow blobs for background (Premium Glassmorphism Aesthetic) */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-pink-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 animate-blob animation-delay-4000"></div>

        <motion.div 
          className="relative z-10 max-w-md w-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          {/* Main Glass Card */}
          <div className="bg-white/50 backdrop-blur-2xl border border-white/60 p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(255,105,180,0.15)] text-center relative overflow-hidden">
            
            {/* Inner shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/40 pointer-events-none rounded-[2.5rem]" />

            <AnimatePresence mode="wait">
              {!isOpen ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-8 relative z-10 py-6"
                >
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="p-8 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full shadow-[inset_0_-4px_12px_rgba(255,105,180,0.2)]"
                  >
                    <Gift size={80} className="text-pink-500 drop-shadow-md" />
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500 font-serif tracking-wide">
                      A Special Gift
                    </h2>
                    <p className="text-pink-600/90 font-medium text-lg">Tap below to open your surprise!</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(255,105,180,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    className="mt-6 px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white rounded-full font-bold shadow-xl shadow-pink-500/30 flex items-center gap-3 transition-all bg-[length:200%_auto] hover:bg-[position:right_center]"
                  >
                    <Sparkles size={24} className="animate-pulse" />
                    <span className="text-lg tracking-wide uppercase">Open Gift</span>
                    <Sparkles size={24} className="animate-pulse" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="opened"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", duration: 1.2, bounce: 0.5 }}
                  className="flex flex-col items-center gap-6 relative z-10 py-4"
                >
                  <PixelArtHeart />
                  
                  <div className="space-y-5">
                    <motion.h1 
                      className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 font-serif drop-shadow-sm leading-tight pb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 3.0, type: "spring" }} // delayed to wait for pixels
                    >
                      Happy <br/>Mother's Day!
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xl text-pink-800 leading-relaxed italic font-serif"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 3.3 }}
                    >
                      "To the world you are a mother, but to your family you are the world."
                    </motion.p>

                    <motion.div 
                      className="w-20 h-1.5 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300 mx-auto rounded-full mt-4"
                      initial={{ width: 0 }}
                      animate={{ width: 80 }}
                      transition={{ delay: 3.6, duration: 0.8 }}
                    />
                    
                    <motion.p
                      className="text-pink-700/90 pt-4 text-lg font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3.9 }}
                    >
                      Thank you for your endless love, patience, and warmth. You are simply the best! ❤️
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default MothersDayPage;
