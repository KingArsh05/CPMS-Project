import axios from "axios";

/**
 * Reusable Axios instance configured for Laravel Sanctum session-based authentication.
 *
 * - baseURL: Uses VITE_API_URL or defaults to http://localhost:8000
 * - withCredentials: true ensures Laravel session cookies & XSRF-TOKEN cookies are sent on every request
 * - withXSRFToken: true automatically transmits X-XSRF-TOKEN header when reading the Sanctum cookie
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

export default api;
