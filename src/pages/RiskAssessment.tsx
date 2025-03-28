
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, FileText, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RiskAssessment = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  
  // Demo RI&E rapporten
  const reports = [
    {
      id: "1",
      title: "RI&E Kantooromgeving",
      date: "15-06-2023",
      expires: "15-06-2025", 
      status: "active",
      risksIdentified: 12,
      risksResolved: 8,
    },
    {
      id: "2",
      title: "RI&E Productiehal",
      date: "20-01-2023",
      expires: "20-01-2025",
      status: "active",
      risksIdentified: 18,
      risksResolved: 10,
    }
  ];
  
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    // Simuleer een API call om een rapport te genereren
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
    }, 3000);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">RI&E Generator</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <AlertTriangle size={16} />
                <span>Generator</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <FileText size={16} />
                <span>Rapportages</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>RI&E Generator</CardTitle>
                  <CardDescription>
                    Genereer automatisch een Risico-Inventarisatie & Evaluatie rapport op basis van uw input
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!reportGenerated ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Naam van de RI&E</label>
                        <Input placeholder="Bijv. RI&E Kantooromgeving" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Afdeling / Locatie</label>
                        <Input placeholder="Bijv. Hoofdkantoor Amsterdam" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Type werkzaamheden</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecteer type werkzaamheden" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office">Kantoorwerkzaamheden</SelectItem>
                            <SelectItem value="production">Productiewerkzaamheden</SelectItem>
                            <SelectItem value="logistics">Logistieke werkzaamheden</SelectItem>
                            <SelectItem value="construction">Bouwwerkzaamheden</SelectItem>
                            <SelectItem value="other">Anders</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Aantal medewerkers</label>
                        <Input type="number" min={1} placeholder="Bijv. 25" />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Beschrijf de belangrijkste activiteiten</label>
                        <Textarea placeholder="Geef een korte beschrijving van de werkzaamheden die worden uitgevoerd..." />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Zijn er speciale machines of apparatuur in gebruik?</label>
                        <Textarea placeholder="Beschrijf eventuele machines, apparatuur of gereedschappen..." />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bekende veiligheidsrisico's</label>
                        <Textarea placeholder="Beschrijf eventuele bekende risico's..." />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center flex-col p-6 bg-green-50 rounded-lg">
                        <CheckCircle className="text-green-500 mb-4" size={48} />
                        <h3 className="text-xl font-medium text-green-700">RI&E Rapport Gegenereerd!</h3>
                        <p className="text-center text-green-600 mt-2">
                          Het rapport is succesvol gegenereerd en klaar voor gebruik.
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-2">RI&E Samenvatting</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Aantal geïdentificeerde risico's:</span>
                            <span className="font-medium">14</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Hoge prioriteit risico's:</span>
                            <span className="font-medium text-red-600">3</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Middelhoge prioriteit risico's:</span>
                            <span className="font-medium text-amber-600">7</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Lage prioriteit risico's:</span>
                            <span className="font-medium text-green-600">4</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button variant="outline" className="flex-1">
                          <FileText className="mr-2" size={16} />
                          Bekijk volledig rapport
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Download className="mr-2" size={16} />
                          Download als PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                {!reportGenerated && (
                  <CardFooter>
                    <Button 
                      className="bg-compliblue hover:bg-compliblue/90 w-full"
                      onClick={handleGenerateReport}
                      disabled={generatingReport}
                    >
                      {generatingReport ? (
                        <>
                          <div className="spinner mr-2"></div>
                          RI&E Rapport Genereren...
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="mr-2" size={16} />
                          RI&E Rapport Genereren
                        </>
                      )}
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="reports" className="space-y-6">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Bestaande RI&E Rapporten</h2>
                <Button className="bg-compliblue hover:bg-compliblue/90" onClick={() => setActiveTab("generator")}>
                  <AlertTriangle className="mr-2" size={16} />
                  Nieuw rapport maken
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>{report.title}</CardTitle>
                        <span className={`badge-${report.status === 'active' ? 'success' : 'danger'}`}>
                          {report.status === 'active' ? 'Actief' : 'Verlopen'}
                        </span>
                      </div>
                      <CardDescription>
                        Aangemaakt op: {report.date} | Geldig tot: {report.expires}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Geïdentificeerde risico's:</span>
                          <span className="font-medium">{report.risksIdentified}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Opgeloste risico's:</span>
                          <span className="font-medium">{report.risksResolved}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Openstaande risico's:</span>
                          <span className="font-medium text-amber-600">{report.risksIdentified - report.risksResolved}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                          <div 
                            className="bg-green-500 h-2.5 rounded-full" 
                            style={{ width: `${(report.risksResolved / report.risksIdentified) * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">
                          {Math.round((report.risksResolved / report.risksIdentified) * 100)}% voltooid
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <FileText className="mr-2" size={16} />
                        Bekijken
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Download className="mr-2" size={16} />
                        Downloaden
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RiskAssessment;
