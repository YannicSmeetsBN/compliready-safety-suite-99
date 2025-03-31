
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { MeasureItem } from "./MeasureItem";
import { MeasureForm } from "./MeasureForm";
import { getRiskLevel } from "./utils";

type RiskCardProps = {
  risk: any;
  onRisksUpdate: (updatedRisks: any[]) => void;
  allRisks: any[];
};

export const RiskCard = ({ risk, onRisksUpdate, allRisks }: RiskCardProps) => {
  const [isAddingMeasure, setIsAddingMeasure] = useState(false);
  const [newMeasure, setNewMeasure] = useState({
    description: "",
    responsible: "",
    deadline: "",
    status: "not-started",
    notes: "",
  });
  
  const measures = risk.measures || [];
  const completedMeasures = measures.filter((m: any) => m.status === "completed").length;
  const riskLevel = getRiskLevel(risk.riskScore);
  
  const handleInputChange = (field: string, value: string) => {
    setNewMeasure({ ...newMeasure, [field]: value });
  };
  
  const handleAddMeasure = () => {
    if (!newMeasure.description) return;
    
    const updatedRisks = allRisks.map(r => {
      if (r.id === risk.id) {
        const measures = r.measures || [];
        return {
          ...r,
          measures: [
            ...measures,
            {
              id: Date.now().toString(),
              ...newMeasure,
            }
          ]
        };
      }
      return r;
    });
    
    onRisksUpdate(updatedRisks);
    setNewMeasure({
      description: "",
      responsible: "",
      deadline: "",
      status: "not-started",
      notes: "",
    });
    setIsAddingMeasure(false);
  };
  
  const handleUpdateMeasureStatus = (riskId: string, measureId: string, status: string) => {
    const updatedRisks = allRisks.map(r => {
      if (r.id === riskId) {
        const updatedMeasures = (r.measures || []).map((measure: any) => {
          if (measure.id === measureId) {
            return { ...measure, status };
          }
          return measure;
        });
        
        return { ...r, measures: updatedMeasures };
      }
      return r;
    });
    
    onRisksUpdate(updatedRisks);
  };
  
  const handleDeleteMeasure = (riskId: string, measureId: string) => {
    const updatedRisks = allRisks.map(r => {
      if (r.id === riskId) {
        const updatedMeasures = (r.measures || []).filter((measure: any) => measure.id !== measureId);
        return { ...r, measures: updatedMeasures };
      }
      return r;
    });
    
    onRisksUpdate(updatedRisks);
  };

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
              <MeasureItem 
                key={measure.id}
                measure={measure}
                riskId={risk.id}
                onDeleteMeasure={handleDeleteMeasure}
                onUpdateMeasureStatus={handleUpdateMeasureStatus}
              />
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 p-3 rounded-md mb-4">
            <p className="text-sm text-amber-800">Nog geen maatregelen toegevoegd voor dit risico.</p>
          </div>
        )}
        
        {isAddingMeasure ? (
          <MeasureForm
            riskId={risk.id}
            newMeasure={newMeasure}
            onInputChange={handleInputChange}
            onAddMeasure={handleAddMeasure}
            onCancel={() => setIsAddingMeasure(false)}
          />
        ) : (
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => setIsAddingMeasure(true)}
          >
            <Plus size={16} className="mr-2" />
            Maatregel toevoegen
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
