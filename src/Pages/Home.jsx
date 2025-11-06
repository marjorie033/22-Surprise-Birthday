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
  };

  const handleBackFromBirthday = () => {
    setShowBirthday(false);
  };

  return (
    <>
      {!isLoaded ? (
        <Loading onLoaded={() => setIsLoaded(true)} />
      ) : (
        <>
          <div className={`main-content ${showVerification || showBirthday ? 'blurred' : ''}`}>
            <Navbar />
            <Hero />
            <Moments />
            <Letter />
          </div>
          
          {/* Verification Game Popup */}
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
          
          {/* {!verificationCompleted && !showVerification && !showBirthday && (
            <div className="verification-reminder">
              <button 
                className="reminder-btn"
                onClick={() => setShowVerification(true)}
              >
                🎮 Unlock Full Experience
              </button>
            </div>
          )} */}
        </>
      )}
    </>
  );
};


export default Home;