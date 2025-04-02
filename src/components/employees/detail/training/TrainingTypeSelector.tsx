
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface TrainingTypeSelectorProps {
  selectedTrainingType: string;
  setSelectedTrainingType: (value: string) => void;
  trainingTypes: Array<{ id: string; name: string }>;
}

export const TrainingTypeSelector = ({
  selectedTrainingType,
  setSelectedTrainingType,
  trainingTypes
}: TrainingTypeSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="trainingType">Type training</Label>
      <Select
        value={selectedTrainingType}
        onValueChange={(value) => setSelectedTrainingType(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecteer type training" />
        </SelectTrigger>
        <SelectContent>
          {trainingTypes.map((type) => (
            <SelectItem key={type.id} value={type.id}>
              {type.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
