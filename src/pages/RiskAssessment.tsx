
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, FileText, Download, AlertTriangle, CheckCircle, ChevronUp } from "lucide-react";
import { SelectWorkplace } from "@/components/risk-assessment/SelectWorkplace";
import { IdentifyRisks } from "@/components/risk-assessment/IdentifyRisks";
import { EvaluateRisks } from "@/components/risk-assessment/EvaluateRisks";
import { ActionPlan } from "@/components/risk-assessment/ActionPlan";
import { Dashboard } from "@/components/risk-assessment/Dashboard";

const RiskAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [workplace, setWorkplace] = useState<string | null>(null);
  const [risks, setRisks] = useState<any[]>([]);
  
  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const steps = [
    { number: 1, title: "Selecteer afdeling of werkplek" },
    { number: 2, title: "Inventariseer risico's" },
    { number: 3, title: "Beoordeel risico's" },
    { number: 4, title: "Plan van Aanpak" },
  ];
  
  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  
  const handleWorkplaceSelect = (selectedWorkplace: string) => {
    setWorkplace(selectedWorkplace);
  };
  
  const handleRisksUpdate = (updatedRisks: any[]) => {
    setRisks(updatedRisks);
  };

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Risico-Inventarisatie & Evaluatie (RI&E)</h1>
          
          {/* Dashboard section */}
          <Dashboard risks={risks} />
          
          {/* Steps progress indicator */}
          <div className="flex justify-between mb-6 border-b pb-4">
            {steps.map((step) => (
              <div 
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep === step.number ? "text-compliblue" : "text-gray-400"
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep === step.number 
                    ? "bg-compliblue text-white" 
                    : currentStep > step.number 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200 text-gray-500"
                }`}>
                  {currentStep > step.number ? <CheckCircle size={16} /> : step.number}
                </div>
                <span className="text-sm text-center hidden md:block">{step.title}</span>
                <span className="text-sm text-center md:hidden">{`Stap ${step.number}`}</span>
              </div>
            ))}
          </div>
          
          {/* Current step content */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>
                {currentStep === 1 && "Selecteer een afdeling of werkplek waarvoor je een RI&E wilt opstellen."}
                {currentStep === 2 && "Inventariseer alle mogelijke risico's voor de geselecteerde werkplek."}
                {currentStep === 3 && "Beoordeel de geïnventariseerde risico's op basis van kans en ernst."}
                {currentStep === 4 && "Stel maatregelen op voor de geïdentificeerde risico's."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && (
                <SelectWorkplace onWorkplaceSelect={handleWorkplaceSelect} selectedWorkplace={workplace} />
              )}
              {currentStep === 2 && (
                <IdentifyRisks 
                  workplace={workplace} 
                  risks={risks} 
                  onRisksUpdate={handleRisksUpdate} 
                />
              )}
              {currentStep === 3 && (
                <EvaluateRisks 
                  risks={risks} 
                  onRisksUpdate={handleRisksUpdate} 
                />
              )}
              {currentStep === 4 && (
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
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2" size={16} />
              Vorige stap
            </Button>
            
            {currentStep < 4 ? (
              <Button 
                className="bg-compliblue hover:bg-compliblue/90"
                onClick={handleNextStep}
                disabled={currentStep === 1 && !workplace}
              >
                Volgende stap
                <ArrowRight className="ml-2" size={16} />
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
          
          {/* Scroll to top button */}
          {showScrollButton && (
            <Button
              size="icon"
              className="fixed bottom-6 right-6 bg-compliblue hover:bg-compliblue/90 rounded-full shadow-lg"
              onClick={scrollToTop}
            >
              <ChevronUp size={20} />
            </Button>
          )}
        </main>
      </div>
    </div>
  );
};

export default RiskAssessment;
