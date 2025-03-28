
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Bell, Calendar, Download, FilePdf, FileSpreadsheet, BarChart, PieChart, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  
  // Demo rapporten
  const reports = [
    {
      id: "1",
      title: "Certificaten overzicht",
      description: "Overzicht van alle certificaten en hun status",
      icon: <FileText className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 02-07-2023",
      type: "certificate",
    },
    {
      id: "2",
      title: "Verlopende certificaten",
      description: "Certificaten die binnen 60 dagen verlopen",
      icon: <FileText className="text-amber-500" size={24} />,
      updated: "Laatst gegenereerd: 01-07-2023",
      type: "certificate",
    },
    {
      id: "3",
      title: "Medewerkers met certificaten",
      description: "Overzicht per medewerker en hun certificaten",
      icon: <Users className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 30-06-2023",
      type: "certificate",
    },
    {
      id: "4",
      title: "PBM's overzicht",
      description: "Alle uitgegeven PBM's en hun status",
      icon: <Bell className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 28-06-2023",
      type: "pbm",
    },
    {
      id: "5",
      title: "Veiligheidsmiddelen status",
      description: "Status en keuringsdata van alle veiligheidsmiddelen",
      icon: <Bell className="text-green-500" size={24} />,
      updated: "Laatst gegenereerd: 25-06-2023",
      type: "safety",
    },
    {
      id: "6",
      title: "Incidenten rapport",
      description: "Overzicht van alle geregistreerde incidenten",
      icon: <FileText className="text-red-500" size={24} />,
      updated: "Laatst gegenereerd: 15-06-2023",
      type: "incident",
    },
    {
      id: "7",
      title: "Oefeningen planning",
      description: "Planning en status van alle veiligheidsoefeningen",
      icon: <Calendar className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 10-06-2023",
      type: "exercise",
    },
    {
      id: "8",
      title: "Audit rapport",
      description: "Volledig rapport voor externe audits",
      icon: <BarChart className="text-purple-500" size={24} />,
      updated: "Laatst gegenereerd: 01-06-2023",
      type: "audit",
    },
  ];

  const filteredReports = selectedReportType
    ? reports.filter(report => report.type === selectedReportType)
    : reports;

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Rapportages</h1>
          
          <div className="flex justify-between mb-6">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={16} />
                  <span>Filter rapportages</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h3 className="font-medium">Filter op type</h3>
                  <Select value={selectedReportType || ""} onValueChange={(value) => setSelectedReportType(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer type rapport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Alle rapporten</SelectItem>
                      <SelectItem value="certificate">Certificaten</SelectItem>
                      <SelectItem value="pbm">PBM's</SelectItem>
                      <SelectItem value="safety">Veiligheidsmiddelen</SelectItem>
                      <SelectItem value="incident">Incidenten</SelectItem>
                      <SelectItem value="exercise">Oefeningen</SelectItem>
                      <SelectItem value="audit">Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
            
            <Button className="bg-compliblue hover:bg-compliblue/90">
              <PieChart className="mr-2" size={16} />
              Nieuw rapport genereren
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    {report.icon}
                  </div>
                  <CardDescription>{report.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-500">{report.updated}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1">
                      <PieChart className="mr-2" size={16} />
                      Bekijken
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="mr-2" size={16} />
                          Exporteren
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="space-y-2">
                          <Button variant="ghost" className="w-full justify-start">
                            <FilePdf className="mr-2" size={16} />
                            Exporteren als PDF
                          </Button>
                          <Button variant="ghost" className="w-full justify-start">
                            <FileSpreadsheet className="mr-2" size={16} />
                            Exporteren als Excel
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
