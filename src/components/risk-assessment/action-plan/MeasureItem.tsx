
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, CheckCircle, Clock, X } from "lucide-react";
import { formatDate } from "./utils";

type MeasureItemProps = {
  measure: any;
  riskId: string;
  onDeleteMeasure: (riskId: string, measureId: string) => void;
  onUpdateMeasureStatus: (riskId: string, measureId: string, status: string) => void;
};

export const MeasureItem = ({ 
  measure, 
  riskId, 
  onDeleteMeasure, 
  onUpdateMeasureStatus 
}: MeasureItemProps) => {
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

  return (
    <div className="bg-gray-50 p-3 rounded-md relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 text-gray-400 hover:text-red-500"
        onClick={() => onDeleteMeasure(riskId, measure.id)}
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
            onValueChange={(value) => onUpdateMeasureStatus(riskId, measure.id, value)}
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
  );
};
