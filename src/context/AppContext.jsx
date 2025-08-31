"use client"
import { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Custom hook to use context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [gigsTotalCount, setGigsTotalCount] = useState(0);
    const [userData, setUserData] = useState(null);

  const value = {
    gigsTotalCount,
    setGigsTotalCount,
    userData,
    setUserData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
