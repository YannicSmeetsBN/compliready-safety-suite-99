
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Upload, 
  Filter, 
  Plus, 
  Edit, 
  Trash,
  ExternalLink,
  AlertTriangle
} from "lucide-react";

import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";

// Import existing RI&E components to maintain functionality
import { SelectWorkplace } from "@/components/risk-assessment/SelectWorkplace";
import { IdentifyRisks } from "@/components/risk-assessment/IdentifyRisks";
import { EvaluateRisks } from "@/components/risk-assessment/EvaluateRisks";
import { ActionPlan } from "@/components/risk-assessment/ActionPlan";
import { Dashboard } from "@/components/risk-assessment/Dashboard";

// Document types
type DocumentStatus = "actueel" | "verlopen" | "in-revisie";

type Document = {
  id: string;
  title: string;
  type: string;
  location?: string;
  expiryDate?: string;
  downloadUrl: string;
  status: DocumentStatus;
};

// Sample document data for demonstration
const sampleDocuments: Record<string, Document[]> = {
  'rie': [
    {
      id: "doc-1",
      title: "RI&E Kantoor Amsterdam",
      type: "RI&E",
      location: "Amsterdam",
      expiryDate: "2025-05-01",
      downloadUrl: "#",
      status: "actueel"
    },
    {
      id: "doc-2",
      title: "Plan van Aanpak Magazijn",
      type: "Plan van Aanpak",
      location: "Rotterdam",
      expiryDate: "2024-12-31",
      downloadUrl: "#",
      status: "in-revisie"
    }
  ],
  'beleid': [
    {
      id: "doc-3",
      title: "Veiligheidsbeleid 2024",
      type: "Beleid",
      expiryDate: "2025-01-01",
      downloadUrl: "#",
      status: "actueel"
    },
    {
      id: "doc-4",
      title: "Privacybeleid",
      type: "Beleid",
      downloadUrl: "#",
      status: "actueel"
    }
  ],
  'protocollen': [
    {
      id: "doc-5",
      title: "Protocol bij incidenten",
      type: "Protocol",
      expiryDate: "2024-09-30",
      downloadUrl: "#",
      status: "actueel"
    }
  ],
  'werkinstructies': [
    {
      id: "doc-6",
      title: "Werkinstructie Heftrucks",
      type: "Werkinstructie",
      location: "Magazijn",
      downloadUrl: "#",
      status: "actueel"
    }
  ],
  'overig': [
    {
      id: "doc-7",
      title: "Noodplan",
      type: "Overig",
      expiryDate: "2024-08-15",
      downloadUrl: "#",
      status: "verlopen"
    }
  ]
};

// Status Badge component for document status
const StatusBadge = ({ status }: { status: DocumentStatus }) => {
  const statusConfig = {
    "actueel": { color: "bg-green-100 text-green-800", label: "Actueel" },
    "verlopen": { color: "bg-red-100 text-red-800", label: "Verlopen" },
    "in-revisie": { color: "bg-amber-100 text-amber-800", label: "In revisie" }
  };

  const config = statusConfig[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.label}
    </span>
  );
};

