
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addElearningToEmployee } from "@/data/dataManager";
import { format } from "date-fns";

interface AddElearningFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

// Mock data for available e-learning modules
const availableElearningModules = [
  { id: "bhv-basic", name: "BHV Basiskennis", duration: "2 uur" },
  { id: "bhv-aed", name: "AED gebruik", duration: "1 uur" },
  { id: "fire-safety", name: "Brandveiligheid op de werkplek", duration: "45 min" },
  { id: "vca-prep", name: "VCA examenvoorbereiding", duration: "3 uur" },
  { id: "ergonomics", name: "Ergonomie op kantoor", duration: "1 uur" },
  { id: "cyber-security", name: "Cyberveiligheid basis", duration: "90 min" },
  { id: "first-aid", name: "EHBO basis", duration: "2 uur" },
];

export const AddElearningForm = ({ 
  employeeId, 
  onSuccess, 
  onCancel 
}: AddElearningFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    date: format(new Date(), 'yyyy-MM-dd'), // Current date as the invitation date
    progress: "0%",
    status: "invited", // Fixed status for "Medewerker uitgenodigd"
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSelectChange = (name: string, value: string) => {
    if (name === "module") {
      // Find the selected module and update the name
      const selectedModule = availableElearningModules.find(module => module.id === value);
      if (selectedModule) {
        setFormData((prev) => ({ ...prev, name: selectedModule.name }));
      }
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Format date to DD-MM-YYYY
    const formattedData = {
      ...formData,
      date: formatDate(formData.date),
    };

    // Add e-learning to employee
    const success = addElearningToEmployee(employeeId, formattedData);

    if (success) {
      toast({
        title: "E-learning toegewezen",
        description: `${formData.name} is succesvol toegewezen aan de medewerker.`,
      });
      onSuccess();
    } else {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toewijzen van de e-learning.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="module">E-learning module</Label>
          <Select
            onValueChange={(value) => handleSelectChange("module", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer e-learning module" />
            </SelectTrigger>
            <SelectContent>
              {availableElearningModules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  {module.name} ({module.duration})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mt-4">
          <p className="text-sm text-gray-600">
            De medewerker wordt automatisch uitgenodigd voor deze e-learning module op {formatDate(formData.date)}.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuleren
        </Button>
        <Button 
          type="submit" 
          className="bg-compliblue hover:bg-compliblue/90"
          disabled={submitting || !formData.name}
        >
          {submitting ? "Opslaan..." : "Medewerker uitnodigen"}
        </Button>
      </div>
    </form>
  );
};
