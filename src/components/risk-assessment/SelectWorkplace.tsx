
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

// Demo data - in a real app, this would come from the API
const demoWorkplaces = [
  { id: "1", name: "Kantoor", description: "Kantoorruimtes inclusief vergaderzalen" },
  { id: "2", name: "Productiehal", description: "Productie en assemblage" },
  { id: "3", name: "Magazijn", description: "Opslag en logistiek" },
  { id: "4", name: "Buitenterrein", description: "Parkeerplaats en laad/los zones" },
];

type SelectWorkplaceProps = {
  onWorkplaceSelect: (workplace: string) => void;
  selectedWorkplace: string | null;
};

export const SelectWorkplace = ({ onWorkplaceSelect, selectedWorkplace }: SelectWorkplaceProps) => {
  const [showAddNew, setShowAddNew] = useState(false);
  const [newWorkplaceName, setNewWorkplaceName] = useState("");
  const [newWorkplaceDescription, setNewWorkplaceDescription] = useState("");
  
  const form = useForm({
    defaultValues: {
      workplace: selectedWorkplace || ""
    }
  });
  
  const handleAddNewWorkplace = () => {
    if (newWorkplaceName.trim()) {
      // In a real app, this would make an API call to add the new workplace
      console.log("Adding new workplace:", newWorkplaceName, newWorkplaceDescription);
      setShowAddNew(false);
      setNewWorkplaceName("");
      setNewWorkplaceDescription("");
    }
  };
  
  const onSubmit = (values: { workplace: string }) => {
    onWorkplaceSelect(values.workplace);
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="workplace"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-base font-medium">Selecteer een afdeling of werkplek</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      onWorkplaceSelect(value);
                    }}
                    defaultValue={field.value}
                    className="space-y-3"
                  >
                    {demoWorkplaces.map((workplace) => (
                      <div key={workplace.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={workplace.id} id={`workplace-${workplace.id}`} />
                        <Label
                          htmlFor={`workplace-${workplace.id}`}
                          className="flex flex-col cursor-pointer"
                        >
                          <span className="font-medium">{workplace.name}</span>
                          <span className="text-sm text-gray-500">{workplace.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      {!showAddNew ? (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setShowAddNew(true)}
        >
          <Plus size={16} />
          Nieuwe afdeling/werkplek toevoegen
        </Button>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h3 className="text-base font-medium">Nieuwe afdeling/werkplek toevoegen</h3>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="new-workplace-name">Naam</Label>
                  <Input 
                    id="new-workplace-name" 
                    value={newWorkplaceName} 
                    onChange={(e) => setNewWorkplaceName(e.target.value)} 
                    placeholder="Bijv. Werkplaats"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-workplace-description">Omschrijving</Label>
                  <Input 
                    id="new-workplace-description" 
                    value={newWorkplaceDescription} 
                    onChange={(e) => setNewWorkplaceDescription(e.target.value)} 
                    placeholder="Korte beschrijving van de afdeling/werkplek"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddNew(false)}
                  >
                    Annuleren
                  </Button>
                  <Button 
                    className="bg-compliblue hover:bg-compliblue/90"
                    onClick={handleAddNewWorkplace}
                    disabled={!newWorkplaceName.trim()}
                  >
                    Toevoegen
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
