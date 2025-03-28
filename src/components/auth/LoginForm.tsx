
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the selected role from localStorage
    const role = localStorage.getItem("selectedRole");
    if (!role) {
      navigate("/role-selection");
      return;
    }
    setSelectedRole(role);
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      
      // Check credentials based on the selected role
      if (selectedRole === "employee" && email === "employee@compliready.nl" && password === "employee") {
        localStorage.setItem("userRole", "employee");
        localStorage.setItem("userName", "Jan Jansen");
        localStorage.setItem("userLocation", "Hoofdkantoor");
        toast({
          title: "Ingelogd als medewerker!",
          description: "U bent succesvol ingelogd als medewerker.",
        });
        navigate("/dashboard");
      } else if (selectedRole === "trainer" && email === "trainer@compliready.nl" && password === "trainer") {
        localStorage.setItem("userRole", "trainer");
        localStorage.setItem("userName", "Piet Opleider");
        localStorage.setItem("userLocation", "Opleidingscentrum");
        toast({
          title: "Ingelogd als opleider!",
          description: "U bent succesvol ingelogd als opleider.",
        });
        navigate("/partner-portal");
      } else if (selectedRole === "employer" && email === "admin@compliready.nl" && password === "admin") {
        localStorage.setItem("userRole", "employer");
        localStorage.setItem("userName", "Admin");
        localStorage.setItem("userLocation", "Hoofdkantoor");
        toast({
          title: "Ingelogd als werkgever!",
          description: "U bent succesvol ingelogd als werkgever.",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login mislukt",
          description: "Ongeldige inloggegevens. Probeer opnieuw.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  // Helper function to get role-specific credentials
  const getRoleCredentials = () => {
    switch(selectedRole) {
      case "employee":
        return "employee@compliready.nl / employee";
      case "trainer":
        return "trainer@compliready.nl / trainer";
      case "employer":
        return "admin@compliready.nl / admin";
      default:
        return "";
    }
  };

  const getRoleName = () => {
    switch(selectedRole) {
      case "employee":
        return "medewerker";
      case "trainer":
        return "opleider";
      case "employer":
        return "werkgever";
      default:
        return "";
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 w-full max-w-md">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mailadres</Label>
          <Input
            id="email"
            type="email"
            placeholder="uw@email.nl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Wachtwoord</Label>
            <a 
              href="#" 
              className="text-sm text-compliblue hover:underline"
            >
              Wachtwoord vergeten?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember" className="text-sm font-normal">
            Onthoud mij
          </Label>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-compliblue hover:bg-compliblue/90" 
        disabled={loading}
      >
        {loading ? "Inloggen..." : `Inloggen als ${getRoleName()}`}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        <span>Voor demo-doeleinden gebruik: </span>
        <span className="font-medium">{getRoleCredentials()}</span>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={() => navigate("/role-selection")}
          className="text-sm text-compliblue hover:underline"
        >
          Terug naar rolselectie
        </button>
      </div>
    </form>
  );
};
