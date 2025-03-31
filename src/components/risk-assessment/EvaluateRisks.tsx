
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";

// Risk categories
const riskCategories: Record<string, string> = {
  "physical": "Fysiek",
  "mental": "Mentaal/Psychosociaal",
  "organizational": "Organisatorisch",
  "chemical": "Chemisch",
  "biological": "Biologisch",
  "ergonomic": "Ergonomisch",
};

type EvaluateRisksProps = {
  risks: any[];
  onRisksUpdate: (risks: any[]) => void;
};

export const EvaluateRisks = ({ risks, onRisksUpdate }: EvaluateRisksProps) => {
  const [sortBy, setSortBy] = useState<"name" | "category" | "score">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const unevaluatedRisks = risks.filter(risk => !risk.riskScore);
  const evaluatedRisks = risks.filter(risk => risk.riskScore);
  
  const sortedRisks = [...evaluatedRisks].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    
    if (sortBy === "category") {
      return sortOrder === "asc" 
        ? a.category.localeCompare(b.category) 
        : b.category.localeCompare(a.category);
    }
    
    // Default: sort by score
    return sortOrder === "asc" 
      ? a.riskScore - b.riskScore 
      : b.riskScore - a.riskScore;
  });
  
  const handleSort = (field: "name" | "category" | "score") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  
  const handleRiskEvaluation = (riskId: string, field: "probability" | "severity", value: number) => {
    const updatedRisks = risks.map(risk => {
      if (risk.id === riskId) {
        const updatedRisk = { ...risk, [field]: value };
        
        // Calculate risk score if both probability and severity are set
        if (updatedRisk.probability && updatedRisk.severity) {
          updatedRisk.riskScore = updatedRisk.probability * updatedRisk.severity;
        }
        
        return updatedRisk;
      }
      return risk;
    });
    
    onRisksUpdate(updatedRisks);
  };
  
  const getRiskLevel = (score: number) => {
    if (score >= 7) return { level: "Hoog", color: "bg-red-100 text-red-800" };
    if (score >= 4) return { level: "Middel", color: "bg-amber-100 text-amber-800" };
    return { level: "Laag", color: "bg-green-100 text-green-800" };
  };

  return (
    <div className="space-y-6">
      {risks.length === 0 ? (
        <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-500 mb-2" />
            <p className="text-gray-500">Er zijn nog geen risico's om te evalueren.</p>
            <p className="text-sm text-gray-400 mt-1">Ga terug naar de vorige stap om risico's toe te voegen.</p>
          </div>
        </div>
      ) : (
        <>
          {unevaluatedRisks.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-medium">Te evalueren risico's ({unevaluatedRisks.length})</h3>
              {unevaluatedRisks.map((risk) => (
                <Card key={risk.id}>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-500 text-sm">Risico</Label>
                          <p className="font-medium">{risk.name}</p>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Categorie</Label>
                          <p>{riskCategories[risk.category] || risk.category}</p>
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-gray-500 text-sm">Omschrijving</Label>
                          <p>{risk.description || "-"}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div>
                          <Label className="font-medium mb-2 block">Kans</Label>
                          <RadioGroup 
                            value={risk.probability?.toString() || ""} 
                            onValueChange={(v) => handleRiskEvaluation(risk.id, "probability", parseInt(v))}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id={`probability-${risk.id}-1`} />
                              <Label htmlFor={`probability-${risk.id}-1`} className="cursor-pointer">
                                Klein (1) - Onwaarschijnlijk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id={`probability-${risk.id}-2`} />
                              <Label htmlFor={`probability-${risk.id}-2`} className="cursor-pointer">
                                Middel (2) - Mogelijk
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id={`probability-${risk.id}-3`} />
                              <Label htmlFor={`probability-${risk.id}-3`} className="cursor-pointer">
                                Groot (3) - Waarschijnlijk
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label className="font-medium mb-2 block">Ernst</Label>
                          <RadioGroup 
                            value={risk.severity?.toString() || ""} 
                            onValueChange={(v) => handleRiskEvaluation(risk.id, "severity", parseInt(v))}
                            className="flex flex-col space-y-1"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="1" id={`severity-${risk.id}-1`} />
                              <Label htmlFor={`severity-${risk.id}-1`} className="cursor-pointer">
                                Klein (1) - Licht letsel
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="2" id={`severity-${risk.id}-2`} />
                              <Label htmlFor={`severity-${risk.id}-2`} className="cursor-pointer">
                                Middel (2) - Ernstig letsel
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="3" id={`severity-${risk.id}-3`} />
                              <Label htmlFor={`severity-${risk.id}-3`} className="cursor-pointer">
                                Groot (3) - Zeer ernstig/fataal
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {evaluatedRisks.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Geëvalueerde risico's ({evaluatedRisks.length})</h3>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleSort("name")}
                    className="text-xs"
                  >
                    Naam
                    {sortBy === "name" && (
                      sortOrder === "asc" ? 
                        <ArrowUp className="ml-1" size={12} /> : 
                        <ArrowDown className="ml-1" size={12} />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSort("category")}
                    className="text-xs"
                  >
                    Categorie
                    {sortBy === "category" && (
                      sortOrder === "asc" ? 
                        <ArrowUp className="ml-1" size={12} /> : 
                        <ArrowDown className="ml-1" size={12} />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSort("score")}
                    className={`text-xs ${sortBy === "score" ? "bg-gray-100" : ""}`}
                  >
                    Risicoscore
                    {sortBy === "score" && (
                      sortOrder === "asc" ? 
                        <ArrowUp className="ml-1" size={12} /> : 
                        <ArrowDown className="ml-1" size={12} />
                    )}
                  </Button>
                </div>
              </div>
              
              {sortedRisks.map((risk) => {
                const riskLevel = getRiskLevel(risk.riskScore);
                
                return (
                  <Card key={risk.id}>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-5">
                          <Label className="text-gray-500 text-sm">Risico</Label>
                          <p className="font-medium">{risk.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {riskCategories[risk.category] || risk.category}
                          </p>
                        </div>
                        
                        <div className="md:col-span-4">
                          <Label className="text-gray-500 text-sm">Evaluatie</Label>
                          <div className="flex gap-6 mt-1">
                            <div>
                              <span className="text-sm text-gray-500">Kans:</span>
                              <span className="ml-1 font-medium">{risk.probability}/3</span>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">Ernst:</span>
                              <span className="ml-1 font-medium">{risk.severity}/3</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:col-span-3 flex flex-col justify-center">
                          <div className="flex flex-col items-center">
                            <div className="flex items-center">
                              <div className="text-xl font-bold mr-2">{risk.riskScore}</div>
                              <span className={`text-xs px-2 py-1 rounded-full ${riskLevel.color}`}>
                                {riskLevel.level}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  risk.riskScore >= 7 
                                    ? 'bg-red-600' 
                                    : risk.riskScore >= 4 
                                      ? 'bg-amber-500' 
                                      : 'bg-green-500'
                                }`}
                                style={{ width: `${(risk.riskScore / 9) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
