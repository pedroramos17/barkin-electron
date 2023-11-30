import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({ children }: any) {
  const [auth, setAuth]: any = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
