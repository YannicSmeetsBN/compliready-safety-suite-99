
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface TrainingSessionsListProps {
  selectedTrainingType: string;
  availableTrainingSessions: any[];
  selectedDate: Date | undefined;
  handleSelectSession: (session: any) => void;
  trainingTypes: Array<{ id: string; name: string }>;
}

export const TrainingSessionsList = ({
  selectedTrainingType,
  availableTrainingSessions,
  selectedDate,
  handleSelectSession,
  trainingTypes
}: TrainingSessionsListProps) => {
  return (
    <div className="border rounded-md p-4 bg-gray-50 mt-4">
      <h3 className="font-medium mb-3">Beschikbare trainingen:</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Training</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Tijd</TableHead>
              <TableHead>Locatie</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Keuze</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {availableTrainingSessions.map((session, index) => {
              const isSelected = selectedDate && 
                session.date.getFullYear() === selectedDate.getFullYear() &&
                session.date.getMonth() === selectedDate.getMonth() &&
                session.date.getDate() === selectedDate.getDate();
              
              return (
                <TableRow 
                  key={index}
                  className={isSelected ? "bg-blue-50" : "hover:bg-blue-50/50 cursor-pointer"}
                  onClick={() => handleSelectSession(session)}
                >
                  <TableCell>
                    {trainingTypes.find(t => t.id === selectedTrainingType)?.name}
                  </TableCell>
                  <TableCell>
                    {format(session.date, "d MMMM yyyy", { locale: nl })}
                  </TableCell>
                  <TableCell>{session.time}</TableCell>
                  <TableCell>{session.location}</TableCell>
                  <TableCell>{session.trainer}</TableCell>
                  <TableCell>
                    {isSelected && (
                      <div className="rounded-full bg-green-100 w-7 h-7 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <p className="text-sm mt-3 text-gray-600">
        Klik op een rij om deze training te selecteren
      </p>
    </div>
  );
};
