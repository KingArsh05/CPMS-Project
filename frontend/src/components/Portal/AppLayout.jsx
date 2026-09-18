import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header/Header";
import LogoutModal from "./LogoutModal";
import { useAuth } from "../../context/AuthContext";

export default function AppLayout({ children, currentRoute, onNavigate }) {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleConfirmLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      navigate("/login", { replace: true });
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex">
      {/* Responsive Collapsible Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((p) => !p)}
        currentRoute={currentRoute}
        onNavigate={onNavigate}
        onOpenLogout={() => setIsLogoutModalOpen(true)}
      />

      {/* Main Execution Canvas */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isCollapsed ? "xl:pl-20" : "xl:pl-68"
        }`}
      >
        {/* Header */}
        <Header
          onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
          onNavigate={onNavigate}
          onOpenLogout={() => setIsLogoutModalOpen(true)}
          currentRoute={currentRoute}
        />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {children}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}
