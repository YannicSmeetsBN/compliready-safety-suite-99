
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type MeasureFormProps = {
  riskId: string;
  newMeasure: {
    description: string;
    responsible: string;
    deadline: string;
    status: string;
    notes: string;
  };
  onInputChange: (field: string, value: string) => void;
  onAddMeasure: () => void;
  onCancel: () => void;
};

export const MeasureForm = ({
  riskId,
  newMeasure,
  onInputChange,
  onAddMeasure,
  onCancel
}: MeasureFormProps) => {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6 space-y-4">
        <h5 className="font-medium">Nieuwe maatregel toevoegen</h5>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor={`measure-desc-${riskId}`}>Omschrijving *</Label>
            <Textarea 
              id={`measure-desc-${riskId}`}
              value={newMeasure.description}
              onChange={(e) => onInputChange("description", e.target.value)}
              placeholder="Beschrijf de maatregel..."
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label htmlFor={`measure-resp-${riskId}`}>Verantwoordelijke</Label>
              <Input 
                id={`measure-resp-${riskId}`}
                value={newMeasure.responsible}
                onChange={(e) => onInputChange("responsible", e.target.value)}
                placeholder="Naam van verantwoordelijke"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`measure-deadline-${riskId}`}>Deadline</Label>
              <Input 
                id={`measure-deadline-${riskId}`}
                type="date"
                value={newMeasure.deadline}
                onChange={(e) => onInputChange("deadline", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`measure-status-${riskId}`}>Status</Label>
              <Select 
                value={newMeasure.status} 
                onValueChange={(value) => onInputChange("status", value)}
              >
                <SelectTrigger id={`measure-status-${riskId}`}>
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
            <Label htmlFor={`measure-notes-${riskId}`}>Notities</Label>
            <Textarea 
              id={`measure-notes-${riskId}`}
              value={newMeasure.notes}
              onChange={(e) => onInputChange("notes", e.target.value)}
              placeholder="Optionele notities..."
              rows={2}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
        >
          Annuleren
        </Button>
        <Button 
          className="bg-compliblue hover:bg-compliblue/90"
          onClick={onAddMeasure}
          disabled={!newMeasure.description}
        >
          Maatregel toevoegen
        </Button>
      </CardFooter>
    </Card>
  );
};
