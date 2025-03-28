
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  FileText, 
  Building, 
  Edit, 
  Trash, 
  Plus, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CertificateForm } from "@/components/certificates/CertificateForm";
import { Input } from "@/components/ui/input";

type Certificate = {
  id: string;
  name: string;
  employee: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  reminderDays: number;
  status: "active" | "expiring" | "expired";
};

type CompanyCertificate = {
  id: string;
  name: string;
  issuer: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  reminderDays: number;
  status: "active" | "expiring" | "expired";
};

const Certificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("employee");
  
  // Demo data
  const employeeCertificates: Certificate[] = [
    {
      id: "1",
      name: "BHV Certificaat",
      employee: "Jan Janssen",
      type: "BHV",
      issueDate: "01-06-2023",
      expiryDate: "01-06-2025",
      reminderDays: 60,
      status: "active",
    },
    {
      id: "2",
      name: "VCA Basis",
      employee: "Pieter Pietersen",
      type: "VCA",
      issueDate: "15-03-2022",
      expiryDate: "15-03-2024",
      reminderDays: 90,
      status: "expiring",
    },
    {
      id: "3",
      name: "EHBO Diploma",
      employee: "Maria Willemsen",
      type: "EHBO",
      issueDate: "10-01-2021",
      expiryDate: "10-01-2023",
      reminderDays: 30,
      status: "expired",
    },
    {
      id: "4",
      name: "Heftruck Certificaat",
      employee: "Klaas Klaassen",
      type: "Heftruck",
      issueDate: "05-09-2022",
      expiryDate: "05-09-2024",
      reminderDays: 60,
      status: "active",
    },
    {
      id: "5",
      name: "VCA VOL",
      employee: "Dirk van Dam",
      type: "VCA",
      issueDate: "20-11-2022",
      expiryDate: "20-11-2025",
      reminderDays: 90,
      status: "active",
    },
  ];

  const companyCertificates: CompanyCertificate[] = [
    {
      id: "1",
      name: "ISO 9001",
      issuer: "TÜV Nederland",
      type: "ISO",
      issueDate: "20-11-2021",
      expiryDate: "20-11-2024",
      reminderDays: 90,
      status: "active",
    },
    {
      id: "2",
      name: "ISO 45001",
      issuer: "TÜV Nederland",
      type: "ISO",
      issueDate: "15-06-2022",
      expiryDate: "15-06-2025",
      reminderDays: 90,
      status: "active",
    },
    {
      id: "3",
      name: "NEN 4001",
      issuer: "Kiwa Nederland",
      type: "NEN",
      issueDate: "10-01-2020",
      expiryDate: "10-01-2023",
      reminderDays: 90,
      status: "expired",
    },
    {
      id: "4",
      name: "BRL SIKB 7000",
      issuer: "SIKB",
      type: "BRL",
      issueDate: "05-05-2022",
      expiryDate: "05-05-2025",
      reminderDays: 120,
      status: "active",
    },
  ];

  const filteredEmployeeCertificates = employeeCertificates.filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanyCertificates = companyCertificates.filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Certificate["status"] | CompanyCertificate["status"]) => {
    switch (status) {
      case "active":
        return <span className="badge-success">Actueel</span>;
      case "expiring":
        return <span className="badge-warning">Verloopt binnenkort</span>;
      case "expired":
        return <span className="badge-danger">Verlopen</span>;
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
          <h1 className="page-title">Certificaatbeheer</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="employee" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Medewerkercertificaten</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building size={16} />
                <span>Werkgevercertificaten</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="employee" className="space-y-6">
              <div className="flex justify-between">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Zoeken..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-compliblue hover:bg-compliblue/90">
                      <Plus className="mr-2" size={16} />
                      Nieuw certificaat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Certificaat toevoegen</DialogTitle>
                    </DialogHeader>
                    <CertificateForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificaat</TableHead>
                      <TableHead>Medewerker</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uitgiftedatum</TableHead>
                      <TableHead>Vervaldatum</TableHead>
                      <TableHead>Herinneringstermijn</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployeeCertificates.length > 0 ? (
                      filteredEmployeeCertificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-medium flex items-center">
                            <FileText className="mr-2 text-compliblue" size={16} />
                            {certificate.name}
                          </TableCell>
                          <TableCell>{certificate.employee}</TableCell>
                          <TableCell>{certificate.type}</TableCell>
                          <TableCell>{certificate.issueDate}</TableCell>
                          <TableCell>{certificate.expiryDate}</TableCell>
                          <TableCell>{certificate.reminderDays} dagen</TableCell>
                          <TableCell>{getStatusBadge(certificate.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                          Geen certificaten gevonden die voldoen aan de zoekcriteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="company" className="space-y-6">
              <div className="flex justify-between">
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Zoeken..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-compliblue hover:bg-compliblue/90">
                      <Plus className="mr-2" size={16} />
                      Nieuw bedrijfscertificaat
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Bedrijfscertificaat toevoegen</DialogTitle>
                    </DialogHeader>
                    {/* Company Certificate Form would go here */}
                    <div className="space-y-4 py-4">
                      <p>Formulier voor bedrijfscertificaten laden...</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="table-container">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Certificaat</TableHead>
                      <TableHead>Uitgever</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Uitgiftedatum</TableHead>
                      <TableHead>Vervaldatum</TableHead>
                      <TableHead>Herinneringstermijn</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Acties</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanyCertificates.length > 0 ? (
                      filteredCompanyCertificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-medium flex items-center">
                            <Building className="mr-2 text-compliblue" size={16} />
                            {certificate.name}
                          </TableCell>
                          <TableCell>{certificate.issuer}</TableCell>
                          <TableCell>{certificate.type}</TableCell>
                          <TableCell>{certificate.issueDate}</TableCell>
                          <TableCell>{certificate.expiryDate}</TableCell>
                          <TableCell>{certificate.reminderDays} dagen</TableCell>
                          <TableCell>{getStatusBadge(certificate.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon">
                                <Edit size={16} />
                              </Button>
                              <Button variant="outline" size="icon">
                                <Trash size={16} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                          Geen bedrijfscertificaten gevonden die voldoen aan de zoekcriteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Certificates;
