import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Settings as SettingsIcon, 
  FileText, 
  Bell, 
  Users, 
  Link2,
  LayoutGrid
} from "lucide-react";
import { ModulesTab } from "@/components/settings/ModulesTab";

// Demo certificaat types
const certificateTypes = [
  { id: "1", name: "BHV", defaultReminder: 60, active: true },
  { id: "2", name: "VCA Basis", defaultReminder: 90, active: true },
  { id: "3", name: "VCA VOL", defaultReminder: 90, active: true },
  { id: "4", name: "EHBO", defaultReminder: 30, active: true },
  { id: "5", name: "Heftruck", defaultReminder: 60, active: true },
];

// Demo gebruikersrollen
const userRoles = [
  {
    id: "1",
    name: "Werkgeverbeheerder",
    description: "Volledige toegang tot alle modules en instellingen",
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Locatiebeheerder",
    description: "Toegang tot eigen locatiegegevens en medewerkers",
    permissions: ["view:all", "edit:certificates", "edit:safety", "edit:employees"],
  },
  {
    id: "3",
    name: "Medewerker",
    description: "Alleen inzage in eigen certificaten en PBM's",
    permissions: ["view:own"],
  },
  {
    id: "4",
    name: "Opleider",
    description: "Toegang tot eigen klanten, trainingen en certificaten",
    permissions: ["view:certificates", "edit:certificates"],
  },
];

