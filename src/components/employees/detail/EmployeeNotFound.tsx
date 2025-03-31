
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const EmployeeNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="outline" 
        className="mb-6"
        onClick={() => navigate("/employees")}
      >
        <ChevronLeft className="mr-2" size={16} />
        Terug naar overzicht
      </Button>
      <Card>
        <CardContent className="pt-6 flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <p>Medewerker niet gevonden.</p>
            <Button 
              className="mt-4 bg-compliblue hover:bg-compliblue/90"
              onClick={() => navigate("/employees")}
            >
              Terug naar overzicht
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
