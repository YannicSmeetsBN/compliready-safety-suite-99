
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Certificates from "./pages/Certificates";
import Employees from "./pages/Employees";
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
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/safety" element={<SafetyManagement />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/risk-assessment" element={<RiskAssessment />} />
          <Route path="/emergency-call" element={<EmergencyCall />} />
          <Route path="/partner-portal" element={<PartnerPortal />} />
          <Route path="/partner-portal/client/:clientId" element={<ClientDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
