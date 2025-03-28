
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Bell, Calendar, Download, BarChart, PieChart } from "lucide-react";

const Reports = () => {
  // Demo rapporten
  const reports = [
    {
      id: "1",
      title: "Certificaten overzicht",
      description: "Overzicht van alle certificaten en hun status",
      icon: <FileText className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 02-07-2023",
    },
    {
      id: "2",
      title: "Verlopende certificaten",
      description: "Certificaten die binnen 60 dagen verlopen",
      icon: <FileText className="text-amber-500" size={24} />,
      updated: "Laatst gegenereerd: 01-07-2023",
    },
    {
      id: "3",
      title: "Medewerkers met certificaten",
      description: "Overzicht per medewerker en hun certificaten",
      icon: <Users className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 30-06-2023",
    },
    {
      id: "4",
      title: "PBM's overzicht",
      description: "Alle uitgegeven PBM's en hun status",
      icon: <Bell className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 28-06-2023",
    },
    {
      id: "5",
      title: "Veiligheidsmiddelen status",
      description: "Status en keuringsdata van alle veiligheidsmiddelen",
      icon: <Bell className="text-green-500" size={24} />,
      updated: "Laatst gegenereerd: 25-06-2023",
    },
    {
      id: "6",
      title: "Incidenten rapport",
      description: "Overzicht van alle geregistreerde incidenten",
      icon: <FileText className="text-red-500" size={24} />,
      updated: "Laatst gegenereerd: 15-06-2023",
    },
    {
      id: "7",
      title: "Oefeningen planning",
      description: "Planning en status van alle veiligheidsoefeningen",
      icon: <Calendar className="text-compliblue" size={24} />,
      updated: "Laatst gegenereerd: 10-06-2023",
    },
    {
      id: "8",
      title: "Audit rapport",
      description: "Volledig rapport voor externe audits",
      icon: <BarChart className="text-purple-500" size={24} />,
      updated: "Laatst gegenereerd: 01-06-2023",
    },
  ];

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Rapportages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reports.map((report) => (
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
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-2" size={16} />
                      Exporteren
                    </Button>
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
