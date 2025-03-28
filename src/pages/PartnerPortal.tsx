
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload, FilePlus, RefreshCw, UserPlus, Calendar } from "lucide-react";

const PartnerPortal = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <div className="flex justify-between items-center mb-6">
            <h1 className="page-title">Partnerportaal</h1>
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <UserPlus className="mr-2 h-4 w-4" />
              Nieuwe klant aandragen
            </Button>
          </div>

          <Tabs defaultValue="clients">
            <TabsList className="mb-6">
              <TabsTrigger value="clients">Klant- en medewerkerbeheer</TabsTrigger>
              <TabsTrigger value="trainings">Trainingen plannen</TabsTrigger>
              <TabsTrigger value="certificates">Certificaten</TabsTrigger>
              <TabsTrigger value="contracts">Contractbeheer</TabsTrigger>
            </TabsList>

            <TabsContent value="clients">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Klanten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Totaal aantal klanten</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Actieve klanten</p>
                        <p className="text-xl font-bold text-green-600">10</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Inactieve klanten</p>
                        <p className="text-xl font-bold text-orange-500">2</p>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Klant toevoegen
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Kritieke certificaten</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Verlopen certificaten</p>
                        <p className="text-xl font-bold text-red-600">8</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Bijna verlopen (30 dagen)</p>
                        <p className="text-xl font-bold text-orange-500">14</p>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        <FilePlus className="mr-2 h-4 w-4" />
                        Certificaten beheren
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Acties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Button className="w-full" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        CSV importeren
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Calendar className="mr-2 h-4 w-4" />
                        Training plannen
                      </Button>
                      <Button className="w-full" variant="outline">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Certificaten vernieuwen
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trainings">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Trainingen plannen</CardTitle>
                    <div className="flex gap-4">
                      <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        CSV importeren
                      </Button>
                      <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Training toevoegen
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Beheer de trainingen voor uw klanten</p>
                  <div className="rounded-md border border-border">
                    <div className="p-4 text-center text-muted-foreground">
                      Geen trainingen gepland. Plan een nieuwe training of importeer een CSV-bestand.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certificates">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Certificaatbeheer</CardTitle>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Certificaat uploaden
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Bekijk en beheer certificaten van uw klanten</p>
                  <div className="rounded-md border border-border">
                    <div className="p-4 text-center text-muted-foreground">
                      U kunt hier de certificaten van uw klanten beheren en nieuwe certificaten uploaden.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contracts">
              <Card>
                <CardHeader>
                  <CardTitle>Contractbeheer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Beheer de contracten van uw klanten</p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Actieve contracten</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-green-600">8</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verlenging binnen 30 dagen</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-orange-500">3</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Verlopen contracten</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-4xl font-bold text-red-600">1</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PartnerPortal;
