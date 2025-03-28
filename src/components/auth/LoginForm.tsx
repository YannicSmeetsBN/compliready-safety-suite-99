
import { useState } from "react";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuleer login proces
    setTimeout(() => {
      setLoading(false);
      
      // Demo-login voor nu met vaste credentials
      if (email === "admin@compliready.nl" && password === "admin") {
        toast({
          title: "Ingelogd!",
          description: "U bent succesvol ingelogd.",
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
        {loading ? "Inloggen..." : "Inloggen"}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        <span>Voor demo-doeleinden gebruik: </span>
        <span className="font-medium">admin@compliready.nl / admin</span>
      </div>
    </form>
  );
};
