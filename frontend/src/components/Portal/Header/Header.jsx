import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

function getInitials(name) {
  if (!name) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

function formatTitle(route) {
  if (!route || route === "/")
    return { title: "Faculty Dashboard", crumb: "Overview" };
  if (route === "/profile") return { title: "My Profile", crumb: "Profile" };
  if (route?.startsWith("/modules/")) {
    const slug = route.replace("/modules/", "");
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return { title, crumb: title };
  }
  return { title: "Faculty Dashboard", crumb: "Overview" };
}

function getAcademicYear() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-indexed
  return m >= 6
    ? `${y}-${String(y + 1).slice(2)}`
    : `${y - 1}-${String(y).slice(2)}`;
}

export default function Header({
  onToggleSidebar,
  onNavigate,
  onOpenLogout,
  currentRoute,
}) {
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { title, crumb } = formatTitle(currentRoute);
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const menuItems = [
    {
      label: "Dashboard",
      desc: "Overview & insights",
      route: "/",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
    },
    {
      label: "My Profile",
      desc: "Personal & contact info",
      route: "/profile",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      ),
    },
    {
      label: "Professional Details",
      desc: "Designation & service",
      route: "/modules/professional-details",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-colors duration-200 dark:border-slate-800/80 dark:bg-slate-900/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* Left: nav toggle + breadcrumb title */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation sidebar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-95 xl:hidden dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <span
            aria-hidden="true"
            className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-800"
          />

          <nav aria-label="Breadcrumb" className="min-w-0">
            <p className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:block dark:text-slate-500">
              GNDEC · Faculty Portal
            </p>
            <div className="flex min-w-0 items-center gap-1.5">
              <button
                type="button"
                onClick={() => onNavigate?.("/")}
                className="hidden shrink-0 items-center gap-1 rounded-md text-xs font-medium text-slate-400 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-blue-600 sm:flex dark:text-slate-500 dark:hover:text-blue-400"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </button>
              <svg
                className="hidden h-3 w-3 shrink-0 text-slate-300 sm:block dark:text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <h1 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-[15px] dark:text-white">
                {title}
              </h1>
              <span className="hidden rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-inset ring-blue-200/70 lg:inline-block dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                {crumb}
              </span>
            </div>
          </nav>
        </div>

        {/* Right: session, date, theme, profile */}
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 md:flex dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            AY {getAcademicYear()}
          </span>

          <span className="hidden rounded-full px-2 py-1 text-[11px] font-medium tabular-nums text-slate-400 lg:block dark:text-slate-500">
            {today}
          </span>

          {/* Theme toggle — clean pill switch */}
          <button
            type="button"
            role="switch"
            aria-checked={darkMode}
            onClick={toggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className={`relative flex h-8 w-[60px] shrink-0 cursor-pointer items-center rounded-full p-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 active:scale-[0.95] ${
              darkMode
                ? "bg-slate-800 shadow-inner ring-1 ring-slate-700/60"
                : "bg-slate-100 shadow-inner ring-1 ring-slate-200"
            }`}
          >
            {/* Sliding knob */}
            <span
              aria-hidden="true"
              className={`relative z-10 flex h-6 w-6 transform items-center justify-center rounded-full shadow-md transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${
                darkMode
                  ? "translate-x-[28px] bg-indigo-600 shadow-indigo-500/40"
                  : "translate-x-0 bg-white shadow-slate-300/60"
              }`}
            >
              <span className="relative block h-3.5 w-3.5">
                {/* Sun icon */}
                <span
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    darkMode
                      ? "rotate-90 scale-50 opacity-0"
                      : "rotate-0 scale-100 opacity-100"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />
                    <path strokeWidth="2" d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6l-1.4 1.4M7 17l-1.4 1.4" />
                  </svg>
                </span>
                {/* Moon icon */}
                <span
                  className={`absolute inset-0 transform transition-all duration-300 ${
                    darkMode
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-50 opacity-0"
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 text-indigo-200"
                    fill="currentColor"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </span>
              </span>
            </span>
          </button>

          <span
            aria-hidden="true"
            className="h-6 w-px bg-slate-200 dark:bg-slate-800"
          />

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen((p) => !p)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="menu"
              aria-label="Open user menu"
              className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-1.5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:rounded-xl sm:pl-1.5 sm:pr-2.5 ${
                isDropdownOpen
                  ? "border-blue-300 bg-blue-50/60 ring-2 ring-blue-100 dark:border-blue-500/40 dark:bg-slate-800 dark:ring-blue-500/20"
                  : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700/80 dark:bg-slate-800/60 dark:shadow-none dark:hover:border-slate-600 dark:hover:bg-slate-800"
              }`}
            >
              <span className="relative shrink-0">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 text-xs font-bold text-white ring-2 ring-white sm:rounded-lg dark:ring-slate-900">
                  {getInitials(user?.name)}
                </span>
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"
                  aria-hidden="true"
                />
              </span>
              <span className="hidden flex-col items-start leading-none sm:flex">
                <span className="truncate text-xs font-bold text-slate-800 dark:text-slate-100">
                  {user?.name || "Faculty Member"}
                </span>
                <span className="mt-1 truncate text-[10px] font-medium capitalize text-slate-400 dark:text-slate-500">
                  {user?.designation?.replace(/_/g, " ") ||
                    user?.role ||
                    "Faculty"}
                </span>
              </span>
              <svg
                className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""} dark:text-slate-500`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown — always mounted for pure-tailwind enter animation */}
            <div
              role="menu"
              aria-hidden={!isDropdownOpen}
              className={`absolute right-0 top-[calc(100%+10px)] z-50 w-80 max-w-[calc(100vw-2rem)] origin-top-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 transition-all duration-150 ease-out dark:border-slate-700/70 dark:bg-slate-900 dark:shadow-black/40 ${
                isDropdownOpen
                  ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0"
              }`}
            >
              {/* Identity */}
              <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 pb-3 pt-4 dark:border-slate-800 dark:bg-slate-800/60">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-base font-bold text-white ring-2 ring-blue-100 dark:ring-indigo-500/20">
                  {getInitials(user?.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
                    {user?.name || "Faculty Member"}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {user?.college_email_id || "faculty@gndec.ac.in"}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700 ring-1 ring-inset ring-blue-200/60 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20">
                      {user?.role || "Faculty"}
                    </span>
                    <span className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700 ring-1 ring-inset ring-emerald-200/60 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20">
                      <span
                        className="h-1 w-1 rounded-full bg-emerald-500 dark:bg-emerald-400"
                        aria-hidden="true"
                      />
                      {user?.status || "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="space-y-0.5 p-2">
                {menuItems.map((item) => {
                  const active =
                    currentRoute === item.route ||
                    (item.route === "/" &&
                      (!currentRoute || currentRoute === "/"));
                  return (
                    <button
                      key={item.route + item.label}
                      type="button"
                      role="menuitem"
                      tabIndex={isDropdownOpen ? 0 : -1}
                      onClick={() => {
                        onNavigate?.(item.route);
                        setIsDropdownOpen(false);
                      }}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 ${
                        active
                          ? "bg-blue-50 dark:bg-blue-500/10"
                          : "hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors ${
                          active
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-slate-700 dark:group-hover:text-blue-300"
                        }`}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </svg>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block truncate text-xs font-bold ${active ? "text-blue-700 dark:text-blue-300" : "text-slate-700 dark:text-slate-200"}`}
                        >
                          {item.label}
                        </span>
                        <span className="block truncate text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          {item.desc}
                        </span>
                      </span>
                      {active && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600 dark:bg-blue-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Meta */}
              <dl className="grid grid-cols-2 gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/40">
                <div className="min-w-0">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Employee ID
                  </dt>
                  <dd className="mt-0.5 truncate text-xs font-bold tabular-nums text-slate-700 dark:text-slate-200">
                    {user?.emp_id ?? "N/A"}
                  </dd>
                </div>
                <div className="min-w-0 text-right">
                  <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Designation
                  </dt>
                  <dd className="mt-0.5 truncate text-xs font-bold capitalize text-slate-700 dark:text-slate-200">
                    {user?.designation?.replace(/_/g, " ") || "Faculty"}
                  </dd>
                </div>
              </dl>

              {/* Sign out */}
              <div className="border-t border-slate-100 p-2 dark:border-slate-800">
                <button
                  type="button"
                  role="menuitem"
                  tabIndex={isDropdownOpen ? 0 : -1}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onOpenLogout?.();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-red-600 active:scale-[0.99] dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
