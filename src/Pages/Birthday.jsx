import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HappyBirthday = ({ onBack }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Disco lights effect
    const lights = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    // Create disco lights
    for (let i = 0; i < 50; i++) {
      lights.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        angle: Math.random() * Math.PI * 2
      });
    }

    const animateLights = () => {
      ctx.fillStyle = 'rgba(10, 0, 30, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lights.forEach(light => {
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fillStyle = light.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        
        // Move lights in circular patterns
        light.x += Math.cos(light.angle) * light.speed;
        light.y += Math.sin(light.angle) * light.speed;
        light.angle += 0.02;

        // Wrap around edges
        if (light.x < -50) light.x = canvas.width + 50;
        if (light.x > canvas.width + 50) light.x = -50;
        if (light.y < -50) light.y = canvas.height + 50;
        if (light.y > canvas.height + 50) light.y = -50;
      });

      requestAnimationFrame(animateLights);
    };

    animateLights();

    return () => {
      // Cleanup
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <>
      {/* Disco Background Canvas */}
      <canvas
        ref={canvasRef}
        className="disco-background"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 9998,
        }}
      />

      {/* Overlay */}
      <motion.div
        className="popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
        }}
        onClick={onBack}
      />
      
      {/* Popup Content */}
      <motion.div 
        className="birthday-popup"
        initial={{ scale: 0, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0, opacity: 0, rotateY: -180 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          duration: 0.8
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          color: 'white',
          zIndex: 10000,
          border: '2px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* 3D Disco Ball */}
        <motion.div
          className="disco-ball-container"
          initial={{ y: -100, rotate: 0 }}
          animate={{ 
            y: 0, 
            rotate: 360,
          }}
          transition={{ 
            delay: 0.3,
            duration: 2,
            type: "spring",
            stiffness: 100
          }}
          style={{
            position: 'relative',
            margin: '0 auto 30px',
            width: '100px',
            height: '100px',
          }}
        >
          <motion.div
            className="disco-ball"
            animate={{ 
              rotateY: 360,
              rotateX: 360,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle at 30% 30%, #ffffff, #cccccc, #666666)',
              borderRadius: '50%',
              margin: '0 auto',
              position: 'relative',
              boxShadow: '0 0 20px rgba(255,255,255,0.8)',
            }}
          >
            {/* Disco ball reflections */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.8)',
                  top: `${20 + i * 8}%`,
                  left: '20%',
                  transform: `rotate(${i * 45}deg)`,
                  borderRadius: '2px',
                }}
              />
            ))}
          </motion.div>
          
          {/* Disco ball hanger */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '20px',
              background: '#ccc',
              borderRadius: '2px',
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
            backgroundSize: '400% 400%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'gradientShift 3s ease infinite',
          }}
        >
          🎉 Happy Birthday! 🎉
        </motion.h1>
        
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{
            fontSize: '1.2rem',
            marginBottom: '30px',
            lineHeight: '1.6',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          Congratulations! You've proven you're human and unlocked this special birthday surprise!
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="confetti"
          style={{
            fontSize: '2rem',
            margin: '30px 0',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          {['🎊', '🎈', '🎁', '🎉', '✨', '🥳'].map((emoji, index) => (
            <motion.span
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.5, rotate: 360 }}
              style={{ display: 'inline-block' }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          onClick={onBack}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ 
            scale: 1.05,
            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
          }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            marginTop: '20px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          Continue Celebrating! 🎂
        </motion.button>
      </motion.div>

      {/* Add CSS for gradient animation */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </>
  );
};

export default HappyBirthday;