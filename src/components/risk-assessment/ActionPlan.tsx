
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, ArrowDown, ArrowUp, CheckCircle, Clock, Plus, X } from "lucide-react";

type ActionPlanProps = {
  risks: any[];
  onRisksUpdate: (risks: any[]) => void;
};

export const ActionPlan = ({ risks, onRisksUpdate }: ActionPlanProps) => {
  const [sortBy, setSortBy] = useState<"name" | "score" | "deadline">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedRiskId, setSelectedRiskId] = useState<string | null>(null);
  const [newMeasure, setNewMeasure] = useState({
    description: "",
    responsible: "",
    deadline: "",
    status: "not-started",
    notes: "",
  });
  
  // Filter risks with risk score (evaluated)
  const evaluatedRisks = risks.filter(risk => risk.riskScore);
  
  // Sort risks based on current sort settings
  const sortedRisks = [...evaluatedRisks].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    }
    
    if (sortBy === "deadline") {
      // Get the earliest deadline from measures
      const getEarliestDeadline = (risk: any) => {
        if (!risk.measures || risk.measures.length === 0) return "9999-12-31";
        return risk.measures
          .filter((m: any) => m.deadline)
          .sort((a: any, b: any) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0]?.deadline || "9999-12-31";
      };
      
      const aDeadline = getEarliestDeadline(a);
      const bDeadline = getEarliestDeadline(b);
      
      return sortOrder === "asc" 
        ? aDeadline.localeCompare(bDeadline) 
        : bDeadline.localeCompare(aDeadline);
    }
    
    // Default: sort by score
    return sortOrder === "asc" 
      ? a.riskScore - b.riskScore 
      : b.riskScore - a.riskScore;
  });
  
  const handleSort = (field: "name" | "score" | "deadline") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setNewMeasure({ ...newMeasure, [field]: value });
  };
  
  const handleAddMeasure = () => {
    if (!selectedRiskId || !newMeasure.description) return;
    
    const updatedRisks = risks.map(risk => {
      if (risk.id === selectedRiskId) {
        const measures = risk.measures || [];
        return {
          ...risk,
          measures: [
            ...measures,
            {
              id: Date.now().toString(),
              ...newMeasure,
            }
          ]
        };
      }
      return risk;
    });
    
    onRisksUpdate(updatedRisks);
    setNewMeasure({
      description: "",
      responsible: "",
      deadline: "",
      status: "not-started",
      notes: "",
    });
    setSelectedRiskId(null);
  };
  
  const handleUpdateMeasureStatus = (riskId: string, measureId: string, status: string) => {
    const updatedRisks = risks.map(risk => {
      if (risk.id === riskId) {
        const updatedMeasures = (risk.measures || []).map((measure: any) => {
          if (measure.id === measureId) {
            return { ...measure, status };
          }
          return measure;
        });
        
        return { ...risk, measures: updatedMeasures };
      }
      return risk;
    });
    
    onRisksUpdate(updatedRisks);
  };
  
  const handleDeleteMeasure = (riskId: string, measureId: string) => {
    const updatedRisks = risks.map(risk => {
      if (risk.id === riskId) {
        const updatedMeasures = (risk.measures || []).filter((measure: any) => measure.id !== measureId);
        return { ...risk, measures: updatedMeasures };
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
  
  const getMeasureStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "in-progress":
        return <Clock size={16} className="text-amber-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-400" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  };

  return (
    <div className="space-y-6">
      {evaluatedRisks.length === 0 ? (
        <div className="flex items-center justify-center p-8 border rounded-md border-dashed">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-10 w-10 text-amber-500 mb-2" />
            <p className="text-gray-500">Er zijn geen geëvalueerde risico's om maatregelen voor op te stellen.</p>
            <p className="text-sm text-gray-400 mt-1">Ga terug naar de vorige stap om risico's te evalueren.</p>
          </div>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mb-4">
            <p className="text-sm text-blue-800">
              Stel voor elk geïdentificeerd risico passende maatregelen op. Bepaal wie verantwoordelijk is voor de uitvoering en wanneer het gereed moet zijn.
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Risico's en maatregelen</h3>
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
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSort("deadline")}
                className="text-xs"
              >
                Deadline
                {sortBy === "deadline" && (
                  sortOrder === "asc" ? 
                    <ArrowUp className="ml-1" size={12} /> : 
                    <ArrowDown className="ml-1" size={12} />
                )}
              </Button>
            </div>
          </div>
          
          {sortedRisks.map((risk) => {
            const riskLevel = getRiskLevel(risk.riskScore);
            const measures = risk.measures || [];
            const completedMeasures = measures.filter((m: any) => m.status === "completed").length;
            
            return (
              <Card key={risk.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{risk.name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${riskLevel.color}`}>
                          {riskLevel.level} ({risk.riskScore}/9)
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{risk.description || ""}</p>
                    </div>
                    
                    {/* Measure completion indicator */}
                    {measures.length > 0 && (
                      <div className="text-right">
                        <span className="text-sm text-gray-500">
                          {completedMeasures}/{measures.length} maatregelen voltooid
                        </span>
                        <div className="w-36 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${(completedMeasures / measures.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Measures section */}
                  {measures.length > 0 ? (
                    <div className="space-y-3 mb-4">
                      <h5 className="text-sm font-medium text-gray-500">Maatregelen</h5>
                      {measures.map((measure: any) => (
                        <div key={measure.id} className="bg-gray-50 p-3 rounded-md relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-red-500"
                            onClick={() => handleDeleteMeasure(risk.id, measure.id)}
                          >
                            <X size={14} />
                          </Button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="md:col-span-3">
                              <p className="font-medium">{measure.description}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Verantwoordelijke</p>
                              <p className="text-sm">{measure.responsible || "-"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Deadline</p>
                              <p className="text-sm">{formatDate(measure.deadline) || "-"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Status</p>
                              <Select 
                                value={measure.status} 
                                onValueChange={(value) => handleUpdateMeasureStatus(risk.id, measure.id, value)}
                              >
                                <SelectTrigger className="h-7 text-sm w-full mt-1">
                                  <SelectValue>
                                    <div className="flex items-center gap-2">
                                      {getMeasureStatusIcon(measure.status)}
                                      <span>
                                        {measure.status === "not-started" && "Niet gestart"}
                                        {measure.status === "in-progress" && "In uitvoering"}
                                        {measure.status === "completed" && "Gereed"}
                                      </span>
                                    </div>
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not-started">
                                    <div className="flex items-center gap-2">
                                      <AlertTriangle size={16} className="text-gray-400" />
                                      <span>Niet gestart</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="in-progress">
                                    <div className="flex items-center gap-2">
                                      <Clock size={16} className="text-amber-600" />
                                      <span>In uitvoering</span>
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="completed">
                                    <div className="flex items-center gap-2">
                                      <CheckCircle size={16} className="text-green-600" />
                                      <span>Gereed</span>
                                    </div>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            {measure.notes && (
                              <div className="md:col-span-3">
                                <p className="text-xs text-gray-500">Notities</p>
                                <p className="text-sm">{measure.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-amber-50 p-3 rounded-md mb-4">
                      <p className="text-sm text-amber-800">Nog geen maatregelen toegevoegd voor dit risico.</p>
                    </div>
                  )}
                  
                  {selectedRiskId === risk.id ? (
                    <Card className="border-dashed">
                      <CardContent className="pt-6 space-y-4">
                        <h5 className="font-medium">Nieuwe maatregel toevoegen</h5>
                        
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor={`measure-desc-${risk.id}`}>Omschrijving *</Label>
                            <Textarea 
                              id={`measure-desc-${risk.id}`}
                              value={newMeasure.description}
                              onChange={(e) => handleInputChange("description", e.target.value)}
                              placeholder="Beschrijf de maatregel..."
                              rows={2}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor={`measure-resp-${risk.id}`}>Verantwoordelijke</Label>
                              <Input 
                                id={`measure-resp-${risk.id}`}
                                value={newMeasure.responsible}
                                onChange={(e) => handleInputChange("responsible", e.target.value)}
                                placeholder="Naam van verantwoordelijke"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`measure-deadline-${risk.id}`}>Deadline</Label>
                              <Input 
                                id={`measure-deadline-${risk.id}`}
                                type="date"
                                value={newMeasure.deadline}
                                onChange={(e) => handleInputChange("deadline", e.target.value)}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`measure-status-${risk.id}`}>Status</Label>
                              <Select 
                                value={newMeasure.status} 
                                onValueChange={(value) => handleInputChange("status", value)}
                              >
                                <SelectTrigger id={`measure-status-${risk.id}`}>
                                  <SelectValue>
                                    {newMeasure.status === "not-started" && "Niet gestart"}
                                    {newMeasure.status === "in-progress" && "In uitvoering"}
                                    {newMeasure.status === "completed" && "Gereed"}
                                  </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="not-started">Niet gestart</SelectItem>
                                  <SelectItem value="in-progress">In uitvoering</SelectItem>
                                  <SelectItem value="completed">Gereed</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor={`measure-notes-${risk.id}`}>Notities</Label>
                            <Textarea 
                              id={`measure-notes-${risk.id}`}
                              value={newMeasure.notes}
                              onChange={(e) => handleInputChange("notes", e.target.value)}
                              placeholder="Optionele notities..."
                              rows={2}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedRiskId(null)}
                        >
                          Annuleren
                        </Button>
                        <Button 
                          className="bg-compliblue hover:bg-compliblue/90"
                          onClick={handleAddMeasure}
                          disabled={!newMeasure.description}
                        >
                          Maatregel toevoegen
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="mt-2"
                      onClick={() => setSelectedRiskId(risk.id)}
                    >
                      <Plus size={16} className="mr-2" />
                      Maatregel toevoegen
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </>
      )}
    </div>
  );
};
