
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail"; // Nieuwe import
import SafetyManagement from "./pages/SafetyManagement";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import RiskAssessment from "./pages/RiskAssessment";
import EmergencyCall from "./pages/EmergencyCall";
import PartnerPortal from "./pages/PartnerPortal";
import ClientDetail from "./pages/ClientDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes for both employees and employers */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["employee", "employer"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/employees" element={
              <ProtectedRoute allowedRoles={["employee", "employer"]}>
                <Employees />
              </ProtectedRoute>
            } />
            
            <Route path="/employees/:employeeId" element={
              <ProtectedRoute allowedRoles={["employee", "employer"]}>
                <EmployeeDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/emergency-call" element={
              <ProtectedRoute allowedRoles={["employee", "employer"]}>
                <EmergencyCall />
              </ProtectedRoute>
            } />
            
            {/* Protected routes for employers only */}
            <Route path="/certificates" element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <Certificates />
              </ProtectedRoute>
            } />
            
            <Route path="/safety" element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <SafetyManagement />
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <Reports />
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <Settings />
              </ProtectedRoute>
            } />
            
            <Route path="/risk-assessment" element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <RiskAssessment />
              </ProtectedRoute>
            } />
            
            {/* Protected routes for trainers only */}
            <Route path="/partner-portal" element={
              <ProtectedRoute allowedRoles={["trainer"]}>
                <PartnerPortal />
              </ProtectedRoute>
            } />
            
            <Route path="/partner-portal/client/:clientId" element={
              <ProtectedRoute allowedRoles={["trainer"]}>
                <ClientDetail />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
