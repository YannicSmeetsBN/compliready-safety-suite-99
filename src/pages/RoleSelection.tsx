import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Building } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    // Store the selected role in localStorage
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side: Welcome graphic - same as in Index.tsx */}
      <div className="bg-compliblue md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="max-w-md text-white">
          <div className="bg-compliblue rounded-lg p-4 mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/aad942cf-5d2b-4814-bbc7-510d090a7942.png" 
              alt="CompliReady Logo" 
              className="w-64"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">
            Alles-in-één oplossing voor werkgevers
          </h1>
          <p className="text-white/80 mb-6">
            CompliReady stelt bedrijven in staat om al hun certificaten, PBM's, veiligheidsmiddelen, 
            incidenten en oefeningen te registreren, te beheren en te monitoren.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Certificaatbeheer</h3>
              <p className="text-white/70 text-sm">Beheer al uw certificaten op één plek</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Veiligheidsbeheer</h3>
              <p className="text-white/70 text-sm">PBM's, veiligheidsmiddelen en incidenten</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Automatische signalering</h3>
              <p className="text-white/70 text-sm">Nooit meer een verlopen certificaat</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <h3 className="font-bold text-lg">Rapportages</h3>
              <p className="text-white/70 text-sm">Voor audits en managementinformatie</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side: Role selection */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-compliblue mb-2">Welkom bij CompliReady</h2>
            <p className="text-gray-500">Selecteer uw rol om door te gaan</p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-6"
              variant="outline"
              onClick={() => handleRoleSelect("employee")}
            >
              <Users className="mr-2 text-compliblue" />
              <span>Inloggen als medewerker</span>
            </Button>
            
            <Button 
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-6"
              variant="outline"
              onClick={() => handleRoleSelect("trainer")}
            >
              <BookOpen className="mr-2 text-compliblue" />
              <span>Inloggen als opleider</span>
            </Button>
            
            <Button 
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 py-6"
              variant="outline"
              onClick={() => handleRoleSelect("employer")}
            >
              <Building className="mr-2 text-compliblue" />
              <span>Inloggen als werkgever</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
