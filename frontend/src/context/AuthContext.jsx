import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  /**
   * Initializes and checks the currently authenticated session via GET /api/me.
   * Handles 401 silently without crashing or showing error screens.
   */
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/me");
      if (data?.user) {
        setUser(data.user);
        return data.user;
      }
      setUser(null);
      return null;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  /**
   * Automatically initialize auth check once on app mount.
   */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Performs the Laravel Sanctum Cookie + Session Login sequence:
   * 1. GET /sanctum/csrf-cookie
   * 2. POST /api/auth/login
   * 3. GET /api/me (or uses returned user)
   */
  const login = useCallback(
    async (credentials) => {
      // 1. Initialize CSRF protection cookie from Laravel
      await api.get("/sanctum/csrf-cookie");

      // 2. Perform credential authentication
      const { data } = await api.post("/api/auth/login", {
        college_email_id: credentials.college_email_id,
        password: credentials.password,
      });

      // 3. Confirm authenticated user session
      let authenticatedUser = data?.user;
      if (!authenticatedUser) {
        const meRes = await api.get("/api/me");
        authenticatedUser = meRes.data?.user;
      }

      setUser(authenticatedUser);
      setAuthChecked(true);
      return authenticatedUser;
    },
    []
  );

  /**
   * Logs out the user session.
   * Note: Pre-wired for /api/auth/logout when backend endpoint is enabled.
   */
  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch {
      // Gracefully ignore logout network/404 errors on backend
    } finally {
      setUser(null);
      setAuthChecked(true);
    }
  }, []);

  const value = {
    user,
    setUser,
    loading,
    authChecked,
    isAuthenticated: !!user,
    checkAuth,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
