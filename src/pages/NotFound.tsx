
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <h1 className="text-6xl font-bold text-compliblue mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oeps! Pagina niet gevonden</p>
        <p className="text-gray-500 mb-8">
          Het lijkt erop dat de pagina die u zoekt niet bestaat of is verplaatst.
        </p>
        <Button asChild className="bg-compliblue hover:bg-compliblue/90">
          <a href="/dashboard" className="flex items-center">
            <Home className="mr-2" size={18} />
            Terug naar Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
