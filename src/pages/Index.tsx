
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // If already authenticated, route based on role
      if (userRole === "trainer") {
        navigate("/partner-portal");
      } else {
        navigate("/dashboard");
      }
    } else {
      // Not authenticated, go to role selection
      navigate("/role-selection");
    }
  }, [navigate, isAuthenticated, userRole]);

  return null;
};

export default Index;
