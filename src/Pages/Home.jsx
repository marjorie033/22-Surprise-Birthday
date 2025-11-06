import React, { useEffect, useState } from "react";
import Loading from "../Pages/loading";
import "../App.css";
import { useMediaQuery } from "react-responsive";
import Hero from "../Section/Hero";
import Moments from "../Section/Moments";
import Letter from "../Section/Letter";
import Transition from "../Section/Transition";
import Navbar from "../Section/nav-bar";
import VerificationGame from "./game-verify";
import HappyBirthday from "./Birthday";

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [showBirthday, setShowBirthday] = useState(false);
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [showHomeContent, setShowHomeContent] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 853 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVerification(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleVerificationComplete = () => {
    setVerificationCompleted(true);
    setShowBirthday(true);
    setShowVerification(false);
  };

  const handleCloseVerification = () => {
    setShowVerification(false);
    // Don't show home content if verification is closed without completion
  };

  const handleBackFromBirthday = () => {
    setShowBirthday(false);
    setShowHomeContent(true); // Show home content after birthday celebration
  };

  return (
    <>
      {!isLoaded ? (
        <Loading onLoaded={() => setIsLoaded(true)} />
      ) : (
        <>
          {/* Show home content ONLY after birthday celebration */}
          {showHomeContent && (
            <div className="main-content">
              <Navbar />
              <Hero />
              <Moments />
              <Letter />
            </div>
          )}
          
          Verification Game Popup - Shows first after loading
          {showVerification && (
            <VerificationGame 
              onVerify={handleVerificationComplete}
              onWin={handleVerificationComplete}
              onClose={handleCloseVerification}
            />
          )}
          
          Birthday Surprise after verification win
          {showBirthday && (
            <HappyBirthday onBack={handleBackFromBirthday} />
          )}
          
          {/* Show verification reminder if user skipped verification */}
          {!verificationCompleted && !showVerification && !showBirthday && !showHomeContent && (
            <div className="verification-reminder" style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 10000
            }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)',
                padding: '40px',
                borderRadius: '20px',
                textAlign: 'center',
                color: 'white',
                maxWidth: '400px',
                margin: '20px'
              }}>
                <h2>🎮 Welcome! 🎮</h2>
                <p>Complete the verification to access the full birthday experience!</p>
                <button 
                  onClick={() => setShowVerification(true)}
                  style={{
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '25px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '20px',
                    fontWeight: 'bold'
                  }}
                >
                  Start Verification
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Home;