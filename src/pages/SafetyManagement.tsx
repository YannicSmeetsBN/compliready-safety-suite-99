
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Bell, Calendar, ShieldAlert, FileText, AlertTriangle } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const SafetyManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || "pbm");
  
  // Update URL when tab changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('tab', activeTab);
    navigate({ search: newSearchParams.toString() }, { replace: true });
  }, [activeTab, navigate, location.search]);

  // Update active tab when URL changes
  useEffect(() => {
    if (tabFromUrl && ['pbm', 'safety', 'incidents', 'exercises', 'rie', 'bhv'].includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Veiligheidsbeheer</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-6 mb-8">
              <TabsTrigger value="pbm" className="flex items-center gap-2">
                <Bell size={16} />
                <span>PBM's</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <ShieldAlert size={16} />
                <span>Veiligheidsmiddelen</span>
              </TabsTrigger>
              <TabsTrigger value="incidents" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Incidenten</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Oefeningen</span>
              </TabsTrigger>
              <TabsTrigger value="rie" className="flex items-center gap-2">
                <FileText size={16} />
                <span>RI&E Generator</span>
              </TabsTrigger>
              <TabsTrigger value="bhv" className="flex items-center gap-2">
                <Bell size={16} />
                <span>BHV-Oproepsysteem</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pbm" className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
                <h3 className="font-medium mb-2">PBM's - Persoonlijke Beschermingsmiddelen</h3>
                <p>In deze module kunt u alle persoonlijke beschermingsmiddelen beheren die aan uw medewerkers zijn uitgereikt. U kunt uitgiftedatums, vervaldatums en keuringen bijhouden en automatisch gewaarschuwd worden wanneer actie nodig is.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-medium">PBM Overzicht</h3>
                  <Button className="bg-compliblue hover:bg-compliblue/90">Nieuw PBM toevoegen</Button>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow border">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Type PBM</th>
                        <th className="text-left py-3 px-4">Medewerker</th>
                        <th className="text-left py-3 px-4">Uitgiftedatum</th>
                        <th className="text-left py-3 px-4">Vervaldatum</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actie</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Veiligheidshelm</td>
                        <td className="py-3 px-4">Klaas Klaassen</td>
                        <td className="py-3 px-4">01-01-2023</td>
                        <td className="py-3 px-4">01-01-2025</td>
                        <td className="py-3 px-4"><span className="badge-success">Geldig</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Veiligheidsbril</td>
                        <td className="py-3 px-4">Jan Janssen</td>
                        <td className="py-3 px-4">15-06-2023</td>
                        <td className="py-3 px-4">15-06-2024</td>
                        <td className="py-3 px-4"><span className="badge-warning">Keuring vereist</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="safety" className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                <h3 className="font-medium mb-2">Veiligheidsmiddelen</h3>
                <p>Beheer alle veiligheidsmiddelen zoals brandblussers, AED's, noodverlichting en vluchtweg-aanduidingen op al uw locaties. U kunt uitgiftedatums, controle-/keuringsdatums vastleggen en automatische notificaties ontvangen.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-medium">Veiligheidsmiddelen Overzicht</h3>
                  <Button className="bg-compliblue hover:bg-compliblue/90">Nieuw veiligheidsmiddel toevoegen</Button>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow border">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Locatie</th>
                        <th className="text-left py-3 px-4">Installatie datum</th>
                        <th className="text-left py-3 px-4">Keuringsdatum</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actie</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Brandblusser</td>
                        <td className="py-3 px-4">Magazijn</td>
                        <td className="py-3 px-4">15-05-2020</td>
                        <td className="py-3 px-4">15-05-2023</td>
                        <td className="py-3 px-4"><span className="badge-danger">Keuring verlopen</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">AED</td>
                        <td className="py-3 px-4">Receptie</td>
                        <td className="py-3 px-4">01-06-2022</td>
                        <td className="py-3 px-4">01-06-2023</td>
                        <td className="py-3 px-4"><span className="badge-success">Keuring succesvol</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="incidents" className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <h3 className="font-medium mb-2">Incidentenregistratie</h3>
                <p>Registreer en beheer alle veiligheidsincidenten binnen uw organisatie. Voeg details toe zoals datum, tijd, locatie, betrokkenen en upload relevante bijlagen zoals foto's. Het systeem controleert automatisch of meldingen binnen 24 uur zijn gedaan.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-medium">Incidenten Overzicht</h3>
                  <Button className="bg-compliblue hover:bg-compliblue/90">Nieuw incident melden</Button>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow border">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Incident</th>
                        <th className="text-left py-3 px-4">Locatie</th>
                        <th className="text-left py-3 px-4">Datum incident</th>
                        <th className="text-left py-3 px-4">Datum melding</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actie</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Valincident</td>
                        <td className="py-3 px-4">Werkplaats</td>
                        <td className="py-3 px-4">12-06-2023</td>
                        <td className="py-3 px-4">12-06-2023</td>
                        <td className="py-3 px-4"><span className="badge-success">Tijdig gemeld</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Gevaarlijke stof</td>
                        <td className="py-3 px-4">Laboratorium</td>
                        <td className="py-3 px-4">05-06-2023</td>
                        <td className="py-3 px-4">07-06-2023</td>
                        <td className="py-3 px-4"><span className="badge-danger">Te laat gemeld</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <h3 className="font-medium mb-2">Oefeningen</h3>
                <p>Plan, beheer en evalueer alle veiligheidsoefeningen zoals BHV-oefeningen, ontruimingsoefeningen en brandoefeningen. U ontvangt automatisch herinneringen voor geplande oefeningen.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="flex justify-between mb-6">
                  <h3 className="text-lg font-medium">Oefeningen Overzicht</h3>
                  <Button className="bg-compliblue hover:bg-compliblue/90">Nieuwe oefening plannen</Button>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow border">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Type oefening</th>
                        <th className="text-left py-3 px-4">Locatie</th>
                        <th className="text-left py-3 px-4">Datum</th>
                        <th className="text-left py-3 px-4">Deelnemers</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actie</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">BHV Oefening</td>
                        <td className="py-3 px-4">Hoofdkantoor</td>
                        <td className="py-3 px-4">15-07-2023</td>
                        <td className="py-3 px-4">12</td>
                        <td className="py-3 px-4"><span className="badge-info">Gepland</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Ontruimingsoefening</td>
                        <td className="py-3 px-4">Hoofdkantoor</td>
                        <td className="py-3 px-4">22-07-2023</td>
                        <td className="py-3 px-4">35</td>
                        <td className="py-3 px-4"><span className="badge-info">Gepland</span></td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="outline" size="sm">Bekijken</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rie" className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-purple-800">
                <h3 className="font-medium mb-2">RI&E Generator</h3>
                <p>Met behulp van AI en data uit uw HR-systeem kunt u eenvoudig een risico-inventarisatie en -evaluatie (RI&E) genereren. Beantwoord de vragen en ontvang automatisch een rapport met plan van aanpak. Het systeem signaleert verlopen of nieuwe risico's.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-medium">Nieuwe RI&E genereren</h3>
                  <p className="text-gray-600">Beantwoord onderstaande vragen om een RI&E te genereren. Het systeem gebruikt AI om een gepersonaliseerd rapport te maken.</p>
                  
                  <div className="bg-white rounded-lg p-6 shadow border">
                    <h4 className="font-medium mb-4">Vragenlijst</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Wat voor type bedrijf heeft u?</label>
                        <select className="form-input w-full">
                          <option>Selecteer type bedrijf</option>
                          <option>Productiebedrijf</option>
                          <option>Kantooromgeving</option>
                          <option>Zorg</option>
                          <option>Bouw</option>
                          <option>Logistiek</option>
                          <option>Anders</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Hoeveel medewerkers heeft uw bedrijf?</label>
                        <input type="number" className="form-input w-full" placeholder="Aantal medewerkers" />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Welke risicofactoren zijn bij u bekend?</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="factor1" className="mr-2" />
                            <label htmlFor="factor1">Fysieke belasting</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="factor2" className="mr-2" />
                            <label htmlFor="factor2">Gevaarlijke stoffen</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="factor3" className="mr-2" />
                            <label htmlFor="factor3">Machines en apparaten</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="factor4" className="mr-2" />
                            <label htmlFor="factor4">Beeldschermwerk</label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="factor5" className="mr-2" />
                            <label htmlFor="factor5">Werkdruk/stress</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-compliblue hover:bg-compliblue/90">RI&E genereren</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bhv" className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <h3 className="font-medium mb-2">BHV-Oproepsysteem</h3>
                <p>Met het BHV-oproepsysteem kunt u snel en effectief uw BHV-team alarmeren bij een incident. Het systeem registreert wie er is opgeroepen, wie heeft bevestigd en wie daadwerkelijk is gekomen.</p>
              </div>
              
              <div className="shadow rounded-lg border p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 shadow border">
                    <h3 className="text-lg font-medium mb-4">BHV-oproep starten</h3>
                    <p className="text-gray-600 mb-4">Klik op de knop om direct alle BHV'ers op te roepen.</p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Type incident</label>
                        <select className="form-input w-full">
                          <option>Selecteer type incident</option>
                          <option>Brand</option>
                          <option>Medisch incident</option>
                          <option>Ontruiming</option>
                          <option>Overig</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Locatie</label>
                        <select className="form-input w-full">
                          <option>Selecteer locatie</option>
                          <option>Hoofdgebouw - Begane grond</option>
                          <option>Hoofdgebouw - 1e verdieping</option>
                          <option>Hoofdgebouw - 2e verdieping</option>
                          <option>Magazijn</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Extra informatie</label>
                        <textarea className="form-input w-full h-24" placeholder="Beschrijf de situatie..."></textarea>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="bg-red-600 hover:bg-red-700 text-white">BHV-team oproepen</Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 shadow border">
                    <h3 className="text-lg font-medium mb-4">Recente oproepen</h3>
                    <div className="space-y-4">
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Medisch incident</span>
                          <span className="text-sm text-gray-500">15 juni 2023, 14:32</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">Locatie: Hoofdgebouw - 1e verdieping</div>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Opgeroepen: 5</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Bevestigd: 4</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Aanwezig: 3</span>
                        </div>
                      </div>
                      <div className="border-b pb-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Brand</span>
                          <span className="text-sm text-gray-500">2 juni 2023, 09:15</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-600">Locatie: Magazijn</div>
                        <div className="mt-2 flex gap-2">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Opgeroepen: 5</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Bevestigd: 5</span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Aanwezig: 5</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <a href="#" className="text-compliblue hover:underline text-sm">Alle oproepen bekijken →</a>
                    </div>
                  </div>
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
