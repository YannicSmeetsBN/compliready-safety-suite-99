
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  UserPlus, 
  Upload, 
  ChevronLeft, 
  Calendar, 
  FileText, 
  RefreshCw, 
  Users,
  Building,
  Phone,
  Mail,
  User
} from "lucide-react";

// Demo data voor klanten
const clientsData = [
  { 
    id: 1, 
    name: "Bouwbedrijf Jansen", 
    address: "Bouwstraat 123, 1234 AB Amsterdam",
    contactPerson: "Pieter Jansen",
    phone: "020-1234567",
    email: "info@bouwbedrijfjansen.nl",
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
    address: "Installatieweg 45, 5678 CD Rotterdam",
    contactPerson: "Mark de Vries",
    phone: "010-7654321",
    email: "info@installatiebedrijfdevries.nl",
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
    address: "Verfstraat 67, 9876 EF Utrecht",
    contactPerson: "Hans van Dijk",
    phone: "030-9876543",
    email: "info@schildersvandijk.nl",
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
    address: "Houtlaan 89, 2468 GH Eindhoven",
    contactPerson: "Jan Bakker",
    phone: "040-1357924",
    email: "info@timmerwerken-bakker.nl",
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
    address: "Pleisterweg 12, 1357 IJ Groningen",
    contactPerson: "Klaas Pietersen",
    phone: "050-2468013",
    email: "info@stukadoorspietersen.nl",
    employees: 4, 
    activeCertificates: 8,
    expiringCertificates: 2,
    expired: 1,
    status: "Actief",
    contractEnd: "22-07-2023"
  }
];

// Demo data voor medewerkers
const employeesData = [
  { 
    id: 1, 
    clientId: 1,
    name: "Jan Jansen", 
    function: "Timmerman", 
    certificates: [
      { name: "VCA Basis", expireDate: "15-09-2023", status: "Actief" },
      { name: "BHV", expireDate: "20-07-2023", status: "Bijna verlopen" },
      { name: "Hoogwerker", expireDate: "10-12-2023", status: "Actief" }
    ],
    lastTraining: "10-05-2023"
  },
  { 
    id: 2, 
    clientId: 1,
    name: "Piet de Vries", 
    function: "Metselaar", 
    certificates: [
      { name: "VCA VOL", expireDate: "05-10-2023", status: "Actief" },
      { name: "EHBO", expireDate: "01-06-2023", status: "Verlopen" }
    ],
    lastTraining: "22-03-2023"
  },
  { 
    id: 3, 
    clientId: 2,
    name: "Klaas Bakker", 
    function: "Elektricien", 
    certificates: [
      { name: "VCA Basis", expireDate: "22-11-2023", status: "Actief" },
      { name: "NEN 3140", expireDate: "18-08-2023", status: "Bijna verlopen" },
      { name: "Hoogspanning", expireDate: "30-09-2023", status: "Actief" },
      { name: "BHV", expireDate: "15-07-2023", status: "Bijna verlopen" }
    ],
    lastTraining: "15-06-2023"
  },
  { 
    id: 4, 
    clientId: 3,
    name: "Willem Willems", 
    function: "Schilder", 
    certificates: [
      { name: "VCA Basis", expireDate: "10-01-2023", status: "Verlopen" },
      { name: "Werken op hoogte", expireDate: "25-08-2023", status: "Actief" }
    ],
    lastTraining: "05-12-2022"
  },
  { 
    id: 5, 
    clientId: 4,
    name: "Theo Theunissen", 
    function: "Timmerman", 
    certificates: [
      { name: "VCA VOL", expireDate: "30-11-2023", status: "Actief" },
      { name: "BHV", expireDate: "22-09-2023", status: "Actief" },
      { name: "Hoogwerker", expireDate: "15-07-2023", status: "Bijna verlopen" }
    ],
    lastTraining: "10-04-2023"
  }
];

