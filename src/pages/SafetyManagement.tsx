
import { useState } from "react";
import { useParams, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Shield, 
  HandMetal, 
  FileText, 
  AlertTriangle, 
  Calendar,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import PPEOverview from "@/components/safety/PPEOverview";
import PPEDetail from "@/components/safety/PPEDetail";

const SafetyManagement = () => {
  const [locationFilter, setLocationFilter] = useState('all');
  
  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content relative">
          <h1 className="page-title">Veiligheidsbeheer</h1>
          
          <div className="space-y-8 pb-20">
            {/* PBM's Section - Updated to use the component */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <HandMetal className="h-6 w-6 text-compliblue" />
                  <span>Persoonlijke Beschermingsmiddelen (PBM's)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Routes>
                  <Route path="/" element={<PPEOverview />} />
                  <Route path="/ppe/:ppeId" element={<PPEDetail />} />
                </Routes>
              </CardContent>
            </Card>

            {/* Algemene Veiligheidsmiddelen Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-compliblue" />
                  <span>Algemene Veiligheidsmiddelen</span>
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div>
                    <select 
                      className="form-select border border-gray-300 rounded-md px-3 py-1.5 text-sm"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    >
                      <option value="all">Alle locaties</option>
                      <option value="magazijn">Magazijn</option>
                      <option value="kantoor">Kantoor</option>
                      <option value="receptie">Receptie</option>
                    </select>
                  </div>
                  <Button className="bg-compliblue hover:bg-compliblue/90">
                    Nieuw veiligheidsmiddel toevoegen
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg shadow border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Middel</TableHead>
                        <TableHead>Locatie</TableHead>
                        <TableHead>Keuringsdatum</TableHead>
                        <TableHead>Vervaldatum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Brandblusser</TableCell>
                        <TableCell>Magazijn</TableCell>
                        <TableCell>15-05-2020</TableCell>
                        <TableCell>15-05-2023</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Keuring verlopen
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Bewerken</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Verwijderen</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>AED</TableCell>
                        <TableCell>Receptie</TableCell>
                        <TableCell>01-06-2022</TableCell>
                        <TableCell>01-06-2023</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Keuring succesvol
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">Bewerken</Button>
                            <Button variant="outline" size="sm" className="text-red-500">Verwijderen</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Incidentenregistratie Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-compliblue" />
                  <span>Incidentenregistratie</span>
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90">
                  Nieuw incident melden
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg shadow border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Datum</TableHead>
                        <TableHead>Tijd</TableHead>
                        <TableHead>Locatie</TableHead>
                        <TableHead>Betrokkenen</TableHead>
                        <TableHead>Beschrijving</TableHead>
                        <TableHead>Bijlage</TableHead>
                        <TableHead>Actie ondernomen</TableHead>
                        <TableHead className="text-right">Opties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>12-06-2023</TableCell>
                        <TableCell>14:30</TableCell>
                        <TableCell>Werkplaats</TableCell>
                        <TableCell>Klaas Klaassen</TableCell>
                        <TableCell>Valincident vanaf ladder</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-500">Bekijken</Button>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ja
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Bekijken/Bewerken</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>05-06-2023</TableCell>
                        <TableCell>10:15</TableCell>
                        <TableCell>Laboratorium</TableCell>
                        <TableCell>Jan Janssen</TableCell>
                        <TableCell>Morsen gevaarlijke stof</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="text-blue-500">Bekijken</Button>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Ja
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Bekijken/Bewerken</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Oefeningen Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-compliblue" />
                  <span>Oefeningen</span>
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90">
                  Nieuwe oefening registreren
                </Button>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-lg shadow border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type oefening</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Locatie</TableHead>
                        <TableHead>Betrokken medewerkers</TableHead>
                        <TableHead>Resultaat/Evaluatie</TableHead>
                        <TableHead className="text-right">Actie</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>BHV Oefening</TableCell>
                        <TableCell>15-07-2023</TableCell>
                        <TableCell>Hoofdkantoor</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>Nog niet afgerond</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Bekijken/Bewerken</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ontruimingsoefening</TableCell>
                        <TableCell>22-07-2023</TableCell>
                        <TableCell>Hoofdkantoor</TableCell>
                        <TableCell>35</TableCell>
                        <TableCell>Nog niet afgerond</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Bekijken/Bewerken</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brandoefening</TableCell>
                        <TableCell>10-05-2023</TableCell>
                        <TableCell>Magazijn</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>Succesvol afgerond</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm">Bekijken/Bewerken</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Scroll to top button */}
          <Button 
            onClick={scrollToTop} 
            className="fixed bottom-6 right-6 h-10 w-10 rounded-full p-0 bg-compliblue hover:bg-compliblue/90"
            aria-label="Scroll naar boven"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
        </main>
      </div>
    </div>
  );
};

export default SafetyManagement;
