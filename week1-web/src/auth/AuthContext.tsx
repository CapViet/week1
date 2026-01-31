import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: string;
  name: string;
  exp: number;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session safely
  useEffect(() => {
    const saved = localStorage.getItem("token");

    if (saved) {
      try {
        const decoded = jwtDecode<User>(saved);

        // If expired → force logout
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
        } else {
          setToken(saved);
          setUser(decoded);
        }
      } catch {
        localStorage.removeItem("token");
      }
    }

    setIsLoading(false);
  }, []);

  async function login() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      { method: "POST" }
    );

    if (!res.ok) throw new Error("Login failed");

    const data = await res.json();
    const decoded = jwtDecode<User>(data.token);

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(decoded);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
