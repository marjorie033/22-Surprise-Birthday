import { Canvas } from "@react-three/fiber";
import { Model } from './Model';
import { ProgressLoader } from "./ProgressLoader";

import React, { useState } from "react";
import "../App.css";

export default function Loading({ onLoaded }) {
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onLoaded) onLoaded();
          return 100;
        }
        return prev + 2; // speed of progress
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        {/* 🐼 Image above the loading bar */}
        <img
          src="/red-walk.gif"
          alt="Loading mascot"
          className="loading-image"
        />

        {/* 🔵 Loading bar */}
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="loading-text">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
}
