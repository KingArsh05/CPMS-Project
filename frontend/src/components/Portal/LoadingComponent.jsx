import { useTheme } from "../../context/ThemeContext";

export default function LoadingComponent({
  title = "PMS Portal",
  message = "Connecting with PMS backend...",
  fullScreen = false,
}) {
  const { darkMode } = useTheme();

  const content = (
    <div className="relative flex flex-col items-center justify-center select-none text-center px-4">
      {/* Dynamic Ambient Backlight Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/15 dark:bg-blue-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Hero Kinetic Emblem */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Subtle Ambient Pulse Ripple Ring */}
        <div className="absolute w-28 h-28 rounded-full border border-blue-500/20 dark:border-blue-400/20 animate-ping opacity-30 pointer-events-none" />

        {/* Outer Continuous Precision Kinetic Orbit */}
        <svg
          className="w-24 h-24 animate-spin text-blue-500 dark:text-blue-400"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faint Background Track Ring */}
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 6"
            className="opacity-20 dark:opacity-25"
          />
          {/* Main Gradient Sweep Arc */}
          <circle
            cx="48"
            cy="48"
            r="42"
            stroke="url(#blue-gradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="70 190"
          />
          <defs>
            <linearGradient id="blue-gradient" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Counter-Spinning Satellite Particle */}
        <div className="absolute w-16 h-16 rounded-full -scale-x-100 animate-spin flex items-start justify-center pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80" />
        </div>

        {/* Centered Floating Glowing Identity Shield */}
        <div className="absolute w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/35 border border-white/20 dark:border-white/10">
          <svg
            className="w-6 h-6 animate-pulse"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
      </div>

      {/* Institutional Micro Radar Pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-blue-500/10 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-800/50 mb-3 shadow-xs">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500 dark:bg-blue-400"></span>
        </span>
        <span>Secure Gateway</span>
      </div>

      {/* Main Title */}
      <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>

      {/* Subtitle Message */}
      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 max-w-xs font-normal leading-relaxed">
        {message}
      </p>

      {/* Modern Indeterminate Gradient Pulse Line */}
      <div className="w-36 h-1 bg-slate-200/50 dark:bg-slate-800/80 rounded-full overflow-hidden mt-6 relative shadow-inner">
        <div className="h-full w-full bg-linear-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-full animate-pulse" />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
          darkMode ? "bg-slate-950" : "bg-slate-50"
        }`}
      >
        {content}
      </div>
    );
  }

  return content;
}
