import React from 'react';
import { useGuide } from '../context/GuideContext';

const GuideToggle = () => {
  const { demoMode, setDemoMode, tooltipsEnabled, setTooltipsEnabled } = useGuide();
  
  return (
    <div className="guide-controls">
      <button 
        className={`guide-toggle ${demoMode ? 'active' : ''}`}
        onClick={() => setDemoMode(!demoMode)}
        title="Demo Mode: Click any element to learn what it does"
      >
        <span className="guide-icon">👁️</span>
        <span>Demo Mode {demoMode ? 'ON' : 'OFF'}</span>
      </button>
      
      <button 
        className={`guide-toggle ${tooltipsEnabled ? 'active' : ''}`}
        onClick={() => setTooltipsEnabled(!tooltipsEnabled)}
        title="Show tooltips on hover"
      >
        <span className="guide-icon">ⓘ</span>
        <span>Tooltips</span>
      </button>
    </div>
  );
};

export default GuideToggle;
