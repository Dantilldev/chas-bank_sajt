"use client";
import { createContext, useState, useContext } from "react";

const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const [session, setSession] = useState();

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
