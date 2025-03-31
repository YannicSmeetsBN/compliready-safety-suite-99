import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Phone, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  User,
  Bell
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { LocationSelector } from "@/components/common/LocationSelector";

const EmergencyCall = () => {
  const [activeTab, setActiveTab] = useState("call");
  const [emergencyInProgress, setEmergencyInProgress] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Demo BHV'ers
  const bhvMembers = [
    { id: "1", name: "Jan Janssen", department: "Administratie", certified: true, status: "available" },
    { id: "2", name: "Pieter Pietersen", department: "Productie", certified: true, status: "available" },
    { id: "3", name: "Maria Willemsen", department: "HR", certified: true, status: "unavailable" },
    { id: "4", name: "Klaas Klaassen", department: "Logistiek", certified: true, status: "available" },
  ];
  
  // Demo BHV-oproepen
  const callHistory = [
    { 
      id: "1", 
      date: "15-06-2023", 
      time: "14:32", 
      location: "Kantoor - 1e verdieping", 
      type: "EHBO",
      status: "Afgehandeld",
      responded: 3,
      details: "Medewerker onwel geworden, EHBO verleend."
    },
    { 
      id: "2", 
      date: "10-05-2023", 
      time: "09:15", 
      location: "Productiehal", 
      type: "Brand",
      status: "Afgehandeld",
      responded: 4,
      details: "Kleine brand bij machine 3, geblust met brandblusser."
    },
    { 
      id: "3", 
      date: "20-04-2023", 
      time: "11:45", 
      location: "Parkeerplaats", 
      type: "EHBO",
      status: "Afgehandeld",
      responded: 2,
      details: "Bezoeker gevallen, EHBO verleend."
    },
  ];
  
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
  
  const handleCancelEmergency = () => {
    setShowConfirmDialog(false);
    setEmergencyInProgress(false);
    toast({
      title: "BHV-oproep beëindigd",
      description: "De BHV-oproep is succesvol beëindigd.",
    });
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">BHV-Oproepsysteem</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="call" className="flex items-center gap-2">
                <Phone size={16} />
                <span>Oproep</span>
              </TabsTrigger>
              <TabsTrigger value="members" className="flex items-center gap-2">
                <User size={16} />
                <span>BHV'ers</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Historie</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="call" className="space-y-6">
              {emergencyInProgress ? (
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
              ) : (
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
              )}
              
              <Card>
                <CardHeader>
                  <CardTitle>Toekomstige ontwikkelingen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    In de toekomst zal het BHV-oproepsysteem worden uitgebreid met:
                  </p>
                  <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-1">
                    <li>Mobiele app voor directe notificaties op smartphones</li>
                    <li>GPS-locatiebepaling van BHV'ers</li>
                    <li>Automatische koppeling met alarmsystemen</li>
                    <li>Realtime communicatie tussen BHV'ers tijdens calamiteiten</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="members" className="space-y-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">BHV-team leden</h2>
                <Button className="bg-compliblue hover:bg-compliblue/90">
                  <User className="mr-2" size={16} />
                  BHV'er toevoegen
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bhvMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        {member.status === "available" ? (
                          <span className="badge-success">Beschikbaar</span>
                        ) : (
                          <span className="badge-danger">Niet beschikbaar</span>
                        )}
                      </div>
                      <CardDescription>{member.department}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2 pb-6">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">BHV Certificaat:</span>
                          <span className="text-green-600">Geldig tot 01-05-2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">EHBO:</span>
                          <span className="text-green-600">Geldig tot 15-08-2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Laatste training:</span>
                          <span>10-03-2023</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-3">
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1">
                          <FileText className="mr-2" size={16} />
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <CheckCircle className="mr-2" size={16} />
                          Status wijzigen
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Oproep historie</h2>
                <Button variant="outline">
                  <FileText className="mr-2" size={16} />
                  Exporteren
                </Button>
              </div>
              
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Historische BHV-oproepen</CardTitle>
                  <CardDescription>
                    Overzicht van alle BHV-oproepen in het verleden
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-6 flex items-center gap-2">
                          <Calendar size={16} />
                          <span>Datum</span>
                        </th>
                        <th className="text-left py-3 px-6">
                          <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>Tijd</span>
                          </div>
                        </th>
                        <th className="text-left py-3 px-6">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>Locatie</span>
                          </div>
                        </th>
                        <th className="text-left py-3 px-6">Type</th>
                        <th className="text-left py-3 px-6">Status</th>
                        <th className="text-right py-3 px-6">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {callHistory.map((call) => (
                        <tr key={call.id} className="border-b">
                          <td className="py-3 px-6">{call.date}</td>
                          <td className="py-3 px-6">{call.time}</td>
                          <td className="py-3 px-6">{call.location}</td>
                          <td className="py-3 px-6">
                            {call.type === "EHBO" ? (
                              <span className="badge-info">EHBO</span>
                            ) : call.type === "Brand" ? (
                              <span className="badge-danger">Brand</span>
                            ) : (
                              <span className="badge-warning">{call.type}</span>
                            )}
                          </td>
                          <td className="py-3 px-6">
                            <span className="badge-success">{call.status}</span>
                          </td>
                          <td className="py-3 px-6 text-right">
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>BHV-oproep beëindigen?</DialogTitle>
                <DialogDescription>
                  Weet u zeker dat u de huidige BHV-oproep wilt beëindigen? 
                  Dit zal alle BHV'ers informeren dat hun hulp niet meer nodig is.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
                  <XCircle className="mr-2" size={16} />
                  Annuleren
                </Button>
                <Button variant="destructive" onClick={handleCancelEmergency}>
                  <CheckCircle className="mr-2" size={16} />
                  Beëindigen
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default EmergencyCall;
