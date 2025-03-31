
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Plus, Building, ArrowRight, FileText, Clipboard } from "lucide-react";

// Demo data - in a real app, this would come from the API
const demoLocations = [
  { id: "1", name: "Hoofdkantoor Amsterdam", address: "Keizersgracht 123, 1015 CW Amsterdam" },
  { id: "2", name: "Productielocatie Rotterdam", address: "Maasvlakte 45, 3199 LK Rotterdam" },
  { id: "3", name: "Distributiecentrum Utrecht", address: "Industrieweg 78, 3542 AD Utrecht" },
];

const demoWorkplaces = [
  { id: "1", locationId: "1", name: "Kantoor", description: "Kantoorruimtes inclusief vergaderzalen" },
  { id: "2", locationId: "1", name: "Kantine", description: "Lunch- en pauzeruimte" },
  { id: "3", locationId: "1", name: "Receptie", description: "Ontvangstruimte bezoekers" },
  { id: "4", locationId: "2", name: "Productiehal", description: "Productie en assemblage" },
  { id: "5", locationId: "2", name: "Magazijn", description: "Opslag en logistiek" },
  { id: "6", locationId: "2", name: "Buitenterrein", description: "Parkeerplaats en laad/los zones" },
  { id: "7", locationId: "3", name: "Magazijn", description: "Opslag en logistiek" },
  { id: "8", locationId: "3", name: "Laadperron", description: "Laden en lossen van vrachtwagens" },
];

type SelectWorkplaceProps = {
  onWorkplaceSelect: (workplace: string) => void;
  selectedWorkplace: string | null;
};

