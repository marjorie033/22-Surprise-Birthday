import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const Letter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="letter-section">
      <div className="letter-bg-elements">
        <motion.div 
          className="bg-sparkle sparkle-1"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-sparkle sparkle-2"
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Envelope Container */}
      <motion.div 
        className="envelope-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Envelope */}
        <motion.div
          className={`envelope ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ 
            scale: 1.05,
            y: -5
          }}
          animate={{
            y: isOpen ? 0 : isHovered ? [0, -10, 0] : 0
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 10
          }}
        >
          <div className="envelope-flap"></div>
          <div className="envelope-body">
            <motion.div 
              className="envelope-shine"
              animate={{ 
                x: [-100, 200],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          </div>
          
          {/* Envelope Glow */}
          <motion.div 
            className="envelope-glow"
            animate={{
              opacity: isHovered ? 1 : 0.5,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Instruction Text */}
        <motion.p 
          className="envelope-instruction"
          animate={{ opacity: isHovered ? 0.7 : 0.4 }}
        >
          Click to open the message
        </motion.p>
      </motion.div>

      {/* Message Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="letter-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Message Content */}
            <motion.div
              className="message-popup-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="message-popup"
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 100 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
              >
                {/* Message Decoration */}
                <div className="message-decoration top-left"></div>
                <div className="message-decoration top-right"></div>
                <div className="message-decoration bottom-left"></div>
                <div className="message-decoration bottom-right"></div>
                
                {/* Message Header */}
                <motion.div 
                  className="message-header"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="message-icon"
                    animate={{ 
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.5
                    }}
                  >
                    💌
                  </motion.div>
                  <h2>A Special Message</h2>
                </motion.div>

                {/* Message Content */}
                <motion.div 
                  className="message-content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <p>
                    Thank you for everything you’ve done for me up until now. I’ll treasure every memory we’ve built together ---- you’ve already become such an important part of my life, and I’m truly thankful and glad that I met you.
                    So I want to say Happy Birthday, byy! Thank you for being born ---- you’ve made my life so colorful (char 😆). You grow cuter and cuter every time we meet. I hope I can hold your hands and feel you again soon. I miss youu, and I love youuu so much!
                    Once again, Happy Birthday! I hope you had a wonderful time today. I’m sorry I couldn’t be there to celebrate with you.💖
                  </p>
                  
                  <motion.div 
                    className="message-signature"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="signature-line"></div>
                    <p>With love,</p>
                    <p className="signature-name">Your Sensitive Baby</p>
                  </motion.div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="close-button"
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}

                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Letter;