const DocumentManagement = () => {
  const [activeCategory, setActiveCategory] = useState<string>("rie");
  const [rieMode, setRieMode] = useState<boolean>(false);
  const [currentRieStep, setCurrentRieStep] = useState<number>(1);
  const [workplace, setWorkplace] = useState<string | null>(null);
  const [risks, setRisks] = useState<any[]>([]);

  // Document category tabs
  const documentCategories = [
    { id: "rie", name: "RI&E & Plan van Aanpak" },
    { id: "beleid", name: "Beleidsdocumenten" },
    { id: "protocollen", name: "Protocollen" },
    { id: "werkinstructies", name: "Werkinstructies" },
    { id: "overig", name: "Overige documenten" }
  ];

  // Functions for RI&E wizard (maintaining existing functionality)
  const handleRIECreate = () => {
    setRieMode(true);
    setCurrentRieStep(1);
  };

  const handleNextRieStep = () => {
    if (currentRieStep < 4) {
      setCurrentRieStep(currentRieStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handlePreviousRieStep = () => {
    if (currentRieStep > 1) {
      setCurrentRieStep(currentRieStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handleWorkplaceSelect = (selectedWorkplace: string) => {
    setWorkplace(selectedWorkplace);
  };
  
  const handleRisksUpdate = (updatedRisks: any[]) => {
    setRisks(updatedRisks);
  };

  const handleExitRIE = () => {
    setRieMode(false);
    setCurrentRieStep(1);
  };

  // RI&E Steps definition
  const rieSteps = [
    { number: 1, title: "Selecteer afdeling of werkplek" },
    { number: 2, title: "Inventariseer risico's" },
    { number: 3, title: "Beoordeel risico's" },
    { number: 4, title: "Plan van Aanpak" },
  ];

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Documentbeheer</h1>
          
          {/* Document Management Interface */}
          {!rieMode ? (
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left sidebar with document categories */}
              <div className="w-full md:w-64 flex-shrink-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentcategorieën</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-col">
                      {documentCategories.map((category) => (
                        <button
                          key={category.id}
                          className={`py-3 px-4 text-left border-l-4 transition-colors ${
                            activeCategory === category.id
                              ? "border-compliblue bg-blue-50 text-compliblue font-medium"
                              : "border-transparent hover:bg-gray-50"
                          }`}
                          onClick={() => setActiveCategory(category.id)}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Actions panel */}
                <Card className="mt-4">
                  <CardContent className="p-4">
                    {activeCategory === "rie" ? (
                      <Button 
                        className="w-full bg-compliblue hover:bg-compliblue/90 mt-2"
                        onClick={handleRIECreate}
                      >
                        <Plus size={16} className="mr-2" />
                        Nieuwe RI&E maken
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-compliblue hover:bg-compliblue/90 mt-2"
                      >
                        <Upload size={16} className="mr-2" />
                        Document uploaden
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                    >
                      <Filter size={16} className="mr-2" />
                      Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main content area for document list */}
              <div className="flex-1">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle>{documentCategories.find(c => c.id === activeCategory)?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Titel document</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Locatie / Afdeling</TableHead>
                          <TableHead>Geldigheid / Vervaldatum</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Acties</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sampleDocuments[activeCategory]?.length ? (
                          sampleDocuments[activeCategory].map((document) => (
                            <TableRow key={document.id}>
                              <TableCell className="font-medium">{document.title}</TableCell>
                              <TableCell>{document.type}</TableCell>
                              <TableCell>{document.location || "-"}</TableCell>
                              <TableCell>{document.expiryDate || "Onbepaald"}</TableCell>
                              <TableCell>
                                <StatusBadge status={document.status} />
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <Download size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Edit size={16} />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash size={16} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                              Geen documenten gevonden in deze categorie
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // RI&E Wizard Interface (maintaining existing functionality)
            <div>
              {/* Dashboard section */}
              <Dashboard risks={risks} />
              
              {/* Steps progress indicator */}
              <div className="flex justify-between mb-6 border-b pb-4">
                {rieSteps.map((step) => (
                  <div 
                    key={step.number}
                    className={`flex flex-col items-center ${
                      currentRieStep === step.number ? "text-compliblue" : "text-gray-400"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      currentRieStep === step.number 
                        ? "bg-compliblue text-white" 
                        : currentRieStep > step.number 
                          ? "bg-green-500 text-white" 
                          : "bg-gray-200 text-gray-500"
                    }`}>
                      {step.number}
                    </div>
                    <span className="text-sm text-center hidden md:block">{step.title}</span>
                    <span className="text-sm text-center md:hidden">{`Stap ${step.number}`}</span>
                  </div>
                ))}
              </div>
              
              {/* Current step content */}
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{rieSteps[currentRieStep - 1].title}</CardTitle>
                  <Button variant="ghost" onClick={handleExitRIE}>
                    Terug naar overzicht
                  </Button>
                </CardHeader>
                <CardContent>
                  {currentRieStep === 1 && (
                    <SelectWorkplace onWorkplaceSelect={handleWorkplaceSelect} selectedWorkplace={workplace} />
                  )}
                  {currentRieStep === 2 && (
                    <IdentifyRisks 
                      workplace={workplace} 
                      risks={risks} 
                      onRisksUpdate={handleRisksUpdate} 
                    />
                  )}
                  {currentRieStep === 3 && (
                    <EvaluateRisks 
                      risks={risks} 
                      onRisksUpdate={handleRisksUpdate} 
                    />
                  )}
                  {currentRieStep === 4 && (
                    <ActionPlan 
                      risks={risks} 
                      onRisksUpdate={handleRisksUpdate} 
                    />
                  )}
                </CardContent>
              </Card>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mb-8">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousRieStep}
                  disabled={currentRieStep === 1}
                >
                  Vorige stap
                </Button>
                
                {currentRieStep < 4 ? (
                  <Button 
                    className="bg-compliblue hover:bg-compliblue/90"
                    onClick={handleNextRieStep}
                    disabled={currentRieStep === 1 && !workplace}
                  >
                    Volgende stap
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <FileText size={16} />
                    Exporteer RI&E rapport
                    <Download size={16} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DocumentManagement;
