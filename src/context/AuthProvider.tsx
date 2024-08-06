import { createContext, useState } from "react";
type authContextType = {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<authContextType>({
  auth: undefined,
  setAuth: () => void {},
});

interface authProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<authProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
