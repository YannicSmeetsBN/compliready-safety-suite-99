
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Bell, Calendar, ShieldAlert, FileText } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const SafetyManagement = () => {
  const [activeTab, setActiveTab] = useState("pbm");
  
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Veiligheidsbeheer</h1>
          
          <Tabs defaultValue="pbm" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="pbm" className="flex items-center gap-2">
                <Bell size={16} />
                <span>PBM's</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>Veiligheidsmiddelen</span>
              </TabsTrigger>
              <TabsTrigger value="incidents" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Incidenten</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Oefeningen</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pbm" className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <h3 className="font-medium mb-2">PBM's - Persoonlijke Beschermingsmiddelen</h3>
                <p>In deze module kunt u alle persoonlijke beschermingsmiddelen beheren die aan uw medewerkers zijn uitgereikt. U kunt vervaldatums en keuringen bijhouden en automatisch gewaarschuwd worden wanneer actie nodig is.</p>
              </div>
              
              <div className="shadow rounded-lg border">
                <div className="p-6 text-center text-gray-500">
                  <p>Deze functie is beschikbaar in de volledige versie.</p>
                  <p className="mt-2">Hier wordt een overzicht getoond van alle PBM's, hun status en keuringsdata.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                <h3 className="font-medium mb-2">Veiligheidsmiddelen</h3>
                <p>Beheer alle veiligheidsmiddelen zoals brandblussers, AED's, noodverlichting en vluchtweg-aanduidingen op al uw locaties. Ontvang automatische notificaties over benodigde keuringen en onderhoud.</p>
              </div>
              
              <div className="shadow rounded-lg border">
                <div className="p-6 text-center text-gray-500">
                  <p>Deze functie is beschikbaar in de volledige versie.</p>
                  <p className="mt-2">Hier wordt een overzicht getoond van alle veiligheidsmiddelen, hun locaties en keuringsdata.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incidents" className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <h3 className="font-medium mb-2">Incidentenregistratie</h3>
                <p>Registreer en beheer alle veiligheidsincidenten binnen uw organisatie. Voeg details toe zoals datum, tijd, locatie, betrokkenen en upload relevante bijlagen zoals foto's.</p>
              </div>
              
              <div className="shadow rounded-lg border">
                <div className="p-6 text-center text-gray-500">
                  <p>Deze functie is beschikbaar in de volledige versie.</p>
                  <p className="mt-2">Hier wordt een overzicht getoond van alle geregistreerde incidenten en hun status.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <h3 className="font-medium mb-2">Oefeningen</h3>
                <p>Plan, beheer en evalueer alle veiligheidsoefeningen zoals BHV-oefeningen, ontruimingsoefeningen en brandoefeningen. Ontvang herinneringen voor geplande oefeningen.</p>
              </div>
              
              <div className="shadow rounded-lg border">
                <div className="p-6 text-center text-gray-500">
                  <p>Deze functie is beschikbaar in de volledige versie.</p>
                  <p className="mt-2">Hier wordt een overzicht getoond van alle geplande en afgeronde oefeningen.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default SafetyManagement;
