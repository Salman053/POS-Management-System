// src/context/MainContext.js

import { useFirestoreData } from "@/hooks/use-firebase-data";
import { MainContextType } from "@/types/index";
import React, { createContext, useContext, useEffect, useState } from "react";

// Create the context
const MainContext = createContext<MainContextType | undefined>(undefined);

// Custom hook to use MainContext safely
const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error('useMainContext must be used within a MainContextProvider');
  }
  return context;
};



// MainContextProvider component
const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  // State for theme and other global properties
  const [theme, setTheme] = useState("light"); // Possible values: 'light' or 'dark'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar visibility
  const [userPreferences, setUserPreferences] = useState({}); // Example user settings
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [currentUser]);
  

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };


  const { users, loading, error } = useFirestoreData()
  // Define the values to provide through context
  const contextValue = {
    theme,
    toggleTheme,
    isSidebarOpen,
    currentUser,
    setCurrentUser,
    toggleSidebar,
    userPreferences,
    setUserPreferences,
    users, loading, error
    // Add other global state or actions here
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};


export { MainContextProvider, useMainContext };
