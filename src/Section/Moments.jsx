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
    image: "/images/9.png", 
    title: "First Hangout Together",
    desc: "We attended Saikoufest — I never expected you would invite or accompany me to this event. I was so nervous and scared, yet excited to spend time and get to know you more.",
    parallaxSpeed: -50,
  },
  {
    id: 2,
    image: "/images/22.jpg", 
    title: "Maimai",
    desc: "Somehow, Maimai became a bridge for us to get closer. I was a bit competitive back then, but I’m proud and amazed at how much you’ve improved every time we play.",
    parallaxSpeed: -80,
  },
  {
    id: 3,
    image: "/images/7.jpg",
    title: "Arcchon", 
    desc: "Maybe the most expensive event we attended — and though it was a bit disappointing, it didn’t matter. Seeing you in a maid outfit was worth it; you looked so cute!",
    parallaxSpeed: -120,
  },
  {
    id: 4,
    image: "/images/15.JPG",
    title: "My Cutie Baby in a Maid Outfit",
    desc: "I never expected you’d actually wear a maid outfit or even take an interest in it. You looked so adorable and cute that time!",
    parallaxSpeed: -150,
  },
  {
    id: 5,
    image: "/images/12.jpg",
    title: "3rd Acquaintance Party",
    desc: "I didn’t include our first acquaintance party, but I still remember this one clearly. You hadn’t slept because you were preparing the video for the event — it turned out so well! Your effort truly paid off, even if you felt it wasn’t enough.",
    parallaxSpeed: -180,
  },
  {
    id: 6,
    image: "/images/25.jpg",
    title: "First Date at Naga",
    desc: "Our first date together in Naga — we ate ramen and walked around. I never expected it to feel so good to go out with you. Thank you for inviting me.",
    parallaxSpeed: -220,
  },
  {
    id: 7,
    image: "/images/26.jpg",
    title: "Clayne with Glasses",
    desc: "You looked so handsome and cute wearing glasses. I hope you wear them more often hehe.",
    parallaxSpeed: -250,
  },
  {
    id: 8,
    image: "/images/14.jpeg",
    title: "Last Acquaintance Party",
    desc: "Our last acquaintance party together — it was a bit disappointing, but at least you won 5 kg of rice! XD",
    parallaxSpeed: -280,
  },
  {
    id: 9,
    image: "/images/17.JPG",
    title: "You're So Cute",
    desc: "I wish I could relive this moment again. You looked so cute here.",
    parallaxSpeed: -320,
  },
  {
    id: 10,
    image: "/images/9-1.jpg",
    title: "Bon Odori?",
    desc: "It might not have been the actual Bon Odori festival, but at least we had fun — and I got to eat chocolate-coated bananas with you (though I only took a bite from yours).",
    parallaxSpeed: -350,
  },
  {
    id: 11,
    image: "/images/18.JPG",
    title: "Second Date at Naga",
    desc: "You looked so exhausted that day since you didn’t get enough sleep. It was raining, but we still pushed through — thank you for spending time with me.",
    parallaxSpeed: -380,
  },
  {
    id: 12,
    image: "/images/19.JPG",
    title: "Clayne’s Cousin’s Wedding",
    desc: "It was your cousin’s wedding, and once again, you hadn’t slept much. Still, you looked as handsome as ever. I wonder if our wedding someday will feel like this.",
    parallaxSpeed: -400,
  },
  {
    id: 13,
    image: "/images/20.JPG",
    title: "Finally, Bon Odori Festival",
    desc: "We finally attended the Bon Odori Festival together — thank you for letting me take this picture of you.",
    parallaxSpeed: -450,
  },
];


  const sectionRange = 1 / cards.length;


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
          <h1>#Journey</h1>
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

          const sectionStart = index * sectionRange;
          const sectionEnd = (index + 1) * sectionRange;
          const sectionStartWithOverlap = Math.max(0, sectionStart - 0.05);
          const sectionEndWithOverlap = Math.min(1, sectionEnd + 0.05);
          
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
              sectionStartWithOverlap,
              sectionStart,
              sectionEnd,
              sectionEndWithOverlap
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