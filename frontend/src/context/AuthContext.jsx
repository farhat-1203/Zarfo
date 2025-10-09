import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode }  from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("zarfo_token") || null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ ...decoded, token });
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem("zarfo_token", token);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("zarfo_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
