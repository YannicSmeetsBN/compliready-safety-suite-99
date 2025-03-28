
import { useState } from "react";
import { FileText, Edit, Trash, Plus, Search } from "lucide-react";
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
import { CertificateForm } from "./CertificateForm";
import { Input } from "@/components/ui/input";

type Certificate = {
  id: string;
  name: string;
  employee: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring" | "expired";
};

export const CertificateList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Demo data
  const certificates: Certificate[] = [
    {
      id: "1",
      name: "BHV Certificaat",
      employee: "Jan Janssen",
      type: "BHV",
      issueDate: "01-06-2023",
      expiryDate: "01-06-2025",
      status: "active",
    },
    {
      id: "2",
      name: "VCA Basis",
      employee: "Pieter Pietersen",
      type: "VCA",
      issueDate: "15-03-2022",
      expiryDate: "15-03-2024",
      status: "expiring",
    },
    {
      id: "3",
      name: "EHBO Diploma",
      employee: "Maria Willemsen",
      type: "EHBO",
      issueDate: "10-01-2021",
      expiryDate: "10-01-2023",
      status: "expired",
    },
    {
      id: "4",
      name: "Heftruck Certificaat",
      employee: "Klaas Klaassen",
      type: "Heftruck",
      issueDate: "05-09-2022",
      expiryDate: "05-09-2024",
      status: "active",
    },
    {
      id: "5",
      name: "ISO 9001",
      employee: "Organisatie",
      type: "ISO",
      issueDate: "20-11-2021",
      expiryDate: "20-11-2024",
      status: "active",
    },
  ];

  const filteredCertificates = certificates.filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cert.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Certificate["status"]) => {
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
    <div className="space-y-6">
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
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell className="font-medium flex items-center">
                    <FileText className="mr-2 text-compliblue" size={16} />
                    {certificate.name}
                  </TableCell>
                  <TableCell>{certificate.employee}</TableCell>
                  <TableCell>{certificate.type}</TableCell>
                  <TableCell>{certificate.issueDate}</TableCell>
                  <TableCell>{certificate.expiryDate}</TableCell>
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
                <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                  Geen certificaten gevonden die voldoen aan de zoekcriteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
