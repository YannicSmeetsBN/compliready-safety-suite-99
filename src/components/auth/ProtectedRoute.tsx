
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole, checkAccess } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated && !checkAccess(allowedRoles)) {
      toast({
        title: "Toegang geweigerd",
        description: "U heeft geen toegang tot deze pagina.",
        variant: "destructive",
      });
    }
  }, [location.pathname, isAuthenticated, userRole, toast, allowedRoles, checkAccess]);

  // Not authenticated at all
  if (!isAuthenticated) {
    return <Navigate to="/role-selection" />;
  }

  // Authenticated but not authorized for this route
  if (!checkAccess(allowedRoles)) {
    // Redirect to an appropriate page based on role
    if (userRole === "trainer") {
      return <Navigate to="/partner-portal" />;
    } else if (userRole === "employee") {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  return <>{children}</>;
};
