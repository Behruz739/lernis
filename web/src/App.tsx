import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const PublicCertificate = lazy(() => import("./pages/PublicCertificate"));

// Dashboard components
const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./pages/dashboard/Home"));
const DashboardProfile = lazy(() => import("./pages/dashboard/Profile"));
const DashboardSettings = lazy(() => import("./pages/dashboard/Settings"));
const DashboardResearch = lazy(() => import("./pages/dashboard/Research"));
const DashboardCertificates = lazy(() => import("./pages/dashboard/Certificates"));
const DashboardCertificateDetail = lazy(() => import("./pages/dashboard/CertificateDetail"));

// Admin components
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Statistics = lazy(() => import("./pages/admin/Statistics"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement"));
const CertificatesManagement = lazy(() => import("./pages/admin/CertificatesManagement"));
const AdminLogs = lazy(() => import("./pages/admin/AdminLogs"));
const SystemSettings = lazy(() => import("./pages/admin/SystemSettings"));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-gray-600 dark:text-gray-300">Loading...</p>
              </div>
            </div>
          }>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/c/:id" element={<PublicCertificate />} />

              {/* Dashboard routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
                <Route path="research" element={<DashboardResearch />} />
                <Route path="certificates" element={<DashboardCertificates />} />
                <Route path="certificates/:id" element={<DashboardCertificateDetail />} />
              </Route>

              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="certificates" element={<CertificatesManagement />} />
                <Route path="logs" element={<AdminLogs />} />
                <Route path="settings" element={<SystemSettings />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
