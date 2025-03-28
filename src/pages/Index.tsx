
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    // Added console logs for debugging
    console.log("Index page mounted, auth status:", { isAuthenticated, userRole });
    
    if (isAuthenticated) {
      // If already authenticated, route based on role
      if (userRole === "trainer") {
        console.log("Redirecting trainer to partner portal");
        navigate("/partner-portal");
      } else {
        console.log("Redirecting to dashboard");
        navigate("/dashboard");
      }
    } else {
      // Not authenticated, go to role selection
      console.log("Not authenticated, redirecting to role selection");
      navigate("/role-selection");
    }
  }, [navigate, isAuthenticated, userRole]);

  return null;
};

export default Index;
