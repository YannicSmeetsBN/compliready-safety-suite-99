import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HandMetal,
  Glasses,
  HardHat,
  Footprints,
  Shirt,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { employees } from "@/data";

// Dummy data structuren voor mock data
const ppeTypes = {
  "1": {
    id: "1",
    name: "Veiligheidshelm",
    icon: HardHat,
    description: "Beschermt het hoofd tegen vallende objecten en stoten.",
    checkInterval: "6 maanden",
    expiryPeriod: "2 jaar"
  },
  "2": {
    id: "2",
    name: "Veiligheidsbril",
    icon: Glasses,
    description: "Beschermt de ogen tegen stof, vloeistoffen en rondvliegende deeltjes.",
    checkInterval: "3 maanden",
    expiryPeriod: "1 jaar"
  },
  "3": {
    id: "3",
    name: "Veiligheidsschoenen",
    icon: Footprints,
    description: "Beschermt de voeten tegen mechanische gevaren, vallende objecten en chemicaliën.",
    checkInterval: "6 maanden",
    expiryPeriod: "1 jaar"
  },
  "4": {
    id: "4",
    name: "Werkhandschoenen",
    icon: HandMetal,
    description: "Beschermt de handen tegen mechanische gevaren, chemicaliën en temperaturen.",
    checkInterval: "3 maanden",
    expiryPeriod: "6 maanden"
  },
  "5": {
    id: "5",
    name: "Werkkleding",
    icon: Shirt,
    description: "Beschermt het lichaam tegen mechanische gevaren, chemicaliën en temperaturen.",
    checkInterval: "6 maanden",
    expiryPeriod: "1 jaar"
  }
};

// Demo data voor toegewezen PBM's per type
const assignedPPEs = {
  "1": [ // Voor veiligheidshelmen
    { id: "1", employeeId: "1", employee: "Jan Janssen", issueDate: "01-01-2023", expiryDate: "01-01-2025", status: "active" },
    { id: "2", employeeId: "2", employee: "Pieter Pietersen", issueDate: "15-02-2023", expiryDate: "15-02-2025", status: "active" },
    { id: "3", employeeId: "4", employee: "Klaas Klaassen", issueDate: "10-11-2022", expiryDate: "10-11-2024", status: "active" },
    { id: "4", employeeId: "6", employee: "Dirk van Dam", issueDate: "05-03-2023", expiryDate: "05-03-2025", status: "active" }
  ],
  "2": [ // Voor veiligheidsbrillen
    { id: "5", employeeId: "1", employee: "Jan Janssen", issueDate: "15-04-2023", expiryDate: "15-04-2024", status: "active" },
    { id: "6", employeeId: "3", employee: "Maria Willemsen", issueDate: "20-05-2023", expiryDate: "20-05-2024", status: "active" }
  ],
  "3": [], // Lege array voor veiligheidsschoenen als voorbeeld
  "4": [ // Voor werkhandschoenen
    { id: "7", employeeId: "1", employee: "Jan Janssen", issueDate: "01-03-2023", expiryDate: "01-09-2023", status: "expired" },
    { id: "8", employeeId: "2", employee: "Pieter Pietersen", issueDate: "01-06-2023", expiryDate: "01-12-2023", status: "expiring" },
    { id: "9", employeeId: "4", employee: "Klaas Klaassen", issueDate: "15-06-2023", expiryDate: "15-12-2023", status: "expiring" }
  ],
  "5": [ // Voor werkkleding
    { id: "10", employeeId: "1", employee: "Jan Janssen", issueDate: "10-02-2023", expiryDate: "10-02-2024", status: "active" },
    { id: "11", employeeId: "2", employee: "Pieter Pietersen", issueDate: "10-02-2023", expiryDate: "10-02-2024", status: "active" },
    { id: "12", employeeId: "3", employee: "Maria Willemsen", issueDate: "10-02-2023", expiryDate: "10-02-2024", status: "active" },
    { id: "13", employeeId: "4", employee: "Klaas Klaassen", issueDate: "10-02-2023", expiryDate: "10-02-2024", status: "active" },
    { id: "14", employeeId: "5", employee: "Sophie Jansen", issueDate: "10-02-2023", expiryDate: "10-02-2024", status: "active" }
  ]
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Geldig
        </span>
      );
    case "expiring":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Binnenkort verlopen
        </span>
      );
    case "expired":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Verlopen
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Onbekend
        </span>
      );
  }
};

const PPEDetail = () => {
  const { ppeId } = useParams<{ ppeId: string }>();
  const navigate = useNavigate();
  const [ppeType, setPpeType] = useState<any>(null);
  const [assignedItems, setAssignedItems] = useState<any[]>([]);
  
  useEffect(() => {
    if (ppeId && ppeTypes[ppeId as keyof typeof ppeTypes]) {
      setPpeType(ppeTypes[ppeId as keyof typeof ppeTypes]);
      
      // Get assigned items for this PPE type
      const items = assignedPPEs[ppeId as keyof typeof assignedPPEs] || [];
      setAssignedItems(items);
    }
  }, [ppeId]);

  if (!ppeType) {
    return <div>PBM-type niet gevonden.</div>;
  }

  const handleBack = () => {
    navigate('/safety');
  };

  const Icon = ppeType.icon;

  // Filter employees die nog geen PBM van dit type hebben
  const getAvailableEmployees = () => {
    const assignedEmployeeIds = assignedItems.map(item => item.employeeId);
    return employees.filter(emp => !assignedEmployeeIds.includes(emp.id));
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Terug naar overzicht
      </Button>
      
      <Card className="mb-8">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="bg-compliblue/10 p-4 rounded-full">
              <Icon className="h-10 w-10 text-compliblue" />
            </div>
            <div>
              <CardTitle className="text-2xl">{ppeType.name}</CardTitle>
              <p className="text-gray-600 mt-1">{ppeType.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div>
              <p className="text-sm text-gray-500">Controle-interval</p>
              <p className="font-semibold">{ppeType.checkInterval}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Geldigheidsduur</p>
              <p className="font-semibold">{ppeType.expiryPeriod}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Toegewezen</p>
              <p className="font-semibold">{assignedItems.length} medewerkers</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Toegewezen aan medewerkers</h2>
        <Button className="bg-compliblue hover:bg-compliblue/90">
          <Plus className="mr-2 h-4 w-4" />
          PBM toewijzen
        </Button>
      </div>
      
      {assignedItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Medewerker</TableHead>
                <TableHead>Uitgiftedatum</TableHead>
                <TableHead>Vervaldatum</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.employee}</TableCell>
                  <TableCell>{item.issueDate}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Pencil className="h-4 w-4 mr-1" />
                        Bewerken
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 flex items-center">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Verwijderen
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="bg-gray-50 p-8 text-center rounded-lg border border-dashed">
          <p className="text-gray-500">Geen medewerkers gevonden met dit PBM.</p>
          <Button className="mt-4 bg-compliblue hover:bg-compliblue/90">
            <Plus className="mr-2 h-4 w-4" />
            PBM toewijzen
          </Button>
        </div>
      )}
    </div>
  );
};

export default PPEDetail;
