
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addTrainingToEmployee } from "@/data/dataManager";
import { format } from "date-fns";
import { TrainingTypeSelector } from "./training/TrainingTypeSelector";
import { TrainingProviderSelector } from "./training/TrainingProviderSelector";
import { TrainingDateSelector } from "./training/TrainingDateSelector";
import { TrainingSessionsList } from "./training/TrainingSessionsList";
import { TrainingSessionDetails } from "./training/TrainingSessionDetails";
import { formatDate } from "./training/trainingUtils";
import { trainingTypes, trainingProviders } from "./training/trainingData";

interface AddTrainingFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AddTrainingForm = ({ 
  employeeId, 
  onSuccess, 
  onCancel 
}: AddTrainingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "planned",
    provider: "",
    time: "",
    location: "",
    trainer: ""
  });
  const [selectedTrainingType, setSelectedTrainingType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [availableTrainingSessions, setAvailableTrainingSessions] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSession, setSelectedSession] = useState<any | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Update available providers when training type changes
  useEffect(() => {
    if (selectedTrainingType) {
      // Reset selected provider and date when training type changes
      setSelectedProvider(null);
      setSelectedDate(undefined);
      setSelectedSession(null);
      setAvailableDates([]);
      setAvailableTrainingSessions([]);
    }
  }, [selectedTrainingType]);

  // Update available dates when provider changes
  useEffect(() => {
    if (selectedTrainingType && selectedProvider !== null) {
      const providerData = trainingProviders[selectedTrainingType]?.find(p => p.id === selectedProvider);
      if (providerData) {
        // Only include dates with available spots
        const sessions = providerData.availableDates.filter(d => d.spotsLeft > 0);
        setAvailableTrainingSessions(sessions);
        const dates = sessions.map(d => d.date);
        setAvailableDates(dates);
        setSelectedDate(undefined);
        setSelectedSession(null);
      }
    }
  }, [selectedProvider, selectedTrainingType]);

  // Update form data when date is selected
  useEffect(() => {
    if (selectedDate) {
      const selectedTraining = trainingTypes.find(t => t.id === selectedTrainingType);
      const providerData = trainingProviders[selectedTrainingType]?.find(p => p.id === selectedProvider);
      
      if (selectedTraining && providerData) {
        const session = providerData.availableDates.find(s => 
          s.date.getFullYear() === selectedDate.getFullYear() &&
          s.date.getMonth() === selectedDate.getMonth() &&
          s.date.getDate() === selectedDate.getDate()
        );
        
        if (session) {
          setSelectedSession(session);
          setFormData({
            name: `${selectedTraining.name} (${providerData.name})`,
            date: format(selectedDate, 'yyyy-MM-dd'),
            status: "planned",
            provider: providerData.name,
            time: session.time,
            location: session.location,
            trainer: session.trainer
          });
        }
      }
    }
  }, [selectedDate, selectedTrainingType, selectedProvider]);

  const handleSelectSession = (session: any) => {
    setSelectedDate(session.date);
    setSelectedSession(session);
    
    const selectedTraining = trainingTypes.find(t => t.id === selectedTrainingType);
    const providerData = trainingProviders[selectedTrainingType]?.find(p => p.id === selectedProvider);
    
    if (selectedTraining && providerData) {
      setFormData({
        name: `${selectedTraining.name} (${providerData.name})`,
        date: format(session.date, 'yyyy-MM-dd'),
        status: "planned",
        provider: providerData.name,
        time: session.time,
        location: session.location,
        trainer: session.trainer
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Format date to DD-MM-YYYY
    const formattedData = {
      ...formData,
      date: formatDate(formData.date),
    };

    // Add training to employee
    const success = addTrainingToEmployee(employeeId, formattedData);

    if (success) {
      toast({
        title: "Training gepland",
        description: `${formData.name} is succesvol ingepland voor ${formattedData.date}.`,
      });
      onSuccess();
    } else {
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het plannen van de training.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 gap-4">
        <TrainingTypeSelector 
          selectedTrainingType={selectedTrainingType} 
          setSelectedTrainingType={setSelectedTrainingType}
          trainingTypes={trainingTypes}
        />

        {selectedTrainingType && (
          <TrainingProviderSelector 
            selectedTrainingType={selectedTrainingType}
            selectedProvider={selectedProvider}
            setSelectedProvider={setSelectedProvider}
            trainingProviders={trainingProviders}
          />
        )}

        {selectedProvider !== null && availableDates.length > 0 && (
          <TrainingDateSelector 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableDates={availableDates}
          />
        )}

        {selectedProvider !== null && availableTrainingSessions.length > 0 && (
          <TrainingSessionsList 
            selectedTrainingType={selectedTrainingType}
            availableTrainingSessions={availableTrainingSessions}
            selectedDate={selectedDate}
            handleSelectSession={handleSelectSession}
            trainingTypes={trainingTypes}
          />
        )}

        {selectedSession && (
          <TrainingSessionDetails 
            selectedSession={selectedSession}
            selectedDate={selectedDate}
            formData={formData}
          />
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4 mt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuleren
        </Button>
        <Button 
          type="submit" 
          className="bg-compliblue hover:bg-compliblue/90"
          disabled={submitting || !selectedDate}
        >
          {submitting ? "Opslaan..." : "Opslaan"}
        </Button>
      </div>
    </form>
  );
};
