import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import HappyBirthday from "./Birthday";

const VerificationGame = ({ onVerify, onClose, onWin }) => { // Added onWin prop
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameStatus, setGameStatus] = useState("intro");
  const [completedGames, setCompletedGames] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);

  const games = [
    {
      id: "memory",
      name: "Memory Match",
      description: "Find all matching pairs before time runs out!",
      difficulty: "medium"
    },
    {
      id: "whack",
      name: "Whack-a-Mole",
      description: "Click the moles as they pop up!",
      difficulty: "easy"
    },
    {
      id: "drag",
      name: "Drag & Drop",
      description: "Drag the items to their correct spots",
      difficulty: "medium"
    },
    {
      id: "color",
      name: "Color Match",
      description: "Select the correct color sequence",
      difficulty: "hard"
    }
  ];

  const startRandomGame = () => {
    const availableGames = games.filter(game => !completedGames.includes(game.id));
    if (availableGames.length === 0) {
      // All games completed, player wins!
      setShowWinPopup(true);
      return;
    }
    
    const randomGame = availableGames[Math.floor(Math.random() * availableGames.length)];
    setCurrentGame(randomGame);
    setGameStatus("playing");
  };

  const handleGameWin = () => {
    setScore(prev => prev + 100);
    setCompletedGames(prev => [...prev, currentGame.id]);
    
    if (completedGames.length + 1 >= 2) { // Win after completing 2 games
      setTimeout(() => {
        setShowWinPopup(true);
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentGame(null);
        setGameStatus("intro");
      }, 1500);
    }
  };

  const handleGameOver = () => {
    const newLives = lives - 1;
    setLives(newLives);
    
    if (newLives <= 0) {
      setGameStatus("gameover");
    } else {
      setTimeout(() => {
        setCurrentGame(null);
        setGameStatus("intro");
      }, 1500);
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setCompletedGames([]);
    setGameStatus("intro");
    setCurrentGame(null);
  };

  const handleContinue = () => {
    setShowWinPopup(false);
    onWin(); // Changed from onVerify() to onWin()
  };

  const handleCloseWinPopup = () => {
    setShowWinPopup(false);
    onClose();
  };

  return (
    <>
      <motion.div 
        className="verification-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="verification-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          {gameStatus === "gameover" ? (
            <GameOverScreen 
              score={score}
              onRetry={resetGame}
              onClose={onClose}
            />
          ) : !currentGame ? (
            <IntroScreen 
              score={score}
              lives={lives}
              completedGames={completedGames}
              onStartGame={startRandomGame}
              onClose={onClose}
            />
          ) : (
            <GameScreen 
              game={currentGame}
              onWin={handleGameWin}
              onGameOver={handleGameOver}
              onClose={onClose}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Win Popup */}
      <AnimatePresence>
        {showWinPopup && (
          <WinPopup 
            score={score}
            onContinue={handleContinue}
            onClose={handleCloseWinPopup}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Win Popup Component - Update the button text
const WinPopup = ({ score, onContinue, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <motion.div
        className="win-popup-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Popup Content */}
      <motion.div 
        className="win-popup"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="win-popup-content">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="trophy"
          >
            🏆
          </motion.div>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Verification Complete!
          </motion.h2>
          
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            You scored <strong>{score} points</strong> and proved you're human! 🎉
          </motion.p>

          <div className="win-popup-buttons">
            <motion.button
              className="continue-button"
              onClick={onContinue}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continue to Birthday Surprise! 🎂
            </motion.button>

            <motion.button
              className="close-popup-button"
              onClick={onClose}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Intro Screen Component
const IntroScreen = ({ score, lives, completedGames, onStartGame, onClose }) => {
  return (
    <div className="intro-screen">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🤖 Human Verification
      </motion.h2>
      
      <motion.p
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Prove you're human by winning mini-games!
      </motion.p>

      <div className="game-stats">
        <motion.div 
          className="stat"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="stat-value">{score}</span>
          <span className="stat-label">Score</span>
        </motion.div>
        
        <motion.div 
          className="stat"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="stat-value">❤️ {lives}</span>
          <span className="stat-label">Lives</span>
        </motion.div>
        
        <motion.div 
          className="stat"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="stat-value">{completedGames.length}/2</span>
          <span className="stat-label">Completed</span>
        </motion.div>
      </div>

      <motion.button
        className="start-button"
        onClick={onStartGame}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎮 Start Challenge
      </motion.button>

      <motion.button
        className="close-button"
        onClick={onClose}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Maybe later? 😉
      </motion.button>
    </div>
  );
};

// Memory Match Game
const MemoryGame = ({ onWin, onGameOver }) => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  const symbols = ['🌟', '❤️', '🎮', '🎯', '🎨', '🎪', '🎭', '🎼'];

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && matched.length < symbols.length) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      onGameOver();
    }
    return () => clearTimeout(timerRef.current);
  }, [timeLeft, matched.length]);

  const initializeGame = () => {
    const gameCards = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol, flipped: false }));
    setCards(gameCards);
    setTimeLeft(30);
    setMatched([]);
    setFlipped([]);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setMatched([...matched, first, second]);
        setFlipped([]);
        if (matched.length + 2 === symbols.length * 2) {
          setTimeout(onWin, 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="memory-game">
      <div className="game-header">
        <h3>Memory Match</h3>
        <div className="timer">⏰ {timeLeft}s</div>
      </div>
      
      <div className="memory-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card.symbol}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Whack-a-Mole Game
const WhackAMole = ({ onWin, onGameOver }) => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const gameRef = useRef(null);

  useEffect(() => {
    const moleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 9);
      setMoles(prev => {
        const newMoles = [...prev];
        newMoles[randomIndex] = true;
        return newMoles;
      });

      setTimeout(() => {
        setMoles(prev => {
          const newMoles = [...prev];
          newMoles[randomIndex] = false;
          return newMoles;
        });
      }, 800);
    }, 600);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(moleInterval);
          clearInterval(timer);
          if (score >= 15) {
            setTimeout(onWin, 500);
          } else {
            setTimeout(onGameOver, 500);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(timer);
    };
  }, [score]);

  const whackMole = (index) => {
    if (moles[index]) {
      setScore(prev => prev + 1);
      setMoles(prev => {
        const newMoles = [...prev];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  return (
    <div className="whack-game">
      <div className="game-header">
        <h3>Whack-a-Mole!</h3>
        <div className="score-time">
          <span>Score: {score}/15</span>
          <span>⏰ {timeLeft}s</span>
        </div>
      </div>
      
      <div className="mole-grid">
        {moles.map((isUp, index) => (
          <motion.div
            key={index}
            className={`mole-hole ${isUp ? 'active' : ''}`}
            onClick={() => whackMole(index)}
            animate={isUp ? { y: -20 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {isUp && <div className="mole">🐹</div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Game Screen Component
const GameScreen = ({ game, onWin, onGameOver, onClose }) => {
  const renderGame = () => {
    switch (game.id) {
      case 'memory':
        return <MemoryGame onWin={onWin} onGameOver={onGameOver} />;
      case 'whack':
        return <WhackAMole onWin={onWin} onGameOver={onGameOver} />;
      // Add other games here
      default:
        return <MemoryGame onWin={onWin} onGameOver={onGameOver} />;
    }
  };

  return (
    <div className="game-screen">
      <div className="game-info">
        <h3>{game.name}</h3>
        <p>{game.description}</p>
        <span className={`difficulty ${game.difficulty}`}>
          {game.difficulty}
        </span>
      </div>
      
      {renderGame()}
      
      <button className="close-button" onClick={onClose}>
        Exit Game
      </button>
    </div>
  );
};

// Game Over Screen Component
const GameOverScreen = ({ score, onRetry, onClose }) => {
  return (
    <motion.div 
      className="gameover-screen"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 15 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="gameover-icon"
      >
        💀
      </motion.div>
      
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Game Over!
      </motion.h2>
      
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Final Score: <strong>{score} points</strong>
      </motion.p>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="retry-message"
      >
        Don't worry, even humans need practice! 😊
      </motion.p>

      <motion.button
        className="retry-button"
        onClick={onRetry}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🔄 Try Again
      </motion.button>

      <motion.button
        className="close-button"
        onClick={onClose}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Give Up? 😢
      </motion.button>
    </motion.div>
  );
};

export default VerificationGame;