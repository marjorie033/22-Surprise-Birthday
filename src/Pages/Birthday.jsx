import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Model } from './Model'; // Adjust path to your model component
import { useThree } from "@react-three/fiber";

function ResizeFixer() {
  const { gl, camera, size, setSize } = useThree();

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [gl, camera]);

  return null;
}

const HappyBirthday = ({ onBack }) => {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [showCake, setShowCake] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.log('Audio play failed:', error);
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Disco lights effect
    const lights = [];
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
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

        if (light.x < -50) light.x = canvas.width + 50;
        if (light.x > canvas.width + 50) light.x = -50;
        if (light.y < -50) light.y = canvas.height + 50;
        if (light.y > canvas.height + 50) light.y = -50;
      });

      requestAnimationFrame(animateLights);
    };

    animateLights();

    // Show cake after a short delay
    const timer = setTimeout(() => {
      setShowCake(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Audio Element */}
      <audio
        ref={audioRef}
        loop
        src="/music/song.mp3" // Add your MP3 file to public folder
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Disco Background Canvas */}
      <canvas
        ref={canvasRef}
        className="disco-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />

      {/* Overlay */}
      <motion.div
        className="popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2,
        }}
        onClick={onBack}
      />

      {/* Main Content Container */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        
        {/* 3D Cake Model - Centered */}
        {showCake && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 2, 
              ease: [0.25, 0.1, 0.25, 1],
              scale: { duration: 1.5 }
            }}
            style={{
              width: '60vh',
              height: '60vh',
              maxWidth: '500px',
              maxHeight: '500px',
              minWidth: '300px',
              minHeight: '300px',
              pointerEvents: 'none',
              marginBottom: '20px', // Space between cake and message
            }}
          >
            <Canvas
              camera={{ position: [6, 6, 6], fov: 45 }}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <ResizeFixer />
              <ambientLight intensity={1} />
              <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <motion.group
                initial={{ scale: 0, rotationY: Math.PI * 2 }}
                animate={{ scale: 1, rotationY: 0 }}
                transition={{ 
                  delay: 0.5,
                  duration: 2.5,
                  type: "spring",
                  stiffness: 30,
                  damping: 10
                }}
              >
                <Model 
                  scale={2.5} 
                  rotation={[0, Math.PI / 8, 0]}
                  position={[0, -1.5, 0]}
                />
              </motion.group>
              
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
              />
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>
        )}

        {/* Birthday Message Card - Below the cake */}
        <motion.div 
          className="birthday-message"
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 200,
            duration: 1,
            delay: 0.5
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
            padding: '25px 20px',
            borderRadius: '20px',
            boxShadow: `
              0 20px 60px rgba(0,0,0,0.6),
              0 0 0 1px rgba(255,255,255,0.1),
              inset 0 0 40px rgba(255,255,255,0.1)
            `,
            maxWidth: '450px',
            width: '80%',
            textAlign: 'center',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(15px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'auto',
            pointerEvents: 'auto',
            marginTop: '20px', // Space from cake
          }}
        >
          {/* Audio Control Button */}
          <motion.button
            onClick={toggleAudio}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1rem',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            {isPlaying ? '🔊' : '🔇'}
          </motion.button>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              fontSize: '1.8rem',
              marginBottom: '12px',
              textShadow: '2px 2px 6px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #ffa726)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 4s ease infinite',
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              lineHeight: '1.2',
            }}
          >
            Happy 22nd Birthday!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            style={{
              fontSize: '0.95rem',
              marginBottom: '15px',
              lineHeight: '1.4',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
              fontWeight: '500',
              maxWidth: '90%',
            }}
          >
            You've officially leveled up in life! Wishing you all the happiness and success in the world.
          </motion.p>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="confetti"
            style={{
              fontSize: '1.5rem',
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {['🎊', '🎈', '🎁', '🎉', '✨', '🥳'].map((emoji, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 1.3 + index * 0.15, 
                  type: "spring", 
                  stiffness: 150 
                }}
                whileHover={{ 
                  scale: 1.4, 
                  rotate: 360,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  display: 'inline-block',
                  filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.3))'
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          <motion.button
            onClick={onBack}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
              boxShadow: '0 6px 20px rgba(0,0,0,0.25)'
            }}
            whileTap={{ scale: 0.92 }}
            style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
              color: 'white',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              marginTop: '8px',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              pointerEvents: 'auto',
            }}
          >
            Continue Celebrating! 🎂
          </motion.button>
        </motion.div>
      </div>

      {/* Music Status Indicator */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '15px',
          fontSize: '0.8rem',
          zIndex: 4,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'auto',
        }}
      >
        <span style={{ fontSize: '1rem' }}>
          {isPlaying ? '🎵' : '🔇'}
        </span>
        {isPlaying ? 'Birthday music playing...' : 'Music paused'}
      </motion.div>

      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .birthday-message {
            animation: pulseGlow 3s ease-in-out infinite alternate;
          }
          
          @keyframes pulseGlow {
            from {
              box-shadow: 
                0 20px 60px rgba(0,0,0,0.6),
                0 0 0 1px rgba(255,255,255,0.1),
                inset 0 0 40px rgba(255,255,255,0.1);
            }
            to {
              box-shadow: 
                0 20px 80px rgba(102, 126, 234, 0.4),
                0 0 0 1px rgba(255,255,255,0.2),
                inset 0 0 50px rgba(255,255,255,0.15);
            }
          }

          /* Responsive adjustments */
          @media (max-height: 700px) {
            .birthday-message {
              padding: 15px 15px;
              margin-top: 10px;
            }
            
            .birthday-message h1 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }
            
            .birthday-message p {
              font-size: 0.85rem;
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HappyBirthday;