import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import "../App.css";

const Moments = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Spring-based smooth progress for better parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Main container parallax effects
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  
  // Background elements with different parallax speeds (farther = slower)
  const bgCloud1Y = useTransform(smoothProgress, [0, 1], [0, 100]);  // Slow
  const bgCloud2Y = useTransform(smoothProgress, [0, 1], [0, 150]);  // Medium
  const bgCrystalY = useTransform(smoothProgress, [0, 1], [0, -200]); // Fast (opposite direction)

  const cards = [
    {
      id: 1,
      image: "/images/4.jpg",
      title: "Adventure Begins",
      desc: "Every journey starts with a single step — embrace the unknown and let your spirit wander.",
      parallaxSpeed: -50, // Moves up slowly
    },
    {
      id: 2,
      image: "/images/2.jpg",
      title: "Winds of Freedom",
      desc: "Let the breeze carry your dreams across endless skies.",
      parallaxSpeed: -80, // Moves up medium speed
    },
    {
      id: 3,
      image: "/images/3.jpg",
      title: "Celestial Harmony",
      desc: "Find balance between serenity and power — a true hero knows both.",
      parallaxSpeed: -120, // Moves up fast
    },
  ];

  return (
    <motion.section 
      className="moments" 
      ref={containerRef}
    >
      {/* Parallax Background Elements */}
      <div className="genshin-bg-elements">
        <motion.div 
          className="bg-cloud bg-cloud-1"
          style={{ 
            y: bgCloud1Y,
            opacity: useTransform(smoothProgress, [0, 0.5], [0.3, 0.8])
          }}
        />
        <motion.div 
          className="bg-cloud bg-cloud-2"
          style={{ 
            y: bgCloud2Y,
            opacity: useTransform(smoothProgress, [0, 0.7], [0.2, 0.6])
          }}
        />
        <motion.div 
          className="bg-crystal"
          style={{ 
            y: bgCrystalY,
            rotate: useTransform(smoothProgress, [0, 1], [0, 180]),
            scale: useTransform(smoothProgress, [0, 1], [1, 1.3])
          }}
        />
      </div>

      {/* Intro Section with Parallax */}
      <motion.div 
        className="moments-intro-section"
        style={{
          y: useTransform(smoothProgress, [0, 1], [0, -200]),
          opacity: useTransform(smoothProgress, [0, 0.3], [1, 0])
        }}
      >
        <motion.div 
          className="moments-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>#HappyMoments</h1>
          <p>Scroll down to relive the memories</p>
          <div className="scroll-indicator">
            <motion.div 
              className="scroll-arrow"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div> 
      </motion.div>     
      
      {/* Parallax Cards Container */}
      <div className="moments-scroll-container">
        {cards.map((card, index) => {
          const sectionStart = index * 0.33;
          const sectionEnd = (index + 1) * 0.33;
          
          // Card parallax effect - moves at different speeds
          const cardY = useTransform(
            smoothProgress,
            [sectionStart, sectionEnd],
            [0, card.parallaxSpeed]
          );

          // Image parallax - moves slower than card (depth effect)
          const imageY = useTransform(
            smoothProgress,
            [sectionStart, sectionEnd],
            [0, card.parallaxSpeed * 0.7]
          );

          // Scale effect for zoom parallax
          const cardScale = useTransform(
            smoothProgress,
            [sectionStart, sectionEnd],
            [1, 1.1]
          );

          // Opacity for fade in/out between sections
          const cardOpacity = useTransform(
            smoothProgress,
            [
              sectionStart - 0.1,
              sectionStart + 0.1,
              sectionEnd - 0.1,
              sectionEnd
            ],
            [0, 1, 1, 0]
          );

          return (
            <section key={card.id} className="card-section">
              <motion.div
                className="moment-card"
                initial={{ opacity: 0, scale: 0.9, y: 80 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.3,
                  type: "spring",
                  stiffness: 60
                }}
                style={{
                  y: cardY,
                  scale: cardScale,
                  opacity: cardOpacity
                }}
              >
                <motion.div 
                  className="card-glow"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0.3, 0.8]
                    )
                  }}
                />
                
                <div className="card-image-container">
                  <motion.img 
                    src={card.image} 
                    alt={card.title}
                    style={{ 
                      y: imageY,
                      scale: useTransform(
                        smoothProgress,
                        [sectionStart, sectionEnd],
                        [1.2, 1]
                      )
                    }}
                    loading="lazy"
                  />
                  <motion.div 
                    className="image-overlay"
                    style={{
                      opacity: useTransform(
                        smoothProgress,
                        [sectionStart, sectionEnd],
                        [0.4, 0.1]
                      )
                    }}
                  />
                </div>
                
                <motion.div 
                  className="moment-text"
                  style={{
                    y: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0, -20]
                    )
                  }}
                >
                  <motion.h2
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    {card.title}
                  </motion.h2>
                  <div className="text-divider"></div>
                  <motion.p
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    {card.desc}
                  </motion.p>
                </motion.div>
                
                {/* Corner decorations with parallax */}
                <motion.div 
                  className="card-corner card-corner-tl"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0.5, 1]
                    )
                  }}
                />
                <motion.div 
                  className="card-corner card-corner-tr"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0.5, 1]
                    )
                  }}
                />
                <motion.div 
                  className="card-corner card-corner-bl"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0.5, 1]
                    )
                  }}
                />
                <motion.div 
                  className="card-corner card-corner-br"
                  style={{
                    opacity: useTransform(
                      smoothProgress,
                      [sectionStart, sectionEnd],
                      [0.5, 1]
                    )
                  }}
                />
              </motion.div>

              {/* Section Indicator with parallax */}
              <motion.div 
                className="section-indicator"
                style={{
                  y: useTransform(
                    smoothProgress,
                    [sectionStart, sectionEnd],
                    [0, -30]
                  ),
                  opacity: useTransform(
                    smoothProgress,
                    [sectionStart - 0.1, sectionStart, sectionEnd - 0.1, sectionEnd],
                    [0, 1, 1, 0]
                  )
                }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* Floating Particles with parallax */}
      <div className="floating-particles">
        {[...Array(12)].map((_, i) => {
          const particleSpeed = (i % 3) + 1; // Different speeds for depth
          const particleX = useTransform(
            smoothProgress, 
            [0, 1], 
            [0, (i % 2 === 0 ? 1 : -1) * 100 * particleSpeed]
          );
          const particleY = useTransform(
            smoothProgress, 
            [0, 1], 
            [0, -i * 50 * particleSpeed]
          );
          const particleOpacity = useTransform(
            smoothProgress, 
            [0, 0.5, 1], 
            [0.1, 0.4, 0.1]
          );

          return (
            <motion.div
              key={i}
              className="particle"
              style={{
                x: particleX,
                y: particleY,
                opacity: particleOpacity,
                scale: useTransform(smoothProgress, [0, 1], [1, 0.8 + i * 0.05])
              }}
            />
          );
        })}
      </div>

      {/* Additional parallax layers */}
      <motion.div 
        className="parallax-overlay"
        style={{
          opacity: useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.3])
        }}
      />
    </motion.section>
  );
};

export default Moments;