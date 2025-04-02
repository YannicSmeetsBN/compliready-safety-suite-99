
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { addTrainingToEmployee } from "@/data/dataManager";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface AddTrainingFormProps {
  employeeId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

// Mock data for training types
const trainingTypes = [
  { id: "bhv-new", name: "BHV - Nieuw" },
  { id: "bhv-refresh", name: "BHV - Herhaling" },
  { id: "vca-basic", name: "VCA Basis" },
  { id: "vca-vol", name: "VCA-VOL" },
  { id: "first-aid", name: "EHBO" },
  { id: "forklift", name: "Heftruck" }
];

// Mock data for training providers and available dates
const trainingProviders = {
  "bhv-new": [
    {
      id: 1,
      name: "Veiligheid & Co",
      availableDates: [
        { date: new Date(2024, 7, 15), spotsLeft: 5 },
        { date: new Date(2024, 7, 20), spotsLeft: 3 },
        { date: new Date(2024, 7, 27), spotsLeft: 0 } // Full
      ]
    },
    {
      id: 2,
      name: "BHV Centrum Nederland",
      availableDates: [
        { date: new Date(2024, 7, 10), spotsLeft: 2 },
        { date: new Date(2024, 8, 5), spotsLeft: 8 }
      ]
    }
  ],
  "bhv-refresh": [
    {
      id: 1,
      name: "Veiligheid & Co",
      availableDates: [
        { date: new Date(2024, 7, 18), spotsLeft: 4 },
        { date: new Date(2024, 8, 1), spotsLeft: 0 } // Full
      ]
    },
    {
      id: 3,
      name: "Hulpverlening Academie",
      availableDates: [
        { date: new Date(2024, 7, 22), spotsLeft: 6 }
      ]
    }
  ],
  "vca-basic": [
    {
      id: 4,
      name: "VCA Opleidingen",
      availableDates: [
        { date: new Date(2024, 7, 12), spotsLeft: 7 },
        { date: new Date(2024, 7, 25), spotsLeft: 4 }
      ]
    }
  ],
  "vca-vol": [
    {
      id: 4,
      name: "VCA Opleidingen",
      availableDates: [
        { date: new Date(2024, 7, 13), spotsLeft: 6 },
        { date: new Date(2024, 7, 26), spotsLeft: 2 }
      ]
    }
  ],
  "first-aid": [
    {
      id: 5,
      name: "Rode Kruis",
      availableDates: [
        { date: new Date(2024, 8, 3), spotsLeft: 5 }
      ]
    }
  ],
  "forklift": [
    {
      id: 6,
      name: "Logistiek Training Centrum",
      availableDates: [
        { date: new Date(2024, 7, 19), spotsLeft: 4 },
        { date: new Date(2024, 8, 9), spotsLeft: 7 }
      ]
    }
  ]
};

export const AddTrainingForm = ({ 
  employeeId, 
  onSuccess, 
  onCancel 
}: AddTrainingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    status: "planned",
    provider: ""
  });
  const [selectedTrainingType, setSelectedTrainingType] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  // Update available providers when training type changes
  useEffect(() => {
    if (selectedTrainingType) {
      // Reset selected provider and date when training type changes
      setSelectedProvider(null);
      setSelectedDate(undefined);
      setAvailableDates([]);
    }
  }, [selectedTrainingType]);

  // Update available dates when provider changes
  useEffect(() => {
    if (selectedTrainingType && selectedProvider !== null) {
      const providerData = trainingProviders[selectedTrainingType]?.find(p => p.id === selectedProvider);
      if (providerData) {
        // Only include dates with available spots
        const dates = providerData.availableDates
          .filter(d => d.spotsLeft > 0)
          .map(d => d.date);
        setAvailableDates(dates);
        setSelectedDate(undefined);
      }
    }
  }, [selectedProvider, selectedTrainingType]);

  // Update form data when date is selected
  useEffect(() => {
    if (selectedDate) {
      const selectedTraining = trainingTypes.find(t => t.id === selectedTrainingType);
      const providerData = trainingProviders[selectedTrainingType]?.find(p => p.id === selectedProvider);
      
      if (selectedTraining && providerData) {
        setFormData({
          name: `${selectedTraining.name} (${providerData.name})`,
          date: format(selectedDate, 'yyyy-MM-dd'),
          status: "planned",
          provider: providerData.name
        });
      }
    }
  }, [selectedDate, selectedTrainingType, selectedProvider]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
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

        {selectedTrainingType && (
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
        )}

        {selectedProvider !== null && availableDates.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="date">Selecteer beschikbare datum</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "d MMMM yyyy", { locale: nl })
                  ) : (
                    <span>Kies een datum</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={date => !availableDates.some(d => 
                    d.getFullYear() === date.getFullYear() && 
                    d.getMonth() === date.getMonth() && 
                    d.getDate() === date.getDate()
                  )}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {availableDates.length === 0 && (
              <p className="text-sm text-red-500">
                Geen beschikbare data voor deze opleider.
              </p>
            )}
          </div>
        )}

        {selectedDate && (
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecteer status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planned">Gepland</SelectItem>
                <SelectItem value="completed">Afgerond</SelectItem>
                <SelectItem value="cancelled">Geannuleerd</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
