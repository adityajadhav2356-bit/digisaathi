import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'normal'); // normal, large, x-large
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    
    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    document.documentElement.classList.remove('text-[18px]', 'text-[22px]', 'text-[26px]');
    if (fontSize === 'normal') document.documentElement.className += ' text-[18px]';
    if (fontSize === 'large') document.documentElement.className += ' text-[22px]';
    if (fontSize === 'x-large') document.documentElement.className += ' text-[26px]';
  }, [fontSize, theme, language]);

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize, theme, setTheme, language, setLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
};