// Demo HR-koppelingen
const hrConnections = [
  { id: "1", name: "AFAS", status: "Niet gekoppeld" },
  { id: "2", name: "Visma Raet", status: "Niet gekoppeld" },
  { id: "3", name: "Exact", status: "Niet gekoppeld" },
  { id: "4", name: "ADP", status: "Niet gekoppeld" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("certificates");
  const [reminderPeriods, setReminderPeriods] = useState({
    certificates: 60,
    pbm: 30,
    safety: 45,
    exercise: 14,
  });

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Instellingen</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="certificates" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Certificaten</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell size={16} />
                <span>Signaleringen</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users size={16} />
                <span>Gebruikers & Rollen</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Link2 size={16} />
                <span>Koppelingen</span>
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <LayoutGrid size={16} />
                <span>Modules</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="certificates" className="space-y-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Certificaten beheren</h2>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-compliblue hover:bg-compliblue/90">
                      Nieuw certificaattype toevoegen
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Certificaattype toevoegen</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="cert-name" className="text-sm font-medium">Naam certificaat</label>
                        <Input id="cert-name" placeholder="Bijv. BHV, VCA, etc." />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="cert-reminder" className="text-sm font-medium">Standaard herinneringstermijn (dagen)</label>
                        <Input id="cert-reminder" type="number" defaultValue={60} />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <input id="cert-active" type="checkbox" defaultChecked className="rounded" />
                        <label htmlFor="cert-active" className="text-sm font-medium">Actief</label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button className="bg-compliblue hover:bg-compliblue/90">
                        Toevoegen
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Certificaattypes</CardTitle>
                  <CardDescription>
                    Beheer welke certificaten in het systeem gebruikt kunnen worden
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-6">Naam</th>
                        <th className="text-left py-3 px-6">Herinneringstermijn</th>
                        <th className="text-left py-3 px-6">Status</th>
                        <th className="text-right py-3 px-6">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certificateTypes.map((type) => (
                        <tr key={type.id} className="border-b">
                          <td className="py-3 px-6">{type.name}</td>
                          <td className="py-3 px-6">{type.defaultReminder} dagen</td>
                          <td className="py-3 px-6">
                            {type.active ? 
                              <span className="badge-success">Actief</span> : 
                              <span className="badge-danger">Inactief</span>
                            }
                          </td>
                          <td className="py-3 px-6 text-right">
                            <Button variant="outline" size="sm" className="mr-2">
                              Bewerken
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              {type.active ? "Deactiveren" : "Activeren"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Signaleringen instellen</h2>
                <p className="text-gray-600">Bepaal wanneer u herinneringen wilt ontvangen voor verlopende items.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Algemene termijnen</CardTitle>
                    <CardDescription>
                      Stel algemene herinneringstermijnen in voor alle verschillende types
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Certificaten</label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={reminderPeriods.certificates} 
                          onChange={(e) => setReminderPeriods(prev => ({...prev, certificates: parseInt(e.target.value)}))}
                        />
                        <span className="text-gray-500">dagen</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">PBM's</label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={reminderPeriods.pbm} 
                          onChange={(e) => setReminderPeriods(prev => ({...prev, pbm: parseInt(e.target.value)}))}
                        />
                        <span className="text-gray-500">dagen</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Veiligheidsmiddelen</label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={reminderPeriods.safety} 
                          onChange={(e) => setReminderPeriods(prev => ({...prev, safety: parseInt(e.target.value)}))}
                        />
                        <span className="text-gray-500">dagen</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Oefeningen</label>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number" 
                          value={reminderPeriods.exercise} 
                          onChange={(e) => setReminderPeriods(prev => ({...prev, exercise: parseInt(e.target.value)}))}
                        />
                        <span className="text-gray-500">dagen</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-compliblue hover:bg-compliblue/90">
                      Opslaan
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Notificatie instellingen</CardTitle>
                    <CardDescription>
                      Kies hoe u op de hoogte wilt worden gehouden
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Notificatiekanalen</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input id="channel-dashboard" type="checkbox" defaultChecked className="rounded" />
                          <label htmlFor="channel-dashboard" className="text-sm">Dashboard</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input id="channel-email" type="checkbox" defaultChecked className="rounded" />
                          <label htmlFor="channel-email" className="text-sm">E-mail</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input id="channel-sms" type="checkbox" className="rounded" />
                          <label htmlFor="channel-sms" className="text-sm">SMS (premium)</label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">E-mail frequentie</h4>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue placeholder="Frequentie selecteren" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Direct bij signalering</SelectItem>
                          <SelectItem value="daily">Dagelijkse samenvatting</SelectItem>
                          <SelectItem value="weekly">Wekelijkse samenvatting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-compliblue hover:bg-compliblue/90">
                      Opslaan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Gebruikers & Rollen</h2>
                
                <div className="flex gap-2">
                  <Button variant="outline">
                    Nieuwe gebruiker
                  </Button>
                  <Button className="bg-compliblue hover:bg-compliblue/90">
                    Nieuwe rol aanmaken
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="bg-gray-50 border-b">
                  <CardTitle className="text-lg">Gebruikersrollen</CardTitle>
                  <CardDescription>
                    Beheer welke rollen en rechten gebruikers kunnen hebben in het systeem
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-6">Rol</th>
                        <th className="text-left py-3 px-6">Omschrijving</th>
                        <th className="text-right py-3 px-6">Acties</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userRoles.map((role) => (
                        <tr key={role.id} className="border-b">
                          <td className="py-3 px-6 font-medium">{role.name}</td>
                          <td className="py-3 px-6">{role.description}</td>
                          <td className="py-3 px-6 text-right">
                            <Button variant="outline" size="sm">
                              Bewerken
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">Koppelingen met externe systemen</h2>
                <p className="text-gray-600">Koppel CompliReady met uw HR-systeem om automatisch medewerkergegevens te synchroniseren.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hrConnections.map((connection) => (
                  <Card key={connection.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle>{connection.name}</CardTitle>
                      <CardDescription>
                        HR & Salarissysteem
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-amber-50 text-amber-800 rounded-md p-3 text-sm">
                        <p>Status: {connection.status}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-compliblue hover:bg-compliblue/90">
                        Koppeling configureren
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>API-integratie</CardTitle>
                  <CardDescription>
                    Voor ontwikkelaars: gebruik onze API om CompliReady te integreren met uw eigen systemen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">API-sleutel</h4>
                      <div className="flex items-center gap-2">
                        <Input type="password" value="•••••••••••••••••••••••••••••" readOnly />
                        <Button variant="outline" size="sm">Tonen</Button>
                        <Button variant="outline" size="sm">Vernieuwen</Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Bekijk onze <a href="#" className="text-compliblue hover:underline">API documentatie</a> voor meer informatie over het gebruik van onze API.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="modules" className="space-y-6">
              <ModulesTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Settings;
