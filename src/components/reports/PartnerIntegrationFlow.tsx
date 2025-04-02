
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownToLine, ArrowRightCircle, CheckCircle2, Clock, Clipboard, FileBox, FileSpreadsheet, Share2, UserCheck } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const PartnerIntegrationFlow = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmitFlow = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Certificaat succesvol toegevoegd",
        description: "Het certificaat is toegevoegd aan het medewerkersdossier van Jan Janssen.",
      });
      setCurrentStep(5);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <div className="mb-4 flex justify-between">
          <div className="flex items-center gap-8">
            <div className="text-sm font-medium">
              Integratie tussen opleidingsinstituut en werkgever
            </div>
            <div className="text-sm text-muted-foreground">
              {currentStep} van 5 stappen
            </div>
          </div>
          <div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentStep(1)}
            >
              Restart demo
            </Button>
          </div>
        </div>
        <Progress value={(currentStep / 5) * 100} className="h-2" />
      </div>
      
      {/* Step 1: Certificate creation by training provider */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Stap 1: Opleider registreert nieuw certificaat</h3>
            <p className="text-gray-500">De opleider geeft aan dat een medewerker een opleiding heeft afgerond</p>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <Card className="col-span-1 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Training Selecteren</CardTitle>
                <CardDescription>Kies de afgeronde training</CardDescription>
              </CardHeader>
              <CardContent className="py-2 flex-grow">
                <div className="space-y-2">
                  <div className="bg-green-50 p-3 rounded border border-green-200 text-green-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">BHV Herhaling</span>
                  </div>
                  <div className="p-3 rounded border border-gray-200 text-gray-500 flex items-center gap-2">
                    <span className="text-sm">EHBO Basis</span>
                  </div>
                  <div className="p-3 rounded border border-gray-200 text-gray-500 flex items-center gap-2">
                    <span className="text-sm">VCA Basis</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2 border-t">
                <Button size="sm" variant="outline" className="w-full">Training info bekijken</Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-2 flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Certificaat Aanmaken</CardTitle>
                <CardDescription>Vul gegevens in voor het nieuwe certificaat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 py-2 flex-grow">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded">
                  <h4 className="font-medium mb-1">BHV Herhaling Certificaat</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Cursist:</p>
                      <p className="font-medium">Jan Janssen</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cursistgegevens:</p>
                      <p className="font-medium">ID: EMP001</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Training datum:</p>
                      <p className="font-medium">15-03-2025</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Geldig tot:</p>
                      <p className="font-medium">15-03-2027</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Instructeur:</p>
                      <p className="font-medium">Karel Bakker</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status:</p>
                      <p className="font-medium text-green-600">Afgerond</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-2 border border-dashed rounded bg-gray-50">
                  <div className="text-center">
                    <FileBox className="h-8 w-8 mx-auto text-gray-400 mb-1" />
                    <p className="text-sm font-medium">Certificaat_BHV_JanJanssen.pdf</p>
                    <p className="text-xs text-gray-500">Geüpload op 15-03-2025</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-2">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm">Annuleren</Button>
                  <Button 
                    size="sm" 
                    onClick={handleNextStep}
                    className="ml-2"
                  >
                    Certificaat registreren
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      
      {/* Step 2: Sending to employer */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Stap 2: Opleider stuurt certificaat naar werkgever</h3>
            <p className="text-gray-500">Het systeem van de opleider synchroniseert met ComplianceOS</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Gegevens verzenden naar werkgever</CardTitle>
              <CardDescription>Certificaatgegevens worden gekoppeld aan het werkgeversportaal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-md">
                <div className="flex-1 flex flex-col items-center p-4">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-center">Opleider</h4>
                  <p className="text-sm text-center text-gray-500">Veiligheidsopleidingen NL</p>
                </div>
                
                <div className="flex-1 flex flex-col items-center relative py-8">
                  <div className="absolute top-1/2 transform -translate-y-1/2 w-full">
                    <div className="flex justify-center items-center w-full">
                      <div className="h-1 w-24 md:w-32 bg-green-200"></div>
                      <div className="animate-pulse">
                        <ArrowRightCircle className="h-8 w-8 text-green-500 mx-1" />
                      </div>
                      <div className="h-1 w-24 md:w-32 bg-green-200"></div>
                    </div>
                    <p className="text-xs text-center text-green-600 mt-1">Beveiligde verbinding</p>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center p-4">
                  <div className="bg-green-100 p-3 rounded-full mb-2">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-center">Werkgever</h4>
                  <p className="text-sm text-center text-gray-500">Techniek Bedrijf BV</p>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h4 className="font-medium mb-2 flex items-center">
                  <Clipboard className="h-4 w-4 mr-2" />
                  Overzicht verzonden gegevens
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <p className="text-gray-500">Certificaat type:</p>
                      <p>BHV Herhaling</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Uitgifte datum:</p>
                      <p>15-03-2025</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Geldig tot:</p>
                      <p>15-03-2027</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-500">Certificaatnummer:</p>
                      <p>BHV-2025-1234</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2 px-3 bg-blue-50 rounded text-sm">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    <span>Ook op HR-systeem synchroniseren</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>Terug</Button>
              <Button onClick={handleNextStep}>Versturen naar werkgever</Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Step 3: Employer verification */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Stap 3: Werkgever accepteert het certificaat</h3>
            <p className="text-gray-500">Verificatie en bevestiging door de werkgever</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nieuw certificaat ontvangen</CardTitle>
              <CardDescription>Controleer en verifieer de certificaatgegevens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-md border border-amber-200 flex items-start gap-3">
                <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Wachtend op acceptatie</h4>
                  <p className="text-sm text-amber-700">
                    Er is een nieuw certificaat ontvangen van Veiligheidsopleidingen NL voor Jan Janssen.
                    Verifieer en accepteer dit certificaat om het toe te voegen aan het medewerkersdossier.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border">
                <h4 className="font-medium mb-3">Ontvangen certificaatgegevens</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Medewerker</p>
                    <p className="font-medium">Jan Janssen</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Certificaat</p>
                    <p className="font-medium">BHV Herhaling</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Uitgifte datum</p>
                    <p className="font-medium">15-03-2025</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Geldig tot</p>
                    <p className="font-medium">15-03-2027</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center mb-2">
                    <ArrowDownToLine className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm font-medium">Certificaat bekijken</span>
                  </div>
                  <div className="flex items-center justify-center h-32 bg-gray-100 border border-dashed rounded">
                    <p className="text-sm text-gray-500">Voorbeeld certificaat</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-sm font-medium mb-2">Voer verificatiecode in:</label>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-500 mb-2">De verificatiecode is verstuurd naar de beheerder</p>
                  <InputOTP 
                    maxLength={6} 
                    value={verificationCode} 
                    onChange={(val) => setVerificationCode(val)}
                    className="mb-3"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>Terug</Button>
              <Button 
                onClick={handleNextStep} 
                disabled={verificationCode.length !== 6}
              >
                Certificaat accepteren
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Step 4: Integration with HR system */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Stap 4: Synchronisatie met HR-systeem</h3>
            <p className="text-gray-500">Het certificaat wordt ook doorgezet naar het HR-systeem</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Certificaat synchroniseren</CardTitle>
              <CardDescription>Automatisch synchroniseren met gekoppelde systemen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-200 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Certificaat geverifieerd en geaccepteerd</h4>
                  <p className="text-sm text-green-700">
                    Het BHV certificaat voor Jan Janssen is succesvol geaccepteerd. 
                    U kunt nu kiezen om dit certificaat ook te synchroniseren met uw HR-systeem.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h4 className="font-medium mb-3 text-blue-800">HR-systeem integratie</h4>
                <p className="text-sm text-blue-700 mb-4">
                  Dit certificaat kan automatisch worden toegevoegd aan het HR-dossier van de medewerker.
                  Selecteer hieronder de gewenste systemen voor synchronisatie.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center p-3 bg-white rounded border">
                    <input type="checkbox" id="hr-sync" className="mr-3" checked />
                    <label htmlFor="hr-sync" className="flex-1">
                      <span className="font-medium">HR-Systeem</span>
                      <span className="text-xs text-gray-500 block">Medewerkersdossier bijwerken</span>
                    </label>
                  </div>
                  
                  <div className="flex items-center p-3 bg-white rounded border">
                    <input type="checkbox" id="planning-sync" className="mr-3" />
                    <label htmlFor="planning-sync" className="flex-1">
                      <span className="font-medium">Planningsysteem</span>
                      <span className="text-xs text-gray-500 block">Beschikbaarheid BHV'er bijwerken</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={handlePrevStep}>Terug</Button>
              <Button 
                onClick={handleSubmitFlow}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Bezig met verwerken..." : "Verwerken en afronden"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Step 5: Confirmation */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Stap 5: Workflow voltooid</h3>
            <p className="text-gray-500">Het certificaat is succesvol verwerkt in alle systemen</p>
          </div>
          
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Certificaat succesvol verwerkt</CardTitle>
              <CardDescription>Het certificaat is toegevoegd aan alle geselecteerde systemen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-md border bg-gray-50">
                <h4 className="font-medium mb-2">Procesoverzicht</h4>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <div className="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>Certificaat geregistreerd door opleider</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>Certificaat verzonden naar werkgever</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>Certificaat geverifieerd en geaccepteerd</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>Certificaat gesynchroniseerd met HR-systeem</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <div className="bg-green-500 h-5 w-5 rounded-full flex items-center justify-center mr-2">
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    </div>
                    <span>Medewerker automatisch geïnformeerd via email</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 rounded-md border bg-green-50">
                <h4 className="font-medium mb-1 text-green-800">Volgende herhalingstraining</h4>
                <p className="text-sm text-green-700">
                  De volgende BHV herhalingstraining voor Jan Janssen staat gepland voor 10-03-2027.
                  Deze is automatisch ingepland in het opleidingsrooster.
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button onClick={() => setCurrentStep(1)}>Demo opnieuw starten</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};
