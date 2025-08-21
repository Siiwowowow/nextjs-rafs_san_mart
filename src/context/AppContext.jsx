'use client'

import { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { user, isSignedIn } = useUser(); // Clerk user

  return (
    <AppContext.Provider value={{ user, isSignedIn }}>
      {children}
    </AppContext.Provider>
  );
};
