import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, try to refresh access token
  useEffect(() => {
    const refresh = async () => {
      try {
        const { data } = await api.post("/auth/refresh"); // uses HttpOnly cookie
        if (data?.accessToken && data?.user) {
          localStorage.setItem("zarfo_token", data.accessToken);
          setToken(data.accessToken);
          setUser(data.user);
        }
      } catch (err) {
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };
    refresh();
  }, []);

  const login = (accessToken, user) => {
    localStorage.setItem("zarfo_token", accessToken);
    setToken(accessToken);
    setUser(user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout"); // clears refresh token cookie
    } catch {}
    localStorage.removeItem("zarfo_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
