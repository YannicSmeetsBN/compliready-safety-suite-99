
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EmployeePersonalInfoProps {
  employee: any;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export const EmployeePersonalInfo = ({ 
  employee, 
  isEditing, 
  setIsEditing 
}: EmployeePersonalInfoProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <User className="mr-2" size={20} />
          Persoonlijke gegevens
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(true)}
        >
          <Edit className="mr-2" size={16} />
          Bewerken
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">{employee.name}</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500">Functie:</span>
                <span>{employee.function}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Afdeling:</span>
                <span>{employee.department}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Geboortedatum:</span>
                <span>{employee.birthDate}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">In dienst sinds:</span>
                <span>{employee.startDate}</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactgegevens</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500">E-mail:</span>
                <span className="text-compliblue">{employee.email}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Telefoon:</span>
                <span>{employee.phone}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Adres:</span>
                <span>{employee.personalInfo.address}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Postcode/Plaats:</span>
                <span>{employee.personalInfo.postalCode} {employee.personalInfo.city}</span>
              </p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Noodcontact</h3>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-500">Contactpersoon:</span>
                <span>{employee.personalInfo.emergencyContact}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Telefoonnummer:</span>
                <span>{employee.personalInfo.emergencyPhone}</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
