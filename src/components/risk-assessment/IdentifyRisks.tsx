
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, X } from "lucide-react";

// Risk categories
const riskCategories = [
  { id: "physical", label: "Fysiek" },
  { id: "mental", label: "Mentaal/Psychosociaal" },
  { id: "organizational", label: "Organisatorisch" },
  { id: "chemical", label: "Chemisch" },
  { id: "biological", label: "Biologisch" },
  { id: "ergonomic", label: "Ergonomisch" },
];

// Demo data for workplace names
const workplaceNames: Record<string, string> = {
  "1": "Kantoor",
  "2": "Productiehal",
  "3": "Magazijn",
  "4": "Buitenterrein",
};

type Risk = {
  id: string;
  name: string;
  department: string;
  location: string;
  description: string;
  category: string;
  currentMeasures: string;
};

type IdentifyRisksProps = {
  workplace: string | null;
  risks: any[];
  onRisksUpdate: (risks: any[]) => void;
};

export const IdentifyRisks = ({ workplace, risks, onRisksUpdate }: IdentifyRisksProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    department: workplace || "",
    location: "",
    name: "",
    description: "",
    category: "",
    currentMeasures: "",
  });
  
  const currentWorkplaceRisks = risks.filter(risk => risk.department === workplace);
  
  const handleInputChange = (field: keyof Risk, value: string) => {
    setNewRisk({ ...newRisk, [field]: value });
  };
  
  const handleAddRisk = () => {
    if (!newRisk.name || !newRisk.category) return;
    
    const updatedRisks = [
      ...risks,
      {
        ...newRisk,
        id: Date.now().toString(),
      }
    ];
    
    onRisksUpdate(updatedRisks);
    setShowAddForm(false);
    setNewRisk({
      department: workplace || "",
      location: "",
      name: "",
      description: "",
      category: "",
      currentMeasures: "",
    });
  };
  
  const handleDeleteRisk = (riskId: string) => {
    const updatedRisks = risks.filter(risk => risk.id !== riskId);
    onRisksUpdate(updatedRisks);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-4">
        Inventariseer alle mogelijke risico's voor de geselecteerde werkplek ({workplaceNames[workplace || ""] || "Onbekend"}).
      </p>
      
      {currentWorkplaceRisks.length > 0 ? (
        <div className="space-y-4">
          <h3 className="font-medium">Geïnventariseerde risico's</h3>
          {currentWorkplaceRisks.map((risk) => (
            <Card key={risk.id} className="relative">
              <CardContent className="pt-6">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  onClick={() => handleDeleteRisk(risk.id)}
                >
                  <X size={18} />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500 text-sm">Risico</Label>
                    <p className="font-medium">{risk.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Categorie</Label>
                    <p>{riskCategories.find(cat => cat.id === risk.category)?.label || risk.category}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-sm">Locatie</Label>
                    <p>{risk.location || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-500 text-sm">Omschrijving</Label>
                    <p>{risk.description || "-"}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-500 text-sm">Huidige beheersmaatregelen</Label>
                    <p>{risk.currentMeasures || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-500 mb-2" />
            <p className="text-gray-500">Nog geen risico's geïnventariseerd voor deze werkplek.</p>
          </div>
        </div>
      )}
      
      {!showAddForm ? (
        <Button 
          className="bg-compliblue hover:bg-compliblue/90"
          onClick={() => setShowAddForm(true)}
        >
          <Plus className="mr-2" size={16} />
          Nieuw risico toevoegen
        </Button>
      ) : (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="font-medium">Nieuw risico toevoegen</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="risk-name">Naam risico *</Label>
                <Input 
                  id="risk-name" 
                  value={newRisk.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Bijv. Valgevaar trap"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="risk-category">Categorie *</Label>
                <Select 
                  value={newRisk.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {riskCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="risk-location">Locatie binnen afdeling</Label>
                <Input 
                  id="risk-location" 
                  value={newRisk.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Bijv. Trappenhal of Zone B"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="risk-description">Omschrijving</Label>
                <Textarea 
                  id="risk-description" 
                  value={newRisk.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Beschrijf het risico in detail..."
                  rows={3}
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="risk-current-measures">Huidige beheersmaatregelen</Label>
                <Textarea 
                  id="risk-current-measures" 
                  value={newRisk.currentMeasures}
                  onChange={(e) => handleInputChange("currentMeasures", e.target.value)}
                  placeholder="Beschrijf welke maatregelen al genomen zijn..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2 justify-end border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
            >
              Annuleren
            </Button>
            <Button 
              className="bg-compliblue hover:bg-compliblue/90"
              onClick={handleAddRisk}
              disabled={!newRisk.name || !newRisk.category}
            >
              Risico toevoegen
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
