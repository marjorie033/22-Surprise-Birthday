import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionTransition = () => {
  const transitionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start end", "end start"]
  });

  // Multiple parallax effects for a layered transition
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const foregroundScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10]);
  
  // Color transition from Moments to Letter theme
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(30, 30, 40, 0)", "rgba(20, 15, 35, 1)"]
  );

  return (
    <motion.div 
      ref={transitionRef}
      className="section-transition"
      style={{
        opacity,
        background: backgroundColor,
      }}
    >
      {/* Background Layers */}
      <motion.div 
        className="transition-bg-layer"
        style={{ scale: backgroundScale }}
      />
      
      {/* Central Portal/Transition Element */}
      <motion.div 
        className="transition-portal"
        style={{ 
          scale: foregroundScale,
          filter: blur
        }}
      >
        <div className="portal-ring portal-ring-1"></div>
        <div className="portal-ring portal-ring-2"></div>
        <div className="portal-ring portal-ring-3"></div>
        
        {/* Floating particles moving towards portal */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="transition-particle"
            style={{
              x: useTransform(scrollYProgress, [0, 1], [Math.cos(i * 30) * 200, 0]),
              y: useTransform(scrollYProgress, [0, 1], [Math.sin(i * 30) * 200, 0]),
              opacity: useTransform(scrollYProgress, [0, 0.8], [0.6, 0]),
              rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
            }}
          />
        ))}
        
        {/* Central glow */}
        <div className="portal-core"></div>
      </motion.div>

      {/* Scroll indicator text */}
      <motion.div 
        className="transition-text"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [50, -50]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
        }}
      >
        <span>To My Letter</span>
        <div className="text-arrow">↓</div>
      </motion.div>
    </motion.div>
  );
};

export default SectionTransition;