export const SelectWorkplace = ({ onWorkplaceSelect, selectedWorkplace }: SelectWorkplaceProps) => {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");
  const [selectedLocation, setSelectedLocation] = useState<string>(demoLocations[0]?.id || "");
  const [showAddNewWorkplace, setShowAddNewWorkplace] = useState(false);
  const [showAddNewLocation, setShowAddNewLocation] = useState(false);
  
  const [newWorkplaceName, setNewWorkplaceName] = useState("");
  const [newWorkplaceDescription, setNewWorkplaceDescription] = useState("");
  
  const [newLocationName, setNewLocationName] = useState("");
  const [newLocationAddress, setNewLocationAddress] = useState("");
  
  // Filter workplaces based on selected location
  const filteredWorkplaces = demoWorkplaces.filter(
    workplace => workplace.locationId === selectedLocation
  );
  
  const form = useForm({
    defaultValues: {
      workplace: selectedWorkplace || ""
    }
  });
  
  const handleAddNewWorkplace = () => {
    if (newWorkplaceName.trim()) {
      // In a real app, this would make an API call to add the new workplace
      console.log("Adding new workplace:", newWorkplaceName, newWorkplaceDescription, "to location:", selectedLocation);
      setShowAddNewWorkplace(false);
      setNewWorkplaceName("");
      setNewWorkplaceDescription("");
    }
  };
  
  const handleAddNewLocation = () => {
    if (newLocationName.trim()) {
      // In a real app, this would make an API call to add the new location
      console.log("Adding new location:", newLocationName, newLocationAddress);
      setShowAddNewLocation(false);
      setNewLocationName("");
      setNewLocationAddress("");
    }
  };
  
  const onSubmit = (values: { workplace: string }) => {
    onWorkplaceSelect(values.workplace);
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-600 mb-4">
        Een RI&E moet worden opgesteld per bedrijfslocatie en per werkplek of afdeling. 
        Selecteer hieronder een bestaande locatie en werkplek, of maak een nieuwe aan.
      </p>
      
      <Tabs defaultValue="existing" value={activeTab} onValueChange={(value) => setActiveTab(value as "existing" | "new")}>
        <TabsList className="mb-4">
          <TabsTrigger value="existing">Bestaande RI&E bijwerken</TabsTrigger>
          <TabsTrigger value="new">Nieuwe RI&E opstellen</TabsTrigger>
        </TabsList>
        
        <TabsContent value="existing">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <FileText className="mr-2 text-compliblue" size={20} />
                <h3 className="text-lg font-medium">Recente RI&E's</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Selecteer een recent bijgewerkte RI&E om verder te gaan met bewerken
              </p>
              
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="cursor-pointer hover:bg-gray-50 transition-colors">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{demoLocations[i-1]?.name || `Locatie ${i}`}</h4>
                        <p className="text-sm text-gray-500">Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}</p>
                      </div>
                      <Button variant="outline" onClick={() => {
                        setSelectedLocation(i.toString());
                        setActiveTab("new");
                      }} className="flex items-center gap-2">
                        <Clipboard size={16} />
                        Bewerken
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="new">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Building className="mr-2 text-compliblue" size={20} />
                <h3 className="text-lg font-medium">Selecteer een bedrijfslocatie</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-9">
                    <Label htmlFor="location-select">Locatie</Label>
                    <Select 
                      value={selectedLocation} 
                      onValueChange={setSelectedLocation}
                    >
                      <SelectTrigger id="location-select">
                        <SelectValue placeholder="Selecteer een locatie" />
                      </SelectTrigger>
                      <SelectContent>
                        {demoLocations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-3 flex items-end">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setShowAddNewLocation(true)}
                    >
                      <Plus size={16} className="mr-2" />
                      Nieuwe locatie
                    </Button>
                  </div>
                </div>
                
                {selectedLocation && (
                  <div className="pt-2">
                    <p className="text-sm text-gray-500">
                      {demoLocations.find(l => l.id === selectedLocation)?.address || "Geen adres bekend"}
                    </p>
                  </div>
                )}
              </div>
              
              {showAddNewLocation && (
                <Card className="mt-4 border-dashed">
                  <CardContent className="pt-6">
                    <h4 className="font-medium mb-4">Nieuwe locatie toevoegen</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-location-name">Naam locatie</Label>
                        <Input 
                          id="new-location-name" 
                          value={newLocationName} 
                          onChange={(e) => setNewLocationName(e.target.value)} 
                          placeholder="Bijv. Hoofdkantoor Rotterdam"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-location-address">Adres</Label>
                        <Input 
                          id="new-location-address" 
                          value={newLocationAddress} 
                          onChange={(e) => setNewLocationAddress(e.target.value)} 
                          placeholder="Straat, huisnummer, postcode, plaats"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowAddNewLocation(false)}
                        >
                          Annuleren
                        </Button>
                        <Button 
                          className="bg-compliblue hover:bg-compliblue/90"
                          onClick={handleAddNewLocation}
                          disabled={!newLocationName.trim()}
                        >
                          Locatie toevoegen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
          
          {selectedLocation && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="workplace"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div className="flex items-center mb-2">
                            <FormLabel className="text-base font-medium">Selecteer een afdeling of werkplek</FormLabel>
                          </div>
                          <FormControl>
                            <RadioGroup
                              onValueChange={(value) => {
                                field.onChange(value);
                                onWorkplaceSelect(value);
                              }}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              {filteredWorkplaces.map((workplace) => (
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
                    
                    {!showAddNewWorkplace ? (
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2 mt-4"
                        onClick={() => setShowAddNewWorkplace(true)}
                      >
                        <Plus size={16} />
                        Nieuwe afdeling/werkplek toevoegen
                      </Button>
                    ) : (
                      <Card className="mt-4 border-dashed">
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
                                <Textarea 
                                  id="new-workplace-description" 
                                  value={newWorkplaceDescription} 
                                  onChange={(e) => setNewWorkplaceDescription(e.target.value)} 
                                  placeholder="Korte beschrijving van de afdeling/werkplek"
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2 pt-2">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setShowAddNewWorkplace(false)}
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
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-compliblue hover:bg-compliblue/90"
                    disabled={!form.watch("workplace")}
                  >
                    Volgende: Risico's inventariseren
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
