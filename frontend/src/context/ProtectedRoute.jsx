import { useAuth } from "./AuthContext";
import { useTheme } from "./ThemeContext";
import { useNavigate } from "react-router-dom";

// Access Denied component
function AccessDenied() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center overflow-hidden ${
        darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="relative text-center max-w-md w-full mx-4 px-10 py-12">
        <div className="relative mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
          <svg
            viewBox="0 0 24 24"
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="text-2xl font-black mb-2">Access Denied</h1>
        <p className="text-sm mb-6 text-slate-500 dark:text-slate-400">
          You don&apos;t have permission to access this page.
        </p>

        <button
          onClick={() => navigate("/", { replace: true })}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors shadow"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, allowedRoles: _unused } = useAuth();

  // Role-based access guard (auth gate is already handled in App.jsx → AuthGate)
  if (allowedRoles.length > 0) {
    const hasAccess = allowedRoles.includes(user?.role);
    if (!hasAccess) {
      return <AccessDenied />;
    }
  }

  return children;
}
