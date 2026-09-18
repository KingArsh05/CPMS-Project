import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Login from "./components/Login/Login";
import AppLayout from "./components/Portal/AppLayout";
import Dashboard from "./components/Portal/Dashboard";
import Profile from "./components/Portal/Userprofile/Profile";
import ModulePlaceholder from "./components/Portal/ModulePlaceholder";
import LoadingComponent from "./components/Portal/LoadingComponent";

function PortalRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const navigateTo = (path) => navigate(path);

  return (
    <AppLayout currentRoute={currentRoute} onNavigate={navigateTo}>
      <Routes>
        <Route path="/" element={<Dashboard onNavigate={navigateTo} />} />
        <Route path="/profile" element={<Profile onNavigate={navigateTo} />} />
        <Route
          path="/modules/professional-details"
          element={
            <ModulePlaceholder
              title="Professional & Service Details"
              description="Service records, date of joining, promotions history, and faculty tenure status (permanent/contractual)."
              category="HR & Establishment"
            />
          }
        />
        <Route
          path="/modules/qualifications"
          element={
            <ModulePlaceholder
              title="Academic Qualifications"
              description="Secondary, Higher Secondary, Undergraduate, Postgraduate, and PhD degrees with CGPA/Percentage verification."
              category="Academic Records"
            />
          }
        />
        <Route
          path="/modules/experience"
          element={
            <ModulePlaceholder
              title="Teaching & Industry Experience"
              description="Records of prior teaching tenures and industry experience across accredited organizations."
              category="Experience"
            />
          }
        />
        <Route
          path="/modules/instructional-work"
          element={
            <ModulePlaceholder
              title="Instructional Work Assigned"
              description="Semester-wise course codes, lectures, tutorial & practical hours, class strength, and result metrics."
              category="Workload Management"
            />
          }
        />
        <Route
          path="/modules/thesis-supervision"
          element={
            <ModulePlaceholder
              title="Student Research & Thesis Supervision"
              description="Guidance records for B.Tech Major Projects, M.Tech Theses, and PhD Doctoral Scholars."
              category="Guidance"
            />
          }
        />
        <Route
          path="/modules/additional-duties"
          element={
            <ModulePlaceholder
              title="Additional Administrative Duties"
              description="Departmental, college-level, state, and national committee duties and institutional responsibilities."
              category="Administration"
            />
          }
        />
        <Route
          path="/modules/research-contributions"
          element={
            <ModulePlaceholder
              title="Research Publications & Grants"
              description="Refereed journal papers, sponsored research funding grants, and industrial consultancy projects."
              category="Research & Development"
            />
          }
        />
        <Route
          path="/modules/activities"
          element={
            <ModulePlaceholder
              title="Activities Organized & Participations"
              description="Conferences, Faculty Development Programs (FDP), STTPs, workshops organized and attended."
              category="Faculty Development"
            />
          }
        />
        <Route
          path="/modules/annual-appraisal"
          element={
            <ModulePlaceholder
              title="Annual Appraisal Reports (AAR)"
              description="Annual evaluation cycle, self-appraisals, HOD reviews, and Principal endorsement workflows."
              category="Performance Appraisal"
            />
          }
        />
        {/* Catch-all → dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}

function AuthGate() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <LoadingComponent
        title="Checking Session"
        message="Connecting with PMS backend..."
        fullScreen
      />
    );
  }

  if (!isAuthenticated) {
    return <Login onSuccess={() => navigate("/", { replace: true })} />;
  }

  return <PortalRoutes />;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AuthGate />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
