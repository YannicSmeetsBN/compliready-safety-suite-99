
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Bell, CheckCircle } from "lucide-react";

interface ActiveEmergencyCardProps {
  setShowConfirmDialog: (show: boolean) => void;
}

export const ActiveEmergencyCard = ({ setShowConfirmDialog }: ActiveEmergencyCardProps) => {
  return (
    <Card className="border-red-300 bg-red-50">
      <CardHeader className="bg-red-100 border-b border-red-200">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-red-600" size={24} />
          <CardTitle className="text-red-600">BHV-oproep actief!</CardTitle>
        </div>
        <CardDescription className="text-red-700">
          Er is momenteel een BHV-oproep actief. Alle beschikbare BHV'ers zijn gealarmeerd.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">Responsstatus:</h3>
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <div className="flex justify-between mb-2">
                <span>Beschikbare BHV'ers:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Bevestigde komst:</span>
                <span className="font-medium text-green-600">2</span>
              </div>
              <div className="flex justify-between">
                <span>Afgemeld:</span>
                <span className="font-medium text-red-600">0</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700">BHV'ers onderweg:</h3>
            <div className="bg-white p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Jan Janssen (Administratie)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={16} />
                <span>Pieter Pietersen (Productie)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => setShowConfirmDialog(true)}
        >
          <Bell className="mr-2" size={16} />
          BHV-oproep beëindigen
        </Button>
      </CardFooter>
    </Card>
  );
};
