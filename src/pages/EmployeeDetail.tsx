
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  ChevronLeft, 
  FileText, 
  User, 
  Bell, 
  Calendar, 
  BookOpen, 
  Edit,
  Trash,
  Download
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Demo data mapping - would come from a real API/backend in production
const employees = [
  {
    id: "1",
    name: "Jan Janssen",
    function: "Technicus",
    department: "Technische dienst",
    email: "jan.janssen@example.com",
    phone: "06-12345678",
    birthDate: "15-05-1985",
    startDate: "01-03-2018",
    certificateStatus: "active",
    pbmStatus: "active",
    personalInfo: {
      address: "Hoofdstraat 123",
      postalCode: "1234 AB",
      city: "Amsterdam",
      emergencyContact: "Marie Janssen (vrouw)",
      emergencyPhone: "06-87654321",
    }
  },
  {
    id: "2",
    name: "Pieter Pietersen",
    function: "Teamleider",
    department: "Productie",
    email: "pieter.pietersen@example.com",
    phone: "06-23456789",
    birthDate: "22-07-1979",
    startDate: "15-09-2015",
    certificateStatus: "active",
    pbmStatus: "expiring",
    personalInfo: {
      address: "Kerkstraat 45",
      postalCode: "5678 CD",
      city: "Rotterdam",
      emergencyContact: "Jolanda Pietersen (vrouw)",
      emergencyPhone: "06-98765432",
    }
  },
  {
    id: "3",
    name: "Maria Willemsen",
    function: "HR Manager",
    department: "HR",
    email: "maria.willemsen@example.com",
    phone: "06-34567890",
    birthDate: "03-11-1982",
    startDate: "01-06-2019",
    certificateStatus: "expired",
    pbmStatus: "active",
    personalInfo: {
      address: "Stationsweg 67",
      postalCode: "9012 EF",
      city: "Utrecht",
      emergencyContact: "Thomas Willemsen (man)",
      emergencyPhone: "06-09876543",
    }
  },
  {
    id: "4",
    name: "Klaas Klaassen",
    function: "Magazijnmedewerker",
    department: "Logistiek",
    email: "klaas.klaassen@example.com",
    phone: "06-45678901",
    birthDate: "18-02-1990",
    startDate: "12-04-2020",
    certificateStatus: "active",
    pbmStatus: "active",
    personalInfo: {
      address: "Marktplein 12",
      postalCode: "3456 GH",
      city: "Groningen",
      emergencyContact: "Sandra Klaassen (zus)",
      emergencyPhone: "06-21098765",
    }
  },
  {
    id: "5",
    name: "Sophie Jansen",
    function: "Front Office Medewerker",
    department: "Receptie",
    email: "sophie.jansen@example.com",
    phone: "06-56789012",
    birthDate: "29-09-1992",
    startDate: "01-12-2021",
    certificateStatus: "expiring",
    pbmStatus: "active",
    personalInfo: {
      address: "Parkweg 89",
      postalCode: "7890 IJ",
      city: "Den Haag",
      emergencyContact: "Peter Jansen (vader)",
      emergencyPhone: "06-32109876",
    }
  },
  {
    id: "6",
    name: "Dirk van Dam",
    function: "Veiligheidskundige",
    department: "QHSE",
    email: "dirk.vandam@example.com",
    phone: "06-67890123",
    birthDate: "07-04-1976",
    startDate: "15-01-2014",
    certificateStatus: "active",
    pbmStatus: "active",
    personalInfo: {
      address: "Lindenlaan 34",
      postalCode: "2345 KL",
      city: "Eindhoven",
      emergencyContact: "Annemiek van Dam (vrouw)",
      emergencyPhone: "06-43210987",
    }
  },
];

// Demo certificaten
const employeeCertificates = {
  "1": [
    { id: "1", name: "BHV Certificaat", type: "BHV", issueDate: "01-06-2022", expiryDate: "01-06-2024", status: "active" },
    { id: "2", name: "VCA Basis", type: "VCA", issueDate: "15-03-2021", expiryDate: "15-03-2023", status: "expired" },
    { id: "3", name: "Heftruck Certificaat", type: "Heftruck", issueDate: "10-10-2022", expiryDate: "10-10-2024", status: "active" },
    { id: "4", name: "EHBO Diploma", type: "EHBO", issueDate: "05-05-2022", expiryDate: "05-05-2024", status: "active" },
  ],
  "2": [
    { id: "5", name: "VCA VOL", type: "VCA", issueDate: "20-02-2022", expiryDate: "20-02-2025", status: "active" },
    { id: "6", name: "BHV Certificaat", type: "BHV", issueDate: "12-12-2022", expiryDate: "12-12-2024", status: "active" },
  ]
};

// Demo PBM's
const employeePBMs = {
  "1": [
    { id: "1", type: "Veiligheidshelm", issueDate: "01-01-2023", expiryDate: "01-01-2025", status: "active" },
    { id: "2", type: "Veiligheidsschoenen", issueDate: "01-01-2023", expiryDate: "01-01-2024", status: "active" },
    { id: "3", type: "Werkhandschoenen", issueDate: "01-03-2023", expiryDate: "01-03-2024", status: "active" },
  ],
  "2": [
    { id: "4", type: "Veiligheidshelm", issueDate: "15-02-2023", expiryDate: "15-02-2025", status: "active" },
    { id: "5", type: "Veiligheidsschoenen", issueDate: "15-02-2023", expiryDate: "15-02-2024", status: "expiring" },
  ]
};

// Demo trainingen
const employeeTrainings = {
  "1": [
    { id: "1", name: "BHV Herhaling", date: "15-05-2023", status: "completed" },
    { id: "2", name: "Valbeveiliging", date: "20-09-2023", status: "planned" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven aan een BHV-team", date: "10-08-2023", status: "planned" },
  ]
};

// Demo e-learning
const employeeElearnings = {
  "1": [
    { id: "1", name: "Basisveiligheid VCA", date: "10-04-2023", progress: "100%", status: "completed" },
    { id: "2", name: "EHBO Basis", date: "03-07-2023", progress: "75%", status: "in-progress" },
  ],
  "2": [
    { id: "3", name: "Leidinggeven en veiligheid", date: "15-05-2023", progress: "100%", status: "completed" },
  ]
};

// Demo notities
const employeeNotes = {
  "1": [
    { id: "1", date: "10-06-2023", author: "P. de Vries", text: "Gesprek gehad over nieuwe BHV-training. Jan heeft aangegeven interesse te hebben." },
    { id: "2", date: "02-05-2023", author: "M. Willemsen", text: "Nieuwe PBM's uitgedeeld voor project X." },
  ],
  "2": [
    { id: "3", date: "05-06-2023", author: "D. van Dam", text: "Pieter heeft aangegeven VCA VOL te willen verlengen voor einde van het jaar." },
  ]
};

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState({
    personalInfo: false,
    certificates: false,
    pbm: false,
    trainings: false,
    elearnings: false,
    notes: false
  });

  // Find the employee based on the ID from the URL
  const employee = employees.find(emp => emp.id === employeeId);
  const certificates = employeeCertificates[employeeId] || [];
  const pbms = employeePBMs[employeeId] || [];
  const trainings = employeeTrainings[employeeId] || [];
  const elearnings = employeeElearnings[employeeId] || [];
  const notes = employeeNotes[employeeId] || [];

  // If employee not found
  if (!employee) {
    return (
      <div className="main-layout">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="main-content">
            <Button 
              variant="outline" 
              className="mb-6"
              onClick={() => navigate("/employees")}
            >
              <ChevronLeft className="mr-2" size={16} />
              Terug naar overzicht
            </Button>
            <Card>
              <CardContent className="pt-6 flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <p>Medewerker niet gevonden.</p>
                  <Button 
                    className="mt-4 bg-compliblue hover:bg-compliblue/90"
                    onClick={() => navigate("/employees")}
                  >
                    Terug naar overzicht
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actief</span>;
      case "expiring":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Bijna verlopen</span>;
      case "expired":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Verlopen</span>;
      case "completed":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Afgerond</span>;
      case "planned":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Gepland</span>;
      case "in-progress":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In uitvoering</span>;
      default:
        return null;
    }
  };

  // Mock functions for CRUD operations
  const handleAdd = (section) => {
    toast({
      title: "Item toevoegen",
      description: `Functionaliteit om een nieuw ${section} item toe te voegen.`,
    });
  };

  const handleEdit = (section, item) => {
    toast({
      title: "Item bewerken",
      description: `Functionaliteit om ${section} item ${item} te bewerken.`,
    });
  };

  const handleDelete = (section, item) => {
    toast({
      title: "Item verwijderen",
      description: `Functionaliteit om ${section} item ${item} te verwijderen.`,
    });
  };

  const handleDownload = (section, item) => {
    toast({
      title: "Document downloaden",
      description: `Functionaliteit om ${section} document ${item} te downloaden.`,
    });
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <Button 
            variant="outline" 
            className="mb-6"
            onClick={() => navigate("/employees")}
          >
            <ChevronLeft className="mr-2" size={16} />
            Terug naar overzicht
          </Button>
          
          <div className="flex flex-col gap-6">
            {/* Personalia */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <User className="mr-2" size={20} />
                  Persoonlijke gegevens
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing({...isEditing, personalInfo: true})}>
                  <Edit className="mr-2" size={16} />
                  Bewerken
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">{employee.name}</h3>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-500">Functie:</span>
                        <span>{employee.function}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Afdeling:</span>
                        <span>{employee.department}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Geboortedatum:</span>
                        <span>{employee.birthDate}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">In dienst sinds:</span>
                        <span>{employee.startDate}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contactgegevens</h3>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-500">E-mail:</span>
                        <span className="text-compliblue">{employee.email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Telefoon:</span>
                        <span>{employee.phone}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Adres:</span>
                        <span>{employee.personalInfo.address}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Postcode/Plaats:</span>
                        <span>{employee.personalInfo.postalCode} {employee.personalInfo.city}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Noodcontact</h3>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-500">Contactpersoon:</span>
                        <span>{employee.personalInfo.emergencyContact}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-500">Telefoonnummer:</span>
                        <span>{employee.personalInfo.emergencyPhone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Certificaten */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <FileText className="mr-2" size={20} />
                  Certificaten
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90" size="sm" onClick={() => handleAdd('certificaat')}>
                  <Plus className="mr-2" size={16} />
                  Certificaat toevoegen
                </Button>
              </CardHeader>
              <CardContent>
                {certificates.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Geen certificaten gevonden
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Certificaat</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Uitgiftedatum</TableHead>
                        <TableHead>Vervaldatum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {certificates.map((cert) => (
                        <TableRow key={cert.id}>
                          <TableCell className="font-medium">{cert.name}</TableCell>
                          <TableCell>{cert.type}</TableCell>
                          <TableCell>{cert.issueDate}</TableCell>
                          <TableCell>{cert.expiryDate}</TableCell>
                          <TableCell>{getStatusBadge(cert.status)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownload('certificaat', cert.name)}
                            >
                              <Download size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit('certificaat', cert.name)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete('certificaat', cert.name)}
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
            
            {/* PBM's */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Bell className="mr-2" size={20} />
                  Persoonlijke Beschermingsmiddelen
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90" size="sm" onClick={() => handleAdd('PBM')}>
                  <Plus className="mr-2" size={16} />
                  PBM toevoegen
                </Button>
              </CardHeader>
              <CardContent>
                {pbms.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Geen PBM's gevonden
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type PBM</TableHead>
                        <TableHead>Uitgiftedatum</TableHead>
                        <TableHead>Vervaldatum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pbms.map((pbm) => (
                        <TableRow key={pbm.id}>
                          <TableCell className="font-medium">{pbm.type}</TableCell>
                          <TableCell>{pbm.issueDate}</TableCell>
                          <TableCell>{pbm.expiryDate}</TableCell>
                          <TableCell>{getStatusBadge(pbm.status)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit('PBM', pbm.type)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete('PBM', pbm.type)}
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
            
            {/* Trainingen */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Trainingen
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90" size="sm" onClick={() => handleAdd('training')}>
                  <Plus className="mr-2" size={16} />
                  Training plannen
                </Button>
              </CardHeader>
              <CardContent>
                {trainings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Geen trainingen gevonden
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Training</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {trainings.map((training) => (
                        <TableRow key={training.id}>
                          <TableCell className="font-medium">{training.name}</TableCell>
                          <TableCell>{training.date}</TableCell>
                          <TableCell>{getStatusBadge(training.status)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit('training', training.name)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete('training', training.name)}
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
            
            {/* E-learnings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <BookOpen className="mr-2" size={20} />
                  E-learning modules
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90" size="sm" onClick={() => handleAdd('e-learning')}>
                  <Plus className="mr-2" size={16} />
                  E-learning toewijzen
                </Button>
              </CardHeader>
              <CardContent>
                {elearnings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Geen e-learning modules gevonden
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Module</TableHead>
                        <TableHead>Datum</TableHead>
                        <TableHead>Voortgang</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Acties</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {elearnings.map((elearning) => (
                        <TableRow key={elearning.id}>
                          <TableCell className="font-medium">{elearning.name}</TableCell>
                          <TableCell>{elearning.date}</TableCell>
                          <TableCell>{elearning.progress}</TableCell>
                          <TableCell>{getStatusBadge(elearning.status)}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEdit('e-learning', elearning.name)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDelete('e-learning', elearning.name)}
                            >
                              <Trash size={16} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
            
            {/* Notities */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl font-bold flex items-center">
                  <FileText className="mr-2" size={20} />
                  Notities
                </CardTitle>
                <Button className="bg-compliblue hover:bg-compliblue/90" size="sm" onClick={() => handleAdd('notitie')}>
                  <Plus className="mr-2" size={16} />
                  Notitie toevoegen
                </Button>
              </CardHeader>
              <CardContent>
                {notes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Geen notities gevonden
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notes.map((note) => (
                      <div key={note.id} className="rounded-lg border p-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{note.author}</span>
                          <span className="text-sm text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-gray-700">{note.text}</p>
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEdit('notitie', `van ${note.author}`)}
                          >
                            <Edit size={16} className="mr-2" />
                            Bewerken
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDelete('notitie', `van ${note.author}`)}
                          >
                            <Trash size={16} className="mr-2" />
                            Verwijderen
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetail;
