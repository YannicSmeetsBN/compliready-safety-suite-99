
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { SortControls } from "./action-plan/SortControls";
import { RiskCard } from "./action-plan/RiskCard";
import { getEarliestDeadline } from "./action-plan/utils";

type ActionPlanProps = {
  risks: any[];
  onRisksUpdate: (risks: any[]) => void;
};

export const ActionPlan = ({ risks, onRisksUpdate }: ActionPlanProps) => {
  const [sortBy, setSortBy] = useState<"name" | "score" | "deadline">("score");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
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
            <SortControls 
              sortBy={sortBy} 
              sortOrder={sortOrder} 
              onSort={handleSort} 
            />
          </div>
          
          {sortedRisks.map((risk) => (
            <RiskCard 
              key={risk.id} 
              risk={risk} 
              onRisksUpdate={onRisksUpdate} 
              allRisks={risks} 
            />
          ))}
        </>
      )}
    </div>
  );
};
