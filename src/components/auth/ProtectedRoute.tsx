
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

  // Debug log
  console.log("ProtectedRoute:", { 
    isAuthenticated, 
    userRole, 
    allowedRoles, 
    hasAccess: checkAccess(allowedRoles),
    path: location.pathname
  });

  useEffect(() => {
    if (isAuthenticated && !checkAccess(allowedRoles)) {
      toast({
        title: "Toegang geweigerd",
        description: "U heeft geen toegang tot deze pagina.",
        variant: "destructive",
      });
    }
  }, [location.pathname, isAuthenticated, userRole, toast, allowedRoles, checkAccess]);

  // Not authenticated at all - redirect to login
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to role selection");
    return <Navigate to="/role-selection" />;
  }

  // Authenticated but not authorized for this route
  if (!checkAccess(allowedRoles)) {
    console.log("User not authorized for this route, redirecting based on role");
    // Redirect to an appropriate page based on role
    if (userRole === "trainer") {
      return <Navigate to="/partner-portal" />;
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  // User is authenticated and authorized
  return <>{children}</>;
};
