import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop().split(";").shift());
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  const checkAuth = useCallback(async (signal) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: defaultHeaders,
        credentials: "include",
        signal,
      });
      if (response.ok) {
        const data = await response.json();
        const activeUser = data?.user || null;
        setUser(activeUser);
        return activeUser;
      }
      setUser(null);
      return null;
    } catch (err) {
      // AbortError is expected when StrictMode cancels the first mount — ignore it.
      if (err instanceof Error && err.name !== "AbortError") {
        console.warn("Auth check failed:", err);
      }
      setUser(null);
      return null;
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    // Skip auth check if no XSRF-TOKEN cookie — user is not in an active session.
    if (!getCookie("XSRF-TOKEN")) {
      setLoading(false);
      setAuthChecked(true);
      return;
    }

    // AbortController cancels the duplicate request from React StrictMode.
    const controller = new AbortController();
    checkAuth(controller.signal);

    return () => controller.abort();
  }, [checkAuth]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      await fetch(`${BACKEND_URL}/sanctum/csrf-cookie`, {
        method: "GET",
        headers: defaultHeaders,
        credentials: "include",
      });

      const csrfToken = getCookie("XSRF-TOKEN");
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { ...defaultHeaders, "X-XSRF-TOKEN": csrfToken },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Invalid credentials.");
      }
      const loggedInUser = data?.user || null;
      setUser(loggedInUser);
      setAuthChecked(true);
      return loggedInUser;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const csrfToken = getCookie("XSRF-TOKEN");
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          ...defaultHeaders,
          "X-XSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
    } catch (error) {
      console.warn("Logout error:", error);
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
    isAuthenticated: Boolean(user),
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
