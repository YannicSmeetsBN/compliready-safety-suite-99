
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

interface TrainingProviderSelectorProps {
  selectedTrainingType: string;
  selectedProvider: number | null;
  setSelectedProvider: (value: number) => void;
  trainingProviders: any;
}

export const TrainingProviderSelector = ({
  selectedTrainingType,
  selectedProvider,
  setSelectedProvider,
  trainingProviders
}: TrainingProviderSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="provider">Opleider</Label>
      <Select
        value={selectedProvider?.toString() || ""}
        onValueChange={(value) => setSelectedProvider(Number(value))}
        disabled={!trainingProviders[selectedTrainingType]?.length}
      >
        <SelectTrigger>
          <SelectValue placeholder="Selecteer opleider" />
        </SelectTrigger>
        <SelectContent>
          {trainingProviders[selectedTrainingType]?.map((provider) => (
            <SelectItem key={provider.id} value={provider.id.toString()}>
              {provider.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
