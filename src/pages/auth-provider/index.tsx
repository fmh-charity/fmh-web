import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

interface AuthProviderProps {
  children?: React.ReactElement
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
