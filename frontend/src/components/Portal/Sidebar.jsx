import { useState, useRef, useEffect } from "react";

export default function Sidebar({
  isOpen,
  onClose,
  isCollapsed,
  onToggleCollapse,
  currentRoute,
  onNavigate,
  onOpenLogout,
}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 80 });

  const handleMouseEnter = (e, item) => {
    if (!isCollapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      top: rect.top + rect.height / 2,
      left: rect.right + 10,
    });
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navSections = [
    {
      title: "Core",
      items: [
        {
          id: "/",
          label: "Dashboard",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
        },
        {
          id: "/profile",
          label: "My Profile",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Service & Academic",
      items: [
        {
          id: "/modules/professional-details",
          label: "Professional Details",
          badge: "HR",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "/modules/qualifications",
          label: "Qualifications",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          ),
        },
        {
          id: "/modules/experience",
          label: "Experience Records",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Teaching & Guidance",
      items: [
        {
          id: "/modules/instructional-work",
          label: "Instructional Work",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
        },
        {
          id: "/modules/thesis-supervision",
          label: "Project Supervision",
          badge: "UG/PG/PhD",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
        {
          id: "/modules/additional-duties",
          label: "Additional Duties",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          ),
        },
      ],
    },
    {
      title: "R&D & Evaluations",
      items: [
        {
          id: "/modules/research-contributions",
          label: "Research & Grants",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ),
        },
        {
          id: "/modules/activities",
          label: "Activities & FDPs",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          id: "/modules/annual-appraisal",
          label: "Annual Appraisal (AAR)",
          badge: "AAR",
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          ),
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay (< 768px / < 1200px drawer) */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs xl:hidden animate-fadeIn"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/90 transition-all duration-200 select-none
          ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
          ${isCollapsed ? "xl:w-20" : "w-72 xl:w-68"}
        `}
      >
        {/* Brand Header */}
        <div className={`h-16 flex items-center border-b border-slate-100 dark:border-slate-800/80 px-3.5 ${isCollapsed ? "justify-center relative" : "justify-between"}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
              <img
                src="/gndec-logo.png"
                alt="GNDEC Crest"
                className="w-8 h-8 object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">
                  PMS Portal
                </span>
                <span className="text-[11px] text-slate-400 font-medium truncate">
                  GNDEC Faculty System
                </span>
              </div>
            )}
          </div>

          {/* Desktop Collapse Trigger (inside Sidebar header) */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden xl:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
              isCollapsed ? "absolute -right-3 top-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs z-20" : ""
            }`}
          >
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation sidebar"
            className="xl:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation List */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? "overflow-x-visible p-2 space-y-4" : "overflow-x-hidden p-3 space-y-5"} custom-scrollbar`}>
          {navSections.map((section, idx) => (
            <div key={idx} className={isCollapsed ? "flex flex-col items-center" : ""}>
              {/* Hide category labels completely in collapsed mode */}
              {!isCollapsed && (
                <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.title}
                </p>
              )}
              <div className={`space-y-1 ${isCollapsed ? "w-full flex flex-col items-center" : ""}`}>
                {section.items.map((item) => {
                  const isActive = currentRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={item.label}
                      onMouseEnter={(e) => handleMouseEnter(e, item)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        onNavigate(item.id);
                        onClose();
                      }}
                      className={`flex items-center text-xs font-semibold transition-all duration-150 relative cursor-pointer
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white"
                        }
                        ${
                          isCollapsed
                            ? "w-11 h-11 justify-center rounded-xl mx-auto"
                            : "w-full gap-3 px-3 py-2 rounded-xl"
                        }
                      `}
                    >
                      <span className={`shrink-0 flex items-center justify-center ${isActive ? "text-white" : "text-slate-400"}`}>
                        {item.icon}
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer: Canonical Sign Out Trigger */}
        <div className={`border-t border-slate-100 dark:border-slate-800/80 ${isCollapsed ? "p-2 flex justify-center" : "p-3"}`}>
          <button
            type="button"
            onClick={onOpenLogout}
            aria-label="Sign Out"
            onMouseEnter={(e) => handleMouseEnter(e, { label: "Sign Out", isLogout: true })}
            onMouseLeave={handleMouseLeave}
            className={`flex items-center text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer ${
              isCollapsed
                ? "w-11 h-11 justify-center rounded-xl"
                : "w-full gap-3 px-3 py-2.5 rounded-xl"
            }`}
          >
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span className="truncate">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Floating High Z-Index Tooltip Container for Collapsed Mode (Outside sidebar clipping) */}
      {isCollapsed && hoveredItem && (
        <div
          style={{
            position: "fixed",
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            transform: "translateY(-50%)",
          }}
          className="z-50 pointer-events-none transition-opacity duration-100 animate-fadeIn"
        >
          <div
            className={`text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-xl whitespace-nowrap border flex items-center gap-1.5 ${
              hoveredItem.isLogout
                ? "bg-red-600 text-white border-red-500 shadow-red-500/20"
                : "bg-slate-900 dark:bg-slate-800 text-white border-slate-800 dark:border-slate-700 shadow-black/30"
            }`}
          >
            <span>{hoveredItem.label}</span>
            {hoveredItem.badge && (
              <span className="text-[9px] px-1 py-0.2 bg-white/20 rounded font-bold uppercase">
                {hoveredItem.badge}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
}
