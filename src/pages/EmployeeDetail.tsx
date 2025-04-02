
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditPersonalInfoForm } from "@/components/employees/detail/EditPersonalInfoForm";
import { AddCertificateForm } from "@/components/employees/detail/AddCertificateForm";
import { AddPBMForm } from "@/components/employees/detail/AddPBMForm";
import { AddTrainingForm } from "@/components/employees/detail/AddTrainingForm";
import { AddElearningForm } from "@/components/employees/detail/AddElearningForm";
import { 
  employees, 
  employeeCertificates, 
  employeePBMs, 
  employeeTrainings, 
  employeeElearnings, 
  employeeNotes 
} from "@/data";

const EmployeeDetail = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  console.log("Current employeeId from params:", employeeId);
  console.log("Available employee IDs:", employees.map(e => e.id));

  const certificatesRef = useRef<HTMLDivElement>(null);
  const trainingsRef = useRef<HTMLDivElement>(null);
  const pbmsRef = useRef<HTMLDivElement>(null);
  const elearningsRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<HTMLDivElement>(null);

  // Dialog state management
  const [isPersonalInfoDialogOpen, setIsPersonalInfoDialogOpen] = useState(false);
  const [isCertificateDialogOpen, setIsCertificateDialogOpen] = useState(false);
  const [isPBMDialogOpen, setIsPBMDialogOpen] = useState(false);
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false);
  const [isElearningDialogOpen, setIsElearningDialogOpen] = useState(false);

  // Data states
  const [employee, setEmployee] = useState(employees.find(emp => emp.id === employeeId));
  const [certificates, setCertificates] = useState(employeeCertificates[employeeId] || []);
  const [pbms, setPbms] = useState(employeePBMs[employeeId] || []);
  const [trainings, setTrainings] = useState(employeeTrainings[employeeId] || []);
  const [elearnings, setElearnings] = useState(employeeElearnings[employeeId] || []);
  const [notes, setNotes] = useState(employeeNotes[employeeId] || []);

  // Refresh data function
  const refreshData = () => {
    setEmployee(employees.find(emp => emp.id === employeeId));
    setCertificates(employeeCertificates[employeeId] || []);
    setPbms(employeePBMs[employeeId] || []);
    setTrainings(employeeTrainings[employeeId] || []);
    setElearnings(employeeElearnings[employeeId] || []);
    setNotes(employeeNotes[employeeId] || []);
  };

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

  const handleAdd = (section) => {
    switch (section) {
      case 'certificaat':
        setIsCertificateDialogOpen(true);
        break;
      case 'PBM':
        setIsPBMDialogOpen(true);
        break;
      case 'training':
        setIsTrainingDialogOpen(true);
        break;
      case 'e-learning':
        setIsElearningDialogOpen(true);
        break;
      default:
        toast({
          title: "Item toevoegen",
          description: `Functionaliteit om een nieuw ${section} item toe te voegen.`,
        });
        break;
    }
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
            <EmployeePersonalInfo 
              employee={employee} 
              isEditing={false}
              setIsEditing={() => setIsPersonalInfoDialogOpen(true)}
            />
            
            <div ref={certificatesRef}>
              <EmployeeCertificates 
                certificates={certificates}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDownload={handleDownload}
              />
            </div>
            
            <div ref={pbmsRef}>
              <EmployeePBMs 
                pbms={pbms}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            <div ref={trainingsRef}>
              <EmployeeTrainings 
                trainings={trainings}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            <div ref={elearningsRef}>
              <EmployeeElearnings 
                elearnings={elearnings}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
            
            <div ref={notesRef}>
              <EmployeeNotes 
                notes={notes}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            </div>
          </div>

          {/* Edit Personal Info Dialog */}
          <Dialog open={isPersonalInfoDialogOpen} onOpenChange={setIsPersonalInfoDialogOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Persoonlijke gegevens bewerken</DialogTitle>
              </DialogHeader>
              <EditPersonalInfoForm 
                employee={employee}
                onSuccess={() => {
                  setIsPersonalInfoDialogOpen(false);
                  refreshData();
                }}
                onCancel={() => setIsPersonalInfoDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Add Certificate Dialog */}
          <Dialog open={isCertificateDialogOpen} onOpenChange={setIsCertificateDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Certificaat toevoegen</DialogTitle>
              </DialogHeader>
              <AddCertificateForm 
                employeeId={employeeId}
                onSuccess={() => {
                  setIsCertificateDialogOpen(false);
                  refreshData();
                }}
                onCancel={() => setIsCertificateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Add PBM Dialog */}
          <Dialog open={isPBMDialogOpen} onOpenChange={setIsPBMDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>PBM toevoegen</DialogTitle>
              </DialogHeader>
              <AddPBMForm 
                employeeId={employeeId}
                onSuccess={() => {
                  setIsPBMDialogOpen(false);
                  refreshData();
                }}
                onCancel={() => setIsPBMDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Add Training Dialog */}
          <Dialog open={isTrainingDialogOpen} onOpenChange={setIsTrainingDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Training plannen</DialogTitle>
              </DialogHeader>
              <AddTrainingForm 
                employeeId={employeeId}
                onSuccess={() => {
                  setIsTrainingDialogOpen(false);
                  refreshData();
                }}
                onCancel={() => setIsTrainingDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Add E-learning Dialog */}
          <Dialog open={isElearningDialogOpen} onOpenChange={setIsElearningDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>E-learning toewijzen</DialogTitle>
              </DialogHeader>
              <AddElearningForm 
                employeeId={employeeId}
                onSuccess={() => {
                  setIsElearningDialogOpen(false);
                  refreshData();
                }}
                onCancel={() => setIsElearningDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDetail;
