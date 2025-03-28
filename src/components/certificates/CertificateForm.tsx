
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

export const CertificateForm = () => {
  const [formData, setFormData] = useState({
    certificateName: "",
    type: "",
    employee: "",
    issueDate: "",
    expiryDate: "",
    certificateFile: null as File | null,
  });
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
      setFormData((prev) => ({ ...prev, certificateFile: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simuleer het opslaan van het certificaat
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Certificaat toegevoegd",
        description: "Het certificaat is succesvol toegevoegd.",
      });
      
      // Reset formulier
      setFormData({
        certificateName: "",
        type: "",
        employee: "",
        issueDate: "",
        expiryDate: "",
        certificateFile: null,
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="certificateName">Certificaat naam</Label>
          <Input
            id="certificateName"
            name="certificateName"
            value={formData.certificateName}
            onChange={handleInputChange}
            placeholder="Bijv. BHV Certificaat"
            required
          />
        </div>

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
          <Label htmlFor="employee">Medewerker</Label>
          <Select
            value={formData.employee}
            onValueChange={(value) => handleSelectChange("employee", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecteer medewerker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Jan Janssen">Jan Janssen</SelectItem>
              <SelectItem value="Pieter Pietersen">Pieter Pietersen</SelectItem>
              <SelectItem value="Maria Willemsen">Maria Willemsen</SelectItem>
              <SelectItem value="Klaas Klaassen">Klaas Klaassen</SelectItem>
              <SelectItem value="Organisatie">Organisatie (bedrijfscertificaat)</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="space-y-2">
          <Label htmlFor="certificateFile">Upload certificaat (PDF)</Label>
          <Input
            id="certificateFile"
            name="certificateFile"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline">
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
