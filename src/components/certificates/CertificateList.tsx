
import { useState } from "react";
import { FileText, Edit, Trash, Plus, Search, ArrowUp, ArrowDown, ChevronDown } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

type SortDirection = "asc" | "desc" | null;

type SortConfig = {
  key: keyof Certificate | null;
  direction: SortDirection;
};

export const CertificateList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<Certificate["status"] | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });
  
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

  // Get unique certificate types for filter
  const uniqueTypes = Array.from(new Set(certificates.map(cert => cert.type)));

  // Handle sorting when double-clicking on a column header
  const handleSort = (key: keyof Certificate) => {
    let direction: SortDirection = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  // Apply filters and sorting to the certificates
  let filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter ? cert.type === typeFilter : true;
    const matchesStatus = statusFilter ? cert.status === statusFilter : true;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Apply sorting if a sort configuration exists
  if (sortConfig.key && sortConfig.direction) {
    filteredCertificates = [...filteredCertificates].sort((a, b) => {
      const key = sortConfig.key as keyof Certificate;
      
      if (a[key] < b[key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

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

  const getSortIcon = (key: keyof Certificate) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        return <ArrowUp className="ml-1 h-4 w-4 inline" />;
      } else if (sortConfig.direction === 'desc') {
        return <ArrowDown className="ml-1 h-4 w-4 inline" />;
      }
    }
    return null;
  };

  // Render a table header with sort and filter functionality
  const renderTableHead = (
    label: string, 
    key: keyof Certificate, 
    hasFilter: boolean = false,
    filterItems?: string[] | Certificate["status"][]
  ) => {
    return (
      <TableHead 
        className="cursor-pointer select-none" 
        onDoubleClick={() => handleSort(key)}
      >
        <div className="flex items-center">
          <span>{label}</span>
          {getSortIcon(key)}
          
          {hasFilter && filterItems && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (key === 'type') setTypeFilter(null);
                      if (key === 'status') setStatusFilter(null);
                    }}
                  >
                    Alle
                  </DropdownMenuItem>
                  {filterItems.map((item) => (
                    <DropdownMenuItem 
                      key={item} 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (key === 'type') setTypeFilter(item as string);
                        if (key === 'status') setStatusFilter(item as Certificate["status"]);
                      }}
                    >
                      {key === 'status' ? 
                        (item === 'active' ? 'Actueel' : 
                         item === 'expiring' ? 'Verloopt binnenkort' : 
                         'Verlopen') : 
                        item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </TableHead>
    );
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
              {renderTableHead("Certificaat", "name")}
              {renderTableHead("Medewerker", "employee")}
              {renderTableHead("Type", "type", true, uniqueTypes)}
              {renderTableHead("Uitgiftedatum", "issueDate")}
              {renderTableHead("Vervaldatum", "expiryDate")}
              {renderTableHead("Status", "status", true, ["active", "expiring", "expired"])}
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
