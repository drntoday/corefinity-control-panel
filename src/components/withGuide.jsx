import React from 'react';
import { useGuide } from '../context/GuideContext';
import { guideContent } from '../data/userGuide';

export const withGuide = (WrappedComponent, guideKey) => {
  return (props) => {
    const { demoMode, showGuide, tooltipsEnabled } = useGuide();
    const content = guideContent[guideKey];
    
    const handleClick = (e) => {
      if (demoMode) {
        e.preventDefault();
        e.stopPropagation();
        showGuide(guideKey);
      } else if (props.onClick) {
        props.onClick(e);
      }
    };
    
    return (
      <div 
        className={`guide-wrapper ${demoMode ? 'demo-active' : ''}`}
        title={tooltipsEnabled && !demoMode ? content?.description : ''}
      >
        <WrappedComponent
          {...props}
          onClick={handleClick}
          data-guide={guideKey}
        />
        {demoMode && (
          <span className="guide-badge">?</span>
        )}
      </div>
    );
  };
};
