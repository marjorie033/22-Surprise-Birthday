import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const Hero = () => {
  const slides = [
    { id: 1, image: "/images/1.jpg", caption: "#HappyBirthdayMyLove" },
    { id: 2, image: "/images/10.jpg", caption: "#Memories" },
    { id: 3, image: "/images/3.jpg", caption: "#HappyBirthdayMyLove" },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);


  const scrollToMoments = () => {
    const momentsSection = document.getElementById("moments");
    if (momentsSection) {
      momentsSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToMoments();
    }, 3000); // Scroll after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    
    <section className="hero-container">
      <img src="/images/bg.gif" alt="overlay" className="hero-overlay" />
      <div className="slider-box">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[current].id}
            src={slides[current].image}
            alt={`Slide ${slides[current].id}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="slide-image"
          />
        </AnimatePresence>
        
        {/* Caption Text */}
        <motion.p
          key={`caption-${slides[current].id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="slide-caption"
        >
          {slides[current].caption}
        </motion.p>

        {/* Scroll Down Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onClick={scrollToMoments}
        >
        </motion.div>
      </div>

      {/* Dots */}
      <div className="dots">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`dot ${current === index ? "active" : ""}`}
          ></div>
        ))}
      </div>

      <div className="hero-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="var(--text-color)"
            fillOpacity="1"
            d="M0,256L48,240C96,224,192,192,288,170.7C384,149,480,139,576,160C672,181,768,235,864,229.3C960,224,1056,160,1152,122.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;


