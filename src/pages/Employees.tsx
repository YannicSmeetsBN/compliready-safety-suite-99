
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EmployeeSearchFilters } from "@/components/employees/EmployeeSearchFilters";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { employees, departments } from "@/data/employeesData";

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

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Medewerkers</h1>
          
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <EmployeeSearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              departmentFilter={departmentFilter}
              setDepartmentFilter={setDepartmentFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              departments={departments}
            />
            
            <Button className="bg-compliblue hover:bg-compliblue/90 md:self-start">
              <Plus className="mr-2" size={16} />
              Nieuwe medewerker
            </Button>
          </div>
          
          <EmployeeTable employees={filteredEmployees} />
        </main>
      </div>
    </div>
  );
};

export default Employees;
