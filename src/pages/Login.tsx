
import { LoginForm } from "@/components/auth/LoginForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Linker kant: Welkomstgrafiek */}
      <div className="bg-compliblue md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="max-w-md text-white">
          <div className="bg-white rounded-lg p-4 mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/b36d3195-cd4b-4ea0-ab55-b03b2988fa84.png" 
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
      
      {/* Rechter kant: Login formulier */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-compliblue mb-2">Welkom terug</h2>
            <p className="text-gray-500">Log in op uw CompliReady account</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
