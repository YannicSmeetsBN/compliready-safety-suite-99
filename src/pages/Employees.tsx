
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

// Demo data
const employees = [
  {
    id: "1",
    name: "Jan Janssen",
    function: "Technicus",
    department: "Technische dienst",
    email: "jan.janssen@example.com",
    certificateStatus: "active", // active, expiring, expired
    pbmStatus: "active",
    activeCertificates: 3,
    expiredCertificates: 1,
  },
  {
    id: "2",
    name: "Pieter Pietersen",
    function: "Teamleider",
    department: "Productie",
    email: "pieter.pietersen@example.com",
    certificateStatus: "active",
    pbmStatus: "expiring",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "3",
    name: "Maria Willemsen",
    function: "HR Manager",
    department: "HR",
    email: "maria.willemsen@example.com",
    certificateStatus: "expired",
    pbmStatus: "active",
    activeCertificates: 1,
    expiredCertificates: 1,
  },
  {
    id: "4",
    name: "Klaas Klaassen",
    function: "Magazijnmedewerker",
    department: "Logistiek",
    email: "klaas.klaassen@example.com",
    certificateStatus: "active",
    pbmStatus: "active",
    activeCertificates: 4,
    expiredCertificates: 0,
  },
  {
    id: "5",
    name: "Sophie Jansen",
    function: "Front Office Medewerker",
    department: "Receptie",
    email: "sophie.jansen@example.com",
    certificateStatus: "expiring",
    pbmStatus: "active",
    activeCertificates: 2,
    expiredCertificates: 0,
  },
  {
    id: "6",
    name: "Dirk van Dam",
    function: "Veiligheidskundige",
    department: "QHSE",
    email: "dirk.vandam@example.com",
    certificateStatus: "active",
    pbmStatus: "active",
    activeCertificates: 5,
    expiredCertificates: 0,
  },
];

// Demo departments for filter
const departments = [
  "Alle afdelingen",
  "Technische dienst",
  "Productie",
  "HR",
  "Logistiek",
  "Receptie",
  "QHSE",
];

const Employees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("Alle afdelingen");
  const [statusFilter, setStatusFilter] = useState("Alle statussen");

  const filteredEmployees = employees.filter(
    (employee) => {
      // Search filter
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.function.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Department filter
      const matchesDepartment = 
        departmentFilter === "Alle afdelingen" || 
        employee.department === departmentFilter;

      // Status filter
      const matchesStatus = 
        statusFilter === "Alle statussen" || 
        (statusFilter === "Actief" && (employee.certificateStatus === "active" && employee.pbmStatus === "active")) ||
        (statusFilter === "Aandacht nodig" && (employee.certificateStatus === "expiring" || employee.pbmStatus === "expiring")) ||
        (statusFilter === "Verlopen" && (employee.certificateStatus === "expired" || employee.pbmStatus === "expired"));

      return matchesSearch && matchesDepartment && matchesStatus;
    }
  );

  const handleEmployeeClick = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actief</span>;
      case "expiring":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Bijna verlopen</span>;
      case "expired":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Verlopen</span>;
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
          
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex gap-4 flex-col sm:flex-row flex-1">
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Zoeken..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 items-center">
                <Filter size={18} className="text-gray-400" />
                <Select 
                  value={departmentFilter} 
                  onValueChange={setDepartmentFilter}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Alle afdelingen" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 items-center">
                <Filter size={18} className="text-gray-400" />
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Alle statussen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alle statussen">Alle statussen</SelectItem>
                    <SelectItem value="Actief">Actief</SelectItem>
                    <SelectItem value="Aandacht nodig">Aandacht nodig</SelectItem>
                    <SelectItem value="Verlopen">Verlopen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="bg-compliblue hover:bg-compliblue/90 md:self-start">
              <Plus className="mr-2" size={16} />
              Nieuwe medewerker
            </Button>
          </div>
          
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Naam</TableHead>
                  <TableHead>Functie</TableHead>
                  <TableHead>Afdeling</TableHead>
                  <TableHead>E-mailadres</TableHead>
                  <TableHead>Status certificaten</TableHead>
                  <TableHead>Status PBM's</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Geen medewerkers gevonden
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((employee) => (
                    <TableRow 
                      key={employee.id} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleEmployeeClick(employee.id)}
                    >
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.function}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{getStatusBadge(employee.certificateStatus)}</TableCell>
                      <TableCell>{getStatusBadge(employee.pbmStatus)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;
