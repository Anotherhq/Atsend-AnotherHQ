"use client"
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the structure of the landing page
export interface LandingPageConfig {
  title: string;
  header: string;
  description: string;
  logoUrl: string | null;
}

// Initial default configuration
const defaultConfig: LandingPageConfig = {
  title: 'My Newsletter Signup',
  header: 'Join Our Newsletter',
  description: 'Stay updated with the latest news and insights.',
  logoUrl: null
};

// Context type
interface LandingPageContextType {
  config: LandingPageConfig;
  updateConfig: (updates: Partial<LandingPageConfig>) => void;
  resetConfig: () => void;
}

// Create the context
const LandingPageContext = createContext<LandingPageContextType>({
  config: defaultConfig,
  updateConfig: () => {},
  resetConfig: () => {}
});

// Provider component
export const LandingPageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<LandingPageConfig>(defaultConfig);

  const updateConfig = (updates: Partial<LandingPageConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  return (
    <LandingPageContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </LandingPageContext.Provider>
  );
};

// Custom hook for using the context
export const useLandingPage = () => {
  const context = useContext(LandingPageContext);
  if (!context) {
    throw new Error('useLandingPage must be used within a LandingPageProvider');
  }
  return context;
};