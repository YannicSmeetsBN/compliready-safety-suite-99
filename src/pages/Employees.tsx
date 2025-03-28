
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Search, 
  X, 
  FileText, 
  Bell, 
  Calendar, 
  BookOpen 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerClose 
} from "@/components/ui/drawer";

// Demo data
const employees = [
  {
    id: "1",
    name: "Jan Janssen",
    function: "Technicus",
    department: "Technische dienst",
    email: "jan.janssen@example.com",
    activeCertificates: 3,
    expiredCertificates: 1,
  },
  {
    id: "2",
    name: "Pieter Pietersen",
    function: "Teamleider",
    department: "Productie",
    email: "pieter.pietersen@example.com",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "3",
    name: "Maria Willemsen",
    function: "HR Manager",
    department: "HR",
    email: "maria.willemsen@example.com",
    activeCertificates: 1,
    expiredCertificates: 1,
  },
  {
    id: "4",
    name: "Klaas Klaassen",
    function: "Magazijnmedewerker",
    department: "Logistiek",
    email: "klaas.klaassen@example.com",
    activeCertificates: 4,
    expiredCertificates: 0,
  },
  {
    id: "5",
    name: "Sophie Jansen",
    function: "Front Office Medewerker",
    department: "Receptie",
    email: "sophie.jansen@example.com",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "6",
    name: "Dirk van Dam",
    function: "Veiligheidskundige",
    department: "QHSE",
    email: "dirk.vandam@example.com",
    activeCertificates: 5,
    expiredCertificates: 0,
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
    { id: "5", type: "Veiligheidsschoenen", issueDate: "15-02-2023", expiryDate: "15-02-2024", status: "active" },
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

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="badge-success">Actueel</span>;
      case "expired":
        return <span className="badge-danger">Verlopen</span>;
      case "completed":
        return <span className="badge-success">Afgerond</span>;
      case "planned":
        return <span className="badge-info">Gepland</span>;
      default:
        return null;
    }
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Medewerkers</h1>
          
          <div className="flex justify-between mb-6">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Zoeken..." 
                className="pl-10" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <Plus className="mr-2" size={16} />
              Nieuwe medewerker
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <Card 
                key={employee.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleEmployeeClick(employee)}
              >
                <CardHeader className="pb-2">
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription>{employee.function}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Afdeling:</span>
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-compliblue">{employee.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certificaten:</span>
                      <div>
                        <span className="text-green-600">{employee.activeCertificates} actief</span>
                        {employee.expiredCertificates > 0 && (
                          <span className="text-red-600 ml-2">{employee.expiredCertificates} verlopen</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <Button variant="outline" size="sm">Bekijken</Button>
                  <Button variant="outline" size="sm">Certificaten</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Employee Detail Drawer */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerContent className="max-h-[90%]">
              <DrawerHeader>
                <DrawerTitle className="text-2xl font-bold">
                  {selectedEmployee?.name}
                </DrawerTitle>
                <DrawerDescription>
                  {selectedEmployee?.function} | {selectedEmployee?.department}
                </DrawerDescription>
              </DrawerHeader>
              
              <div className="p-6">
                <Tabs defaultValue="certificates">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="certificates" className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>Certificaten</span>
                    </TabsTrigger>
                    <TabsTrigger value="pbm" className="flex items-center gap-2">
                      <Bell size={16} />
                      <span>PBM's</span>
                    </TabsTrigger>
                    <TabsTrigger value="trainings" className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Trainingen</span>
                    </TabsTrigger>
                    <TabsTrigger value="elearning" className="flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>E-learning</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>Notities</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="certificates" className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Certificaten</h3>
                      <Button size="sm" className="bg-compliblue hover:bg-compliblue/90">
                        <Plus className="mr-2" size={14} />
                        Certificaat toevoegen
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium">Certificaat</th>
                            <th className="text-left py-3 px-4 font-medium">Type</th>
                            <th className="text-left py-3 px-4 font-medium">Uitgiftedatum</th>
                            <th className="text-left py-3 px-4 font-medium">Vervaldatum</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedEmployee && employeeCertificates[selectedEmployee.id] ? 
                            employeeCertificates[selectedEmployee.id].map(cert => (
                              <tr key={cert.id} className="border-b">
                                <td className="py-3 px-4">{cert.name}</td>
                                <td className="py-3 px-4">{cert.type}</td>
                                <td className="py-3 px-4">{cert.issueDate}</td>
                                <td className="py-3 px-4">{cert.expiryDate}</td>
                                <td className="py-3 px-4">{getStatusBadge(cert.status)}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan={5} className="py-4 px-4 text-center">
                                  Geen certificaten gevonden
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pbm" className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Persoonlijke Beschermingsmiddelen</h3>
                      <Button size="sm" className="bg-compliblue hover:bg-compliblue/90">
                        <Plus className="mr-2" size={14} />
                        PBM toevoegen
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium">Type PBM</th>
                            <th className="text-left py-3 px-4 font-medium">Uitgiftedatum</th>
                            <th className="text-left py-3 px-4 font-medium">Vervaldatum</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedEmployee && employeePBMs[selectedEmployee.id] ? 
                            employeePBMs[selectedEmployee.id].map(pbm => (
                              <tr key={pbm.id} className="border-b">
                                <td className="py-3 px-4">{pbm.type}</td>
                                <td className="py-3 px-4">{pbm.issueDate}</td>
                                <td className="py-3 px-4">{pbm.expiryDate}</td>
                                <td className="py-3 px-4">{getStatusBadge(pbm.status)}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan={4} className="py-4 px-4 text-center">
                                  Geen PBM's gevonden
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="trainings" className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Trainingen</h3>
                      <Button size="sm" className="bg-compliblue hover:bg-compliblue/90">
                        <Plus className="mr-2" size={14} />
                        Training plannen
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 font-medium">Training</th>
                            <th className="text-left py-3 px-4 font-medium">Datum</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedEmployee && employeeTrainings[selectedEmployee.id] ? 
                            employeeTrainings[selectedEmployee.id].map(training => (
                              <tr key={training.id} className="border-b">
                                <td className="py-3 px-4">{training.name}</td>
                                <td className="py-3 px-4">{training.date}</td>
                                <td className="py-3 px-4">{getStatusBadge(training.status)}</td>
                              </tr>
                            )) : (
                              <tr>
                                <td colSpan={3} className="py-4 px-4 text-center">
                                  Geen trainingen gevonden
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="elearning" className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">E-learning modules</h3>
                      <Button size="sm" className="bg-compliblue hover:bg-compliblue/90">
                        <Plus className="mr-2" size={14} />
                        E-learning toewijzen
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border p-6 text-center text-gray-500">
                      <p>E-learning functionaliteit is in ontwikkeling.</p>
                      <p className="mt-2">Binnenkort beschikbaar!</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="space-y-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-medium">Notities</h3>
                      <Button size="sm" className="bg-compliblue hover:bg-compliblue/90">
                        <Plus className="mr-2" size={14} />
                        Notitie toevoegen
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedEmployee && employeeNotes[selectedEmployee.id] ? 
                        employeeNotes[selectedEmployee.id].map(note => (
                          <div key={note.id} className="rounded-lg border p-4">
                            <div className="flex justify-between mb-2">
                              <span className="font-medium">{note.author}</span>
                              <span className="text-sm text-gray-500">{note.date}</span>
                            </div>
                            <p className="text-gray-700">{note.text}</p>
                          </div>
                        )) : (
                          <div className="rounded-lg border p-6 text-center text-gray-500">
                            <p>Geen notities gevonden</p>
                          </div>
                        )
                      }
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <DrawerFooter>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                  Sluiten
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          
        </main>
      </div>
    </div>
  );
};

export default Employees;
