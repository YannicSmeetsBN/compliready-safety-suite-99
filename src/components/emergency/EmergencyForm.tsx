
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LocationSelector } from "@/components/common/LocationSelector";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Phone, User, CheckCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BhvMember } from "./types";

interface EmergencyFormProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setEmergencyInProgress: (inProgress: boolean) => void;
  bhvMembers: BhvMember[];
}

export const EmergencyForm = ({ 
  selectedLocation, 
  setSelectedLocation, 
  setEmergencyInProgress,
  bhvMembers 
}: EmergencyFormProps) => {
  
  const handleEmergencyCall = () => {
    if (!selectedLocation) {
      toast({
        title: "Locatie ontbreekt",
        description: "Selecteer eerst een locatie voordat u een BHV-oproep activeert.",
        variant: "destructive",
      });
      return;
    }
    
    setEmergencyInProgress(true);
    toast({
      title: "BHV-oproep geactiveerd!",
      description: "Alle beschikbare BHV'ers zijn gealarmeerd.",
      variant: "destructive",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>BHV-oproep activeren</CardTitle>
        <CardDescription>
          Gebruik deze functie alleen in geval van een noodsituatie om alle BHV'ers direct te alarmeren
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Type noodsituatie</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer type noodsituatie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="medical">EHBO / Medisch</SelectItem>
              <SelectItem value="fire">Brand</SelectItem>
              <SelectItem value="evacuation">Ontruiming</SelectItem>
              <SelectItem value="other">Overig</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Locatie</label>
          <LocationSelector 
            value={selectedLocation}
            onChange={setSelectedLocation}
            placeholder="Selecteer een locatie"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Specifieke plaats</label>
          <div className="flex items-center gap-2">
            <Input placeholder="Bijv. Kantoor - 1e verdieping" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Beschrijving situatie</label>
          <Textarea placeholder="Geef een korte beschrijving van de noodsituatie..." />
        </div>
        
        <div className="rounded-lg border p-4 bg-gray-50">
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <User size={16} />
            <span>Beschikbare BHV'ers</span>
          </h3>
          <div className="space-y-2">
            {bhvMembers
              .filter(member => member.status === "available")
              .map(member => (
                <div key={member.id} className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span>{member.name} ({member.department})</span>
                </div>
              ))
            }
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={handleEmergencyCall}
        >
          <Phone className="mr-2" size={16} />
          BHV-oproep activeren
        </Button>
      </CardFooter>
    </Card>
  );
};