// Demo data voor geplande trainingen per klant
const clientTrainingsData = [
  { 
    id: 1, 
    clientId: 1,
    title: "BHV Herhaling", 
    date: "20-08-2023", 
    location: "Amsterdam",
    participants: 4,
    maxParticipants: 8,
    status: "Gepland"
  },
  { 
    id: 2, 
    clientId: 1,
    title: "VCA Basis", 
    date: "15-09-2023", 
    location: "Amsterdam",
    participants: 2,
    maxParticipants: 6,
    status: "Gepland"
  },
  { 
    id: 3, 
    clientId: 2,
    title: "NEN 3140", 
    date: "10-08-2023", 
    location: "Rotterdam",
    participants: 3,
    maxParticipants: 5,
    status: "Gepland"
  },
  { 
    id: 4, 
    clientId: 4,
    title: "Hoogwerker training", 
    date: "05-09-2023", 
    location: "Eindhoven",
    participants: 2,
    maxParticipants: 4,
    status: "Gepland"
  }
];

const ClientDetail = () => {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const id = Number(clientId);
  const [activeTab, setActiveTab] = useState("employees");
  
  // Vind de klantgegevens
  const client = clientsData.find(c => c.id === id);
  
  // Filter medewerkers voor de geselecteerde klant
  const clientEmployees = employeesData.filter(employee => employee.clientId === id);
  
  // Filter trainingen voor de geselecteerde klant
  const clientTrainings = clientTrainingsData.filter(training => training.clientId === id);
  
  if (!client) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="main-content">
            <div className="text-center py-10">
              <h1 className="text-2xl font-bold mb-4">Klant niet gevonden</h1>
              <Button onClick={() => navigate("/partner-portal")}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Terug naar klantenoverzicht
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => navigate("/partner-portal")}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Terug
            </Button>
            <h1 className="page-title mb-0">{client.name}</h1>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              client.status === "Actief" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
            }`}>
              {client.status}
            </span>
          </div>
          
          {/* Klantgegevens */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Klantgegevens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-muted-foreground">{client.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Contactpersoon</p>
                      <p className="text-muted-foreground">{client.contactPerson}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Telefoonnummer</p>
                      <p className="text-muted-foreground">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">E-mailadres</p>
                      <p className="text-muted-foreground">{client.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Medewerkers en trainingen */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="employees">Medewerkers</TabsTrigger>
              <TabsTrigger value="trainings">Geplande trainingen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="employees" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Medewerkers en certificaten</CardTitle>
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
                  </div>
                  <CardDescription>
                    Overzicht van medewerkers en hun certificaten
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clientEmployees.length > 0 ? (
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
                        {clientEmployees.map((employee) => {
                          const expiringCount = employee.certificates.filter(c => c.status === "Bijna verlopen").length;
                          const expiredCount = employee.certificates.filter(c => c.status === "Verlopen").length;
                          
                          return (
                            <TableRow key={employee.id}>
                              <TableCell className="font-medium">{employee.name}</TableCell>
                              <TableCell>{employee.function}</TableCell>
                              <TableCell>{employee.certificates.length}</TableCell>
                              <TableCell>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                  {expiringCount}
                                </span>
                              </TableCell>
                              <TableCell>
                                {expiredCount > 0 ? (
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    {expiredCount}
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
                          );
                        })}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>Geen medewerkers gevonden voor deze klant.</p>
                      <Button 
                        size="sm"
                        onClick={() => {}} 
                        className="mt-4"
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Medewerker toevoegen
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trainings" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Geplande trainingen</CardTitle>
                    <Button size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Training toevoegen
                    </Button>
                  </div>
                  <CardDescription>
                    Overzicht van geplande trainingen voor deze klant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {clientTrainings.length > 0 ? (
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
                        {clientTrainings.map((training) => (
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
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>Geen geplande trainingen gevonden voor deze klant.</p>
                      <Button 
                        size="sm"
                        onClick={() => {}} 
                        className="mt-4"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Training toevoegen
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ClientDetail;
