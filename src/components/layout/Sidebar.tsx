
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, 
  Users, 
  FileText, 
  BarChart, 
  Settings,
  Bell,
  AlertTriangle,
  Phone,
  Building
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
  hidden?: boolean;
};

const SidebarItem = ({ icon, label, to, active, hidden }: SidebarItemProps) => {
  if (hidden) return null;
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
        active 
          ? "bg-sidebar-accent text-white" 
          : "text-white/80 hover:bg-sidebar-accent/50 hover:text-white"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { userRole } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;

  // Determine visibility based on user role
  const isEmployee = userRole === "employee";
  const isEmployer = userRole === "employer";
  const isTrainer = userRole === "trainer";

  return (
    <div 
      className={`bg-sidebar h-screen fixed left-0 top-0 z-40 
      ${collapsed ? "w-20" : "w-64"} 
      transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex justify-center mb-6">
        <div className="bg-white rounded-lg p-2 flex justify-center w-full">
          <img 
            src="/lovable-uploads/3f76d639-79b2-4b59-a4c7-ab9802b94a18.png" 
            alt="CompliReady Logo" 
            className={`${collapsed ? "w-12" : "w-36"} transition-all duration-300`}
          />
        </div>
      </div>

      <div className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {/* Dashboard - visible to employees and employers */}
        <SidebarItem 
          icon={<Home />} 
          label="Dashboard" 
          to="/dashboard" 
          active={isActive("/dashboard")} 
          hidden={isTrainer}
        />
        
        {/* Employees - visible to employees and employers */}
        <SidebarItem 
          icon={<Users />} 
          label="Medewerkers" 
          to="/employees" 
          active={isActive("/employees")} 
          hidden={isTrainer}
        />
        
        {/* Certificates - visible to employers only */}
        <SidebarItem 
          icon={<FileText />} 
          label="Certificaten" 
          to="/certificates" 
          active={isActive("/certificates")} 
          hidden={!isEmployer}
        />
        
        {/* Safety - visible to employers only */}
        <SidebarItem 
          icon={<Bell />} 
          label="Veiligheidsbeheer" 
          to="/safety" 
          active={isActive("/safety")} 
          hidden={!isEmployer}
        />
        
        {/* Risk Assessment - visible to employers only */}
        <SidebarItem 
          icon={<AlertTriangle />} 
          label="RI&E Generator" 
          to="/risk-assessment" 
          active={isActive("/risk-assessment")} 
          hidden={!isEmployer}
        />
        
        {/* Emergency Call - visible to employees and employers */}
        <SidebarItem 
          icon={<Phone />} 
          label="BHV-Oproep" 
          to="/emergency-call" 
          active={isActive("/emergency-call")} 
          hidden={isTrainer}
        />
        
        {/* Reports - visible to employers only */}
        <SidebarItem 
          icon={<BarChart />} 
          label="Rapportages" 
          to="/reports" 
          active={isActive("/reports")} 
          hidden={!isEmployer}
        />
        
        {/* Partner Portal - visible to trainers only */}
        <SidebarItem 
          icon={<Building />} 
          label="Partnerportaal" 
          to="/partner-portal" 
          active={isActive("/partner-portal")} 
          hidden={!isTrainer}
        />
        
        {/* Settings - visible to employers only */}
        <SidebarItem 
          icon={<Settings />} 
          label="Instellingen" 
          to="/settings" 
          active={isActive("/settings")} 
          hidden={!isEmployer}
        />
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <button 
          className="w-full flex items-center justify-center p-2 rounded-md 
                    bg-sidebar-accent/50 text-white/80 hover:bg-sidebar-accent hover:text-white
                    transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>
    </div>
  );
};
