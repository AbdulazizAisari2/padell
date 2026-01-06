import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    primary: string;
    border: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const colors = isDarkMode
    ? {
        background: '#0F172A',
        surface: '#1E293B',
        text: '#F8FAFC',
        textSecondary: '#94A3B8',
        primary: '#2C6BFF',
        border: '#334155',
      }
    : {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        text: '#0F172A',
        textSecondary: '#64748B',
        primary: '#2C6BFF',
        border: '#E2E8F0',
      };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};