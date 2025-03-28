import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  PlusCircle, 
  Upload, 
  FilePlus, 
  RefreshCw, 
  UserPlus, 
  Calendar, 
  Search, 
  Download, 
  ChevronRight,
  Clock,
  FileText,
  AlertTriangle,
  Users
} from "lucide-react";

// Demo data for clients
const clientsData = [
  { 
    id: 1, 
    name: "Bouwbedrijf Jansen", 
    employees: 12, 
    activeCertificates: 28,
    expiringCertificates: 3,
    expired: 1,
    status: "Actief",
    contractEnd: "15-08-2023"
  },
  { 
    id: 2, 
    name: "Installatiebedrijf De Vries", 
    employees: 8, 
    activeCertificates: 14,
    expiringCertificates: 2,
    expired: 0,
    status: "Actief",
    contractEnd: "30-11-2023"
  },
  { 
    id: 3, 
    name: "Schildersbedrijf Van Dijk", 
    employees: 5, 
    activeCertificates: 10,
    expiringCertificates: 1,
    expired: 2,
    status: "Inactief",
    contractEnd: "01-02-2023"
  },
  { 
    id: 4, 
    name: "Timmerwerken Bakker", 
    employees: 7, 
    activeCertificates: 12,
    expiringCertificates: 4,
    expired: 0,
    status: "Actief",
    contractEnd: "10-05-2024"
  },
  { 
    id: 5, 
    name: "Stukadoorsbedrijf Pietersen", 
    employees: 4, 
    activeCertificates: 8,
    expiringCertificates: 2,
    expired: 1,
    status: "Actief",
    contractEnd: "22-07-2023"
  }
];

// Demo data for employees
const employeesData = [
  { 
    id: 1, 
    name: "Jan Jansen", 
    function: "Timmerman", 
    certificates: 3,
    expiringCertificates: 1,
    expired: 0,
    lastTraining: "10-05-2023"
  },
  { 
    id: 2, 
    name: "Piet de Vries", 
    function: "Metselaar", 
    certificates: 2,
    expiringCertificates: 0,
    expired: 1,
    lastTraining: "22-03-2023"
  },
  { 
    id: 3, 
    name: "Klaas Bakker", 
    function: "Elektricien", 
    certificates: 4,
    expiringCertificates: 2,
    expired: 0,
    lastTraining: "15-06-2023"
  }
];

// Demo data for trainings
const trainingsData = [
  { 
    id: 1, 
    title: "BHV Basis", 
    date: "15-08-2023", 
    location: "Utrecht",
    participants: 8,
    maxParticipants: 12,
    status: "Gepland"
  },
  { 
    id: 2, 
    title: "VCA VOL", 
    date: "22-08-2023", 
    location: "Amsterdam",
    participants: 10,
    maxParticipants: 15,
    status: "Gepland"
  },
  { 
    id: 3, 
    title: "EHBO Basis", 
    date: "05-09-2023", 
    location: "Rotterdam",
    participants: 6,
    maxParticipants: 10,
    status: "Gepland"
  }
];

// Demo data for expiring certificates
const expiringCertificatesData = [
  { 
    id: 1, 
    employeeName: "Jan Jansen", 
    company: "Bouwbedrijf Jansen",
    certificateType: "BHV Basis", 
    expireDate: "15-08-2023", 
    status: "Verloopt binnen 30 dagen"
  },
  { 
    id: 2, 
    employeeName: "Piet de Vries", 
    company: "Bouwbedrijf Jansen",
    certificateType: "VCA VOL", 
    expireDate: "22-08-2023", 
    status: "Verloopt binnen 30 dagen"
  },
  { 
    id: 3, 
    employeeName: "Klaas Bakker", 
    company: "Installatiebedrijf De Vries",
    certificateType: "Heftruckcertificaat", 
    expireDate: "05-08-2023", 
    status: "Verloopt binnen 30 dagen"
  },
  { 
    id: 4, 
    employeeName: "Sjaak Pietersen", 
    company: "Stukadoorsbedrijf Pietersen",
    certificateType: "EHBO", 
    expireDate: "10-07-2023", 
    status: "Verlopen"
  }
];

const PartnerPortal = () => {
  const [selectedTab, setSelectedTab] = useState("clients");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter clients based on search query
  const filteredClients = clientsData.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle client selection
  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId);
    setSelectedTab("employees");
  };

  // Get filtered employees for selected client
  const clientEmployees = selectedClient 
    ? employeesData.filter(employee => employee.id % 5 === selectedClient % 5) // Just for demo
    : [];

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex justify-between items-center mb-6">
            <h1 className="page-title">Partnerportaal</h1>
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Nieuwe klant aandragen
            </Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="clients">Klantoverzicht</TabsTrigger>
              <TabsTrigger value="employees">Medewerkers per klant</TabsTrigger>
              <TabsTrigger value="trainings">Trainingsplanning</TabsTrigger>
              <TabsTrigger value="certificates">Verlopen certificaten</TabsTrigger>
              <TabsTrigger value="contracts">Contractbeheer</TabsTrigger>
            </TabsList>

            {/* Klantoverzicht */}
            <TabsContent value="clients">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Klanten</CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Zoek klanten..."
                          className="pl-8 w-64"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        CSV Importeren
                      </Button>
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nieuwe klant
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Overzicht van uw klanten en hun certificaatstatus
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Klantnaam</TableHead>
                        <TableHead>Aantal medewerkers</TableHead>
                        <TableHead>Actieve certificaten</TableHead>
                        <TableHead>Bijna verlopen</TableHead>
                        <TableHead>Verlopen</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contract tot</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client) => (
                        <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleClientSelect(client.id)}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.employees}</TableCell>
                          <TableCell>{client.activeCertificates}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              {client.expiringCertificates}
                            </span>
                          </TableCell>
                          <TableCell>
                            {client.expired > 0 ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                {client.expired}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                0
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              client.status === "Actief" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {client.status}
                            </span>
                          </TableCell>
                          <TableCell>{client.contractEnd}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Klantstatistieken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Totaal aantal klanten</span>
                        <span className="font-medium">{clientsData.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Actieve klanten</span>
                        <span className="font-medium text-green-600">
                          {clientsData.filter(c => c.status === "Actief").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Inactieve klanten</span>
                        <span className="font-medium text-gray-500">
                          {clientsData.filter(c => c.status === "Inactief").length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contracten bijna verlopen (30 dagen)</span>
                        <span className="font-medium text-orange-600">3</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Certificaatstatus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Totaal aantal certificaten</span>
                        <span className="font-medium">
                          {clientsData.reduce((sum, client) => sum + client.activeCertificates, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bijna verlopen certificaten</span>
                        <span className="font-medium text-orange-600">
                          {clientsData.reduce((sum, client) => sum + client.expiringCertificates, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verlopen certificaten</span>
                        <span className="font-medium text-red-600">
                          {clientsData.reduce((sum, client) => sum + client.expired, 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Snelle acties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="mr-2 h-4 w-4" />
                      CSV Importeren
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Exporteer klantenlijst
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Training inplannen
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Verlopen certificaten rapport
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Medewerkers per klant */}
            <TabsContent value="employees">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {selectedClient ? clientsData.find(c => c.id === selectedClient)?.name : "Medewerkers"}
                      </CardTitle>
                      <CardDescription>
                        {selectedClient ? "Medewerkers en certificaten" : "Selecteer een klant om medewerkers te bekijken"}
                      </CardDescription>
                    </div>
                    {selectedClient && (
                      <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Certificaten uploaden
                        </Button>
                        <Button size="sm">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Medewerker toevoegen
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedClient ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Naam</TableHead>
                          <TableHead>Functie</TableHead>
                          <TableHead>Certificaten</TableHead>
                          <TableHead>Bijna verlopen</TableHead>
                          <TableHead>Verlopen</TableHead>
                          <TableHead>Laatste training</TableHead>
                          <TableHead className="text-right">Acties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clientEmployees.map((employee) => (
                          <TableRow key={employee.id}>
                            <TableCell className="font-medium">{employee.name}</TableCell>
                            <TableCell>{employee.function}</TableCell>
                            <TableCell>{employee.certificates}</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                {employee.expiringCertificates}
                              </span>
                            </TableCell>
                            <TableCell>
                              {employee.expired > 0 ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  {employee.expired}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  0
                                </span>
                              )}
                            </TableCell>
                            <TableCell>{employee.lastTraining}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                <FileText className="mr-2 h-4 w-4" />
                                Certificaten
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <div className="mx-auto mb-4 bg-muted w-16 h-16 rounded-full flex items-center justify-center">
                        <Users size={24} className="text-muted-foreground" />
                      </div>
                      <p>Selecteer een klant om medewerkers te bekijken</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedTab("clients")} 
                        className="mt-4"
                      >
                        Ga naar klantenoverzicht
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trainingsplanning */}
            <TabsContent value="trainings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Trainingsplanning</CardTitle>
                      <CardDescription>Plan en beheer trainingen voor uw klanten</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        CSV Importeren
                      </Button>
                      <Button size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Training toevoegen
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Training</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Locatie</TableHead>
                        <TableHead>Deelnemers</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trainingsData.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">{training.title}</TableCell>
                          <TableCell>{training.date}</TableCell>
                          <TableCell>{training.location}</TableCell>
                          <TableCell>{training.participants} / {training.maxParticipants}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {training.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              <Users className="mr-2 h-4 w-4" />
                              Deelnemers
                            </Button>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Wijzigen
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trainingsstatistieken</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Geplande trainingen</span>
                        <span className="font-medium">{trainingsData.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Totaal aantal deelnemers</span>
                        <span className="font-medium">
                          {trainingsData.reduce((sum, training) => sum + training.participants, 0)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Beschikbare plaatsen</span>
                        <span className="font-medium text-green-600">
                          {trainingsData.reduce((sum, training) => sum + (training.maxParticipants - training.participants), 0)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Trainingsbehoeften</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">BHV Hercertificering nodig</span>
                        <span className="font-medium text-orange-600">5 medewerkers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VCA VOL vernieuwen</span>
                        <span className="font-medium text-orange-600">3 medewerkers</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">EHBO basistraining</span>
                        <span className="font-medium text-orange-600">4 medewerkers</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Snelle acties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Training inplannen
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="mr-2 h-4 w-4" />
                      Hercertificeringsplanning
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      Exporteer trainingsplan
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Verlopen certificaten */}
            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Verlopen certificaten</CardTitle>
                      <CardDescription>Overzicht van bijna verlopen en verlopen certificaten</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Zoek certificaten..."
                          className="pl-8 w-64"
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Certificaat uploaden
                      </Button>
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Exporteren
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Medewerker</TableHead>
                        <TableHead>Bedrijf</TableHead>
                        <TableHead>Certificaattype</TableHead>
                        <TableHead>Vervaldatum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expiringCertificatesData.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-medium">{certificate.employeeName}</TableCell>
                          <TableCell>{certificate.company}</TableCell>
                          <TableCell>{certificate.certificateType}</TableCell>
                          <TableCell>{certificate.expireDate}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              certificate.status.includes("Verlopen") 
                                ? "bg-red-100 text-red-800" 
                                : "bg-orange-100 text-orange-800"
                            }`}>
                              {certificate.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Training plannen
                            </Button>
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Certificaat vervangen
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contractbeheer */}
            <TabsContent value="contracts">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Contractbeheer</CardTitle>
                      <CardDescription>Beheer de contracten van uw klanten</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Contract toevoegen
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Actieve contracten</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-green-600">8</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verlenging binnen 30 dagen</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-orange-500">3</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verlopen contracten</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-red-600">1</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Klantnaam</TableHead>
                        <TableHead>Startdatum</TableHead>
                        <TableHead>Einddatum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Contracttype</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientsData.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>01-01-2023</TableCell>
                          <TableCell>{client.contractEnd}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              client.status === "Actief" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {client.status}
                            </span>
                          </TableCell>
                          <TableCell>Jaarcontract</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Verlengen
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PartnerPortal;
