
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { toast } = useToast();

  console.log("Current employeeId from params:", employeeId);
  console.log("Available employee IDs:", employees.map(e => e.id));

  // References for scrolling to sections
  const certificatesRef = useRef<HTMLDivElement>(null);
  const trainingsRef = useRef<HTMLDivElement>(null);
  const pbmsRef = useRef<HTMLDivElement>(null);
  const elearningsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  // Update the state to use separate boolean flags for each section
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [isEditingCertificates, setIsEditingCertificates] = useState(false);
  const [isEditingPBM, setIsEditingPBM] = useState(false);
  const [isEditingTrainings, setIsEditingTrainings] = useState(false);
  const [isEditingElearnings, setIsEditingElearnings] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Find the employee based on the ID from the URL
  const employee = employees.find(emp => emp.id === employeeId);
  const certificates = employeeCertificates[employeeId] || [];
  const pbms = employeePBMs[employeeId] || [];
  const trainings = employeeTrainings[employeeId] || [];
  const elearnings = employeeElearnings[employeeId] || [];
  const notes = employeeNotes[employeeId] || [];

  // Handle hash navigation for scrolling to specific sections
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const scrollToSection = () => {
          switch (hash) {
            case 'certificates':
              certificatesRef.current?.scrollIntoView({ behavior: 'smooth' });
              break;
            case 'trainings':
              trainingsRef.current?.scrollIntoView({ behavior: 'smooth' });
              break;
            case 'pbms':
              pbmsRef.current?.scrollIntoView({ behavior: 'smooth' });
              break;
            case 'elearnings':
              elearningsRef.current?.scrollIntoView({ behavior: 'smooth' });
              break;
            case 'notes':
              notesRef.current?.scrollIntoView({ behavior: 'smooth' });
              break;
            default:
              break;
          }
        };
        scrollToSection();
      }, 100);
    }
  }, [location.hash]);

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
              isEditing={isEditingPersonalInfo}
              setIsEditing={setIsEditingPersonalInfo}
            />
            
            {/* Certificaten */}
            <div ref={certificatesRef}>
              <EmployeeCertificates 
                certificates={certificates}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
              />
            </div>
            
            {/* PBM's */}
            <div ref={pbmsRef}>
              <EmployeePBMs 
                pbms={pbms}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            {/* Trainingen */}
            <div ref={trainingsRef}>
              <EmployeeTrainings 
                trainings={trainings}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            {/* E-learnings */}
            <div ref={elearningsRef}>
              <EmployeeElearnings 
                elearnings={elearnings}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            {/* Notities */}
            <div ref={notesRef}>
              <EmployeeNotes 
                notes={notes}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetail;
