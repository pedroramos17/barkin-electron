import { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }: any) {
  const [auth, setAuth]: any = useState({});

  const contextValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
