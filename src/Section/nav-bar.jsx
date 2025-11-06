import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", href: "#home", icon: "⾕" },
    { name: "Moments", href: "#moments", icon: "🎞️" },
    { name: "Gallery", href: "#gallery", icon: "🖼️" },
    { name: "About", href: "#about", icon: "👤" },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <motion.nav 
        className={`navbar ${isScrolled ? "scrolled" : ""} ${isMenuOpen ? "menu-open" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <div className="nav-container">
          {/* Logo/Brand */}
          <motion.div 
            className="nav-brand"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* <span className="brand-text">Memories</span> */}
            <div className="brand-underline"></div>
          </motion.div>

          {/* Menu Icon - Right Side */}
          <motion.div 
            className="menu-icon-container"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />
            
            {/* Sidebar */}
            <motion.div 
              className="sidebar-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              {/* Sidebar Header
              <motion.div 
                className="sidebar-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3>Navigation Menu</h3>
                <motion.div 
                  className="close-sidebar"
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.div> */}
              {/* </motion.div> */}

              {/* Menu Items */}
              <div className="sidebar-content">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="menu-item"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      type: "spring",
                      stiffness: 300
                    }}
                    whileHover={{ 
                      x: -10,
                      backgroundColor: "var(--primary-color)",
                      color: "white"
                    }}
                    onClick={toggleMenu}
                  >
                    <span className="menu-item-icon">{item.icon}</span>
                    <span className="menu-item-text">{item.name}</span>
                    <motion.div 
                      className="menu-item-underline"
                      whileHover={{ scaleX: 1 }}
                      initial={{ scaleX: 0 }}
                    />
                  </motion.a>
                ))}
              </div>

              {/* Sidebar Footer */}
              <motion.div 
                className="sidebar-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p>Made with 💖</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="container-bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ 
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="bar-progress"
              animate={{ 
                x: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;