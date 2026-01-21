import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthState {
  email: string;
  role: string;
  loginAt: string;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("pixelpro_auth");
    if (stored) {
      try {
        setAuth(JSON.parse(stored));
      } catch {
        localStorage.removeItem("pixelpro_auth");
      }
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("pixelpro_auth");
    setAuth(null);
  };

  return {
    auth,
    isAuthenticated: !!auth,
    isAdmin: auth?.role === "admin",
    isLoading,
    logout,
  };
}

export function useRequireAuth(redirectTo: string = "/login") {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, isLoading, navigate, redirectTo]);

  return { isAuthenticated, isLoading };
}
