
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  userRole: string | null;
  userName: string | null;
  userLocation: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  checkAccess: (allowedRoles: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");
    const location = localStorage.getItem("userLocation");
    
    if (role) {
      setUserRole(role);
      setUserName(name);
      setUserLocation(location);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userLocation");
    setUserRole(null);
    setUserName(null);
    setUserLocation(null);
    setIsAuthenticated(false);
    navigate("/role-selection");
  };

  const checkAccess = (allowedRoles: string[]) => {
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
  };

  return (
    <AuthContext.Provider value={{ 
      userRole, 
      userName, 
      userLocation,
      isAuthenticated, 
      logout, 
      checkAccess 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
