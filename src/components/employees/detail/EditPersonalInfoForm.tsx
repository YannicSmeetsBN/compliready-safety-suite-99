
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { updateEmployeePersonalInfo } from "@/data/dataManager";

interface EditPersonalInfoFormProps {
  employee: any;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EditPersonalInfoForm = ({ 
  employee, 
  onSuccess, 
  onCancel 
}: EditPersonalInfoFormProps) => {
  const [formData, setFormData] = useState({
    function: employee.function || "",
    department: employee.department || "",
    birthDate: employee.birthDate || "",
    startDate: employee.startDate || "",
    email: employee.email || "",
    phone: employee.phone || "",
    personalInfo: {
      address: employee.personalInfo?.address || "",
      postalCode: employee.personalInfo?.postalCode || "",
      city: employee.personalInfo?.city || "",
      emergencyContact: employee.personalInfo?.emergencyContact || "",
      emergencyPhone: employee.personalInfo?.emergencyPhone || "",
    }
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle nested personalInfo fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Update employee information
    const success = updateEmployeePersonalInfo(employee.id, formData);

    if (success) {
      toast({
        title: "Gegevens bijgewerkt",
        description: "De persoonlijke gegevens zijn succesvol bijgewerkt.",
      });
      onSuccess();
    } else {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het bijwerken van de gegevens.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basisgegevens</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="function">Functie</Label>
              <Input
                id="function"
                name="function"
                value={formData.function}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Afdeling</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate">Geboortedatum</Label>
              <Input
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">In dienst sinds</Label>
              <Input
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contactgegevens</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefoon</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="personalInfo.address">Adres</Label>
              <Input
                id="personalInfo.address"
                name="personalInfo.address"
                value={formData.personalInfo.address}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="personalInfo.postalCode">Postcode</Label>
                <Input
                  id="personalInfo.postalCode"
                  name="personalInfo.postalCode"
                  value={formData.personalInfo.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="personalInfo.city">Plaats</Label>
                <Input
                  id="personalInfo.city"
                  name="personalInfo.city"
                  value={formData.personalInfo.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Noodcontact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personalInfo.emergencyContact">Contactpersoon</Label>
              <Input
                id="personalInfo.emergencyContact"
                name="personalInfo.emergencyContact"
                value={formData.personalInfo.emergencyContact}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="personalInfo.emergencyPhone">Telefoonnummer</Label>
              <Input
                id="personalInfo.emergencyPhone"
                name="personalInfo.emergencyPhone"
                value={formData.personalInfo.emergencyPhone}
                onChange={handleInputChange}
              />
            </div>
          </div>
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
