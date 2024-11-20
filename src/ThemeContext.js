import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };

    useEffect(() => {
        // Apply the dark mode class to the body
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the Theme Context
export const useTheme = () => useContext(ThemeContext);