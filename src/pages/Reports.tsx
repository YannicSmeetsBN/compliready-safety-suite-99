import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Users, 
  Bell, 
  Calendar, 
  Download, 
  FileSpreadsheet, 
  BarChart, 
  PieChart, 
  Filter, 
  FileIcon, 
  Shield, 
  Award,
  BookOpen,
  Calendar as CalendarIcon,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MapPin
} from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { LocationSelector, getLocations } from "@/components/common/LocationSelector";
import { Label } from "@/components/ui/label";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [openReportDialog, setOpenReportDialog] = useState<string | null>(null);
  
  const filteredReports = demoReports.filter(report => {
    if (selectedReportType && report.type !== selectedReportType) return false;
    return true;
  });

  const renderReportDetail = () => {
    switch (openReportDialog) {
      case "bhv-coverage":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">BHV-dekking per locatie</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporteren
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3">Locatie</th>
                    <th className="text-center p-3">Medewerkers</th>
                    <th className="text-center p-3">BHV'ers benodigd</th>
                    <th className="text-center p-3">BHV'ers beschikbaar</th>
                    <th className="text-center p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bhvCoverageData.map((location) => (
                    <tr key={location.locationId} className="border-b">
                      <td className="p-3">{location.locationName}</td>
                      <td className="text-center p-3">{location.employees}</td>
                      <td className="text-center p-3">{location.bhvRequired}</td>
                      <td className="text-center p-3">{location.bhvAvailable}</td>
                      <td className="text-center p-3">
                        {location.status === "sufficient" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Voldoende
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Onvoldoende
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex items-start">
                <AlertTriangle className="text-yellow-600 mr-3 mt-0.5" size={18} />
                <div>
                  <h4 className="font-medium text-yellow-800">Let op</h4>
                  <p className="text-sm text-yellow-700">
                    Volgens de Arbowet moet iedere werkgever beschikken over voldoende BHV'ers om adequate 
                    hulpverlening te kunnen bieden. De norm is minimaal 1 BHV'er per 50 medewerkers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "compliance-scorecard":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Compliance Scorecard</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporteren
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left p-3">Locatie</th>
                    <th className="text-center p-3">Certificaten</th>
                    <th className="text-center p-3">PBM's</th>
                    <th className="text-center p-3">Trainingen</th>
                    <th className="text-center p-3">E-learning</th>
                    <th className="text-center p-3">Totaalscore</th>
                  </tr>
                </thead>
                <tbody>
                  {complianceScoreData.map((location) => (
                    <tr key={location.locationId} className="border-b">
                      <td className="p-3">{location.locationName}</td>
                      <td className="text-center p-3">
                        <ScoreIndicator score={location.certificateScore} />
                      </td>
                      <td className="text-center p-3">
                        <ScoreIndicator score={location.pbmScore} />
                      </td>
                      <td className="text-center p-3">
                        <ScoreIndicator score={location.trainingScore} />
                      </td>
                      <td className="text-center p-3">
                        <ScoreIndicator score={location.elearningScore} />
                      </td>
                      <td className="text-center p-3">
                        <div className="font-semibold">
                          <ScoreIndicator score={location.totalScore} showValue />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Legenda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span>90-100%: Uitstekend</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-300 rounded-full mr-2"></span>
                      <span>80-89%: Goed</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
                      <span>70-79%: Voldoende</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span>
                      <span>60-69%: Matig</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                      <span>0-59%: Onvoldoende</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Toelichting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600">
                    De compliance score geeft aan in hoeverre de organisatie voldoet aan gestelde eisen en 
                    regelgeving. De score is gebaseerd op verschillende componenten:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc pl-5 mt-2 space-y-1">
                    <li>Certificaten: % medewerkers met geldige en up-to-date certificaten</li>
                    <li>PBM's: % correct uitgegeven en gekeurde persoonlijke beschermingsmiddelen</li>
                    <li>Trainingen: % medewerkers die vereiste trainingen hebben gevolgd</li>
                    <li>E-learning: % voltooide verplichte e-learning modules</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        );
        
      case "training-planning":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Opleidingsplanning rapport</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Selecteer periode
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporteren
                </Button>
              </div>
            </div>
            
            {trainingPlanningData.map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-3 border-b">
                  <div className="flex justify-between items-center">
                    <CardTitle>{training.title}</CardTitle>
                    <div className="text-sm font-medium text-gray-500 flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1" /> {training.date}
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span>Locatie: {training.location}</span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {training.registeredSpots}/{training.totalSpots} plekken gevuld
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Ingeschreven medewerkers:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {training.registeredEmployees.map((employee, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle2 className="h-3 w-3 text-green-500 mr-1" />
                          {employee}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-gray-50 border-t">
                  <div className="flex justify-between w-full">
                    <span className="text-sm text-gray-500">
                      Nog {training.totalSpots - training.registeredSpots} beschikbare plekken
                    </span>
                    <Button size="sm" variant="outline">
                      Medewerkers toevoegen
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  const ScoreIndicator = ({ score, showValue = false }: { score: number, showValue?: boolean }) => {
    let bgColor = "";
    
    if (score >= 90) bgColor = "bg-green-500";
    else if (score >= 80) bgColor = "bg-green-300";
    else if (score >= 70) bgColor = "bg-yellow-400";
    else if (score >= 60) bgColor = "bg-red-400";
    else bgColor = "bg-red-600";
    
    return (
      <div className="flex items-center justify-center">
        <span className={`w-3 h-3 ${bgColor} rounded-full mr-2`}></span>
        {showValue && <span>{score}%</span>}
      </div>
    );
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

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
                  <ChevronDown size={14} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96">
                <div className="space-y-4 p-1">
                  <div className="space-y-2">
                    <Label>Type rapport</Label>
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
                        <SelectItem value="bhv">BHV</SelectItem>
                        <SelectItem value="compliance">Compliance</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Locatie</Label>
                    <Select value={selectedLocation || ""} onValueChange={(value) => setSelectedLocation(value || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alle locaties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Alle locaties</SelectItem>
                        {getLocations().map(location => (
                          <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alle statussen" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Alle statussen</SelectItem>
                        <SelectItem value="active">Actief</SelectItem>
                        <SelectItem value="expired">Verlopen</SelectItem>
                        <SelectItem value="expiring">Bijna verlopen</SelectItem>
                        <SelectItem value="action">Actie vereist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Periode</Label>
                    <DatePickerWithRange 
                      date={dateRange} 
                      setDate={handleDateRangeChange} 
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedReportType(null);
                        setSelectedLocation(null);
                        setSelectedStatus(null);
                        setDateRange({
                          from: new Date(),
                          to: addDays(new Date(), 30),
                        });
                      }}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Wissen
                    </Button>
                    <Button size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Toepassen
                    </Button>
                  </div>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => {
                        if (report.id === "9") setOpenReportDialog("bhv-coverage");
                        else if (report.id === "10") setOpenReportDialog("compliance-scorecard");
                        else if (report.id === "11") setOpenReportDialog("training-planning");
                      }}
                    >
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
                            <FileIcon className="mr-2" size={16} />
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
          
          <Dialog open={!!openReportDialog} onOpenChange={() => setOpenReportDialog(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {openReportDialog === "bhv-coverage" && "BHV-dekking per locatie"}
                  {openReportDialog === "compliance-scorecard" && "Compliance Scorecard"}
                  {openReportDialog === "training-planning" && "Opleidingsplanning rapport"}
                </DialogTitle>
                <DialogDescription>
                  Gedetailleerd overzicht van de rapportgegevens
                </DialogDescription>
              </DialogHeader>
              {renderReportDetail()}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Reports;
