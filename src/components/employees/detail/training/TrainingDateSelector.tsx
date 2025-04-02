
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface TrainingDateSelectorProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  availableDates: Date[];
}

export const TrainingDateSelector = ({
  selectedDate,
  setSelectedDate,
  availableDates
}: TrainingDateSelectorProps) => {
  return (
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
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {availableDates.length === 0 && (
        <p className="text-sm text-red-500">
          Geen beschikbare data voor deze opleider.
        </p>
      )}
    </div>
  );
};
