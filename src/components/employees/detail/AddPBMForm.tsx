
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addPBMToEmployee } from "@/data/dataManager";

interface AddPBMFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddPBMForm = ({ 
  employeeId, 
  onSuccess, 
  onCancel 
}: AddPBMFormProps) => {
  const [formData, setFormData] = useState({
    type: "",
    issueDate: "",
    expiryDate: "",
    status: "active",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Format dates to DD-MM-YYYY
    const formattedData = {
      ...formData,
      issueDate: formatDate(formData.issueDate),
      expiryDate: formatDate(formData.expiryDate),
    };

    // Add PBM to employee
    const success = addPBMToEmployee(employeeId, formattedData);

    if (success) {
      toast({
        title: "PBM toegevoegd",
        description: `${formData.type} is succesvol toegevoegd.`,
      });
      onSuccess();
    } else {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toevoegen van het PBM.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="type">Type PBM</Label>
          <Input
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Bijv. Veiligheidshelm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="issueDate">Uitgiftedatum</Label>
          <Input
            id="issueDate"
            name="issueDate"
            type="date"
            value={formData.issueDate}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Vervaldatum</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuleren
        </Button>
        <Button 
          type="submit" 
          className="bg-compliblue hover:bg-compliblue/90"
          disabled={submitting}
        >
          {submitting ? "Opslaan..." : "Opslaan"}
        </Button>
      </div>
    </form>
  );
};
