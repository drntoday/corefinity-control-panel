import React from 'react';
import { useGuide } from '../context/GuideContext';
import { guideContent } from '../data/userGuide';

const GuideModal = () => {
  const { activeGuide, hideGuide } = useGuide();
  
  if (!activeGuide) return null;
  
  const content = guideContent[activeGuide];
  if (!content) return null;
  
  return (
    <div className="guide-modal-overlay" onClick={hideGuide}>
      <div className="guide-modal" onClick={e => e.stopPropagation()}>
        <div className="guide-modal-header">
          <h3>{content.title}</h3>
          <button onClick={hideGuide} className="guide-modal-close">×</button>
        </div>
        <div className="guide-modal-body">
          <p className="guide-description">{content.description}</p>
          
          <div className="guide-detail">
            <span className="guide-label">What happens:</span>
            <span className="guide-value">{content.action}</span>
          </div>
          
          <div className="guide-detail">
            <span className="guide-label">Who can use:</span>
            <span className="guide-value">{content.permission}</span>
          </div>
          
          {content.shortcut && (
            <div className="guide-detail">
              <span className="guide-label">Keyboard shortcut:</span>
              <span className="guide-value guide-shortcut">{content.shortcut}</span>
            </div>
          )}
        </div>
        <div className="guide-modal-footer">
          <button onClick={hideGuide} className="btn-secondary">Close</button>
          <button className="btn-primary">Try Interactive</button>
        </div>
      </div>
    </div>
  );
};

export default GuideModal;
