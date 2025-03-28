
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Users, 
  FileText, 
  BarChart, 
  Settings,
  Search,
  Bell
} from "lucide-react";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active: boolean;
};

const SidebarItem = ({ icon, label, to, active }: SidebarItemProps) => {
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
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div 
      className={`bg-sidebar h-screen fixed left-0 top-0 z-40 
      ${collapsed ? "w-20" : "w-64"} 
      transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex justify-center mb-6">
        <img 
          src="/lovable-uploads/15826a76-cfbc-4fe6-8dc7-444e40b68e3e.png" 
          alt="CompliReady Logo" 
          className={`${collapsed ? "w-12" : "w-36"} transition-all duration-300`}
        />
      </div>

      <div className="flex-1 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        <SidebarItem 
          icon={<Home />} 
          label="Dashboard" 
          to="/dashboard" 
          active={isActive("/dashboard")} 
        />
        <SidebarItem 
          icon={<Users />} 
          label="Medewerkers" 
          to="/employees" 
          active={isActive("/employees")} 
        />
        <SidebarItem 
          icon={<FileText />} 
          label="Certificaten" 
          to="/certificates" 
          active={isActive("/certificates")} 
        />
        <SidebarItem 
          icon={<Bell />} 
          label="Veiligheidsbeheer" 
          to="/safety" 
          active={isActive("/safety")} 
        />
        <SidebarItem 
          icon={<BarChart />} 
          label="Rapportages" 
          to="/reports" 
          active={isActive("/reports")} 
        />
        <SidebarItem 
          icon={<Settings />} 
          label="Instellingen" 
          to="/settings" 
          active={isActive("/settings")} 
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
