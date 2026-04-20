import React from 'react';
import { emptyStateGuides } from '../data/userGuide';

const GuidedEmptyState = ({ type, onPrimaryAction, onSecondaryAction }) => {
  const guide = emptyStateGuides[type];
  if (!guide) return null;
  
  return (
    <div className="empty-state-guided">
      <h3>{guide.title}</h3>
      <p>{guide.description}</p>
      <div className="empty-state-steps">
        <ol>
          {guide.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <div className="empty-state-actions">
        <button className="btn-primary" onClick={onPrimaryAction}>
          {guide.primaryAction}
        </button>
        <button className="btn-secondary" onClick={onSecondaryAction}>
          {guide.secondaryAction}
        </button>
      </div>
    </div>
  );
};

export default GuidedEmptyState;
