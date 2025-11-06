import React from "react";

export default function SimpleTest() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #eabf42 0%, #ff6b6b 100%)', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <h1 style={{ color: 'white', fontSize: '2rem' }}>✅ Simple Test Working - No Canvas</h1>
    </div>
  );
}