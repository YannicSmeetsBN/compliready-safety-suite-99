
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  HandMetal, 
  Glasses, 
  HardHat, 
  Boot, 
  Shirt,
  Plus
} from "lucide-react";

// Dummy data structure voor PBM-types
const ppeTypes = [
  {
    id: "1",
    name: "Veiligheidshelm",
    icon: HardHat,
    totalIssued: 26,
    lastCheckDate: "01-05-2023",
    expiringCount: 3,
  },
  {
    id: "2",
    name: "Veiligheidsbril",
    icon: Glasses,
    totalIssued: 32,
    lastCheckDate: "15-06-2023",
    expiringCount: 0,
  },
  {
    id: "3",
    name: "Veiligheidsschoenen",
    icon: Boot,
    totalIssued: 24,
    lastCheckDate: "10-04-2023",
    expiringCount: 5,
  },
  {
    id: "4",
    name: "Werkhandschoenen",
    icon: HandMetal,
    totalIssued: 42,
    lastCheckDate: "22-03-2023",
    expiringCount: 8,
  },
  {
    id: "5",
    name: "Werkkleding",
    icon: Shirt,
    totalIssued: 28,
    lastCheckDate: "05-05-2023",
    expiringCount: 2,
  },
];

const PPEOverview = () => {
  const navigate = useNavigate();
  
  const handlePPETypeClick = (ppeId: string) => {
    navigate(`/safety/ppe/${ppeId}`);
  };

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Bekijk per PBM-type welke medewerkers deze in bezit hebben en of actie nodig is.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">PBM-types</h2>
        <Button className="bg-compliblue hover:bg-compliblue/90">
          <Plus className="mr-2 h-4 w-4" />
          Nieuw PBM-type toevoegen
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {ppeTypes.map((ppe) => {
          const Icon = ppe.icon;
          return (
            <Card 
              key={ppe.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handlePPETypeClick(ppe.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-compliblue/10 p-3 rounded-full">
                    <Icon className="h-8 w-8 text-compliblue" />
                  </div>
                  <CardTitle className="text-lg">{ppe.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Totaal uitgegeven</p>
                    <p className="font-semibold">{ppe.totalIssued}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Laatste controle</p>
                    <p className="font-semibold">{ppe.lastCheckDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Binnenkort verlopen</p>
                    <div className="flex items-center mt-1">
                      <p className="font-semibold">{ppe.expiringCount}</p>
                      {ppe.expiringCount > 0 && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Actie vereist
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
};

export default PPEOverview;
