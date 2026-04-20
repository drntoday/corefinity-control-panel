import React, { createContext, useContext, useState } from 'react';

const GuideContext = createContext();

export const useGuide = () => useContext(GuideContext);

export const GuideProvider = ({ children }) => {
  const [demoMode, setDemoMode] = useState(false);
  const [activeGuide, setActiveGuide] = useState(null);
  const [tooltipsEnabled, setTooltipsEnabled] = useState(true);
  
  const showGuide = (guideKey) => {
    setActiveGuide(guideKey);
  };
  
  const hideGuide = () => {
    setActiveGuide(null);
  };
  
  return (
    <GuideContext.Provider value={{
      demoMode,
      setDemoMode,
      activeGuide,
      showGuide,
      hideGuide,
      tooltipsEnabled,
      setTooltipsEnabled
    }}>
      {children}
    </GuideContext.Provider>
  );
};
