
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmployeeNotFound } from "@/components/employees/detail/EmployeeNotFound";
import { EmployeePersonalInfo } from "@/components/employees/detail/EmployeePersonalInfo";
import { EmployeeCertificates } from "@/components/employees/detail/EmployeeCertificates";
import { EmployeePBMs } from "@/components/employees/detail/EmployeePBMs";
import { EmployeeTrainings } from "@/components/employees/detail/EmployeeTrainings";
import { EmployeeElearnings } from "@/components/employees/detail/EmployeeElearnings";
import { EmployeeNotes } from "@/components/employees/detail/EmployeeNotes";
import { 
  employees, 
  employeeCertificates, 
  employeePBMs, 
  employeeTrainings, 
  employeeElearnings, 
  employeeNotes 
} from "@/data/employeesData";

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
            <EmployeeNotFound />
          </main>
        </div>
      </div>
    );
  }

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
            {/* Persoonlijke gegevens */}
            <EmployeePersonalInfo 
              employee={employee} 
              isEditing={isEditing} 
              setIsEditing={setIsEditing} 
            />
            
            {/* Certificaten */}
            <EmployeeCertificates 
              certificates={certificates}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleDownload={handleDownload}
            />
            
            {/* PBM's */}
            <EmployeePBMs 
              pbms={pbms}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            
            {/* Trainingen */}
            <EmployeeTrainings 
              trainings={trainings}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            
            {/* E-learnings */}
            <EmployeeElearnings 
              elearnings={elearnings}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            
            {/* Notities */}
            <EmployeeNotes 
              notes={notes}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetail;
