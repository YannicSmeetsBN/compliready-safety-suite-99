
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
import { addCertificateToEmployee } from "@/data/dataManager";
import { Upload } from "lucide-react";

interface AddCertificateFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddCertificateForm = ({ 
  employeeId, 
  onSuccess, 
  onCancel 
}: AddCertificateFormProps) => {
  const [formData, setFormData] = useState({
    type: "",
    issueDate: "",
    expiryDate: "",
    status: "active",
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificateFile(e.target.files[0]);
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

    // Generate a name based on certificate type if no name is provided
    const certificateName = `${formData.type} Certificaat`;

    // Format dates to DD-MM-YYYY
    const formattedData = {
      name: certificateName,
      ...formData,
      issueDate: formatDate(formData.issueDate),
      expiryDate: formatDate(formData.expiryDate),
    };

    // Add certificate to employee
    const success = addCertificateToEmployee(employeeId, formattedData);

    if (success) {
      toast({
        title: "Certificaat toegevoegd",
        description: `${certificateName} is succesvol toegevoegd.`,
      });
      onSuccess();
    } else {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het toevoegen van het certificaat.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type certificaat</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => handleSelectChange("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BHV">BHV</SelectItem>
              <SelectItem value="VCA">VCA</SelectItem>
              <SelectItem value="EHBO">EHBO</SelectItem>
              <SelectItem value="Heftruck">Heftruck</SelectItem>
              <SelectItem value="ISO">ISO</SelectItem>
              <SelectItem value="NEN">NEN</SelectItem>
              <SelectItem value="Anders">Anders</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="certificateFile">Upload certificaat (PDF)</Label>
          <div className="flex items-center gap-2">
            <Input
              id="certificateFile"
              name="certificateFile"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="flex-1"
            />
          </div>
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
