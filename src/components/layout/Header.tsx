
import { useState } from "react";
import { Bell, Search, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [notifications, setNotifications] = useState(3);
  const { userName, userRole, logout } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Zoeken..."
          className="pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-compliblue focus:bg-white transition-colors"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-compliorange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaties</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium text-sm">BHV-certificaat verlopen</p>
                  <p className="text-xs text-gray-500">Jan Janssen - 2 dagen geleden</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium text-sm">VCA keuring bijna verlopen</p>
                  <p className="text-xs text-gray-500">Afdeling Productie - 1 dag geleden</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div>
                  <p className="font-medium text-sm">Ontruimingsoefening gepland</p>
                  <p className="text-xs text-gray-500">Hoofdkantoor - Vandaag</p>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">
              <button className="text-compliblue hover:underline text-sm">
                Alle notificaties bekijken
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 hover:bg-gray-100 rounded-full p-1 pr-3 transition-colors">
              <div className="w-8 h-8 bg-compliblue rounded-full flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="font-medium text-sm">{userName || "Gebruiker"}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>
                <p>{userName || "Gebruiker"}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole || "Gast"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profiel</DropdownMenuItem>
            <DropdownMenuItem>Instellingen</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Uitloggen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
