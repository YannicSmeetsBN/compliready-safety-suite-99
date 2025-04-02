
import { format } from "date-fns";
import { nl } from "date-fns/locale";

interface TrainingSessionDetailsProps {
  selectedSession: any;
  selectedDate: Date | undefined;
  formData: {
    name: string;
    date: string;
    status: string;
    provider: string;
    time: string;
    location: string;
    trainer: string;
  };
}

export const TrainingSessionDetails = ({
  selectedSession,
  selectedDate,
  formData
}: TrainingSessionDetailsProps) => {
  return (
    <div className="mt-4 border rounded-md p-4 bg-blue-50">
      <h3 className="font-medium mb-2">Geselecteerde trainingsessie:</h3>
      <p className="font-bold">{formData.name}</p>
      <p className="text-sm">
        <span className="font-semibold">Datum:</span> {selectedDate ? format(selectedDate, "d MMMM yyyy", { locale: nl }) : ""}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Tijd:</span> {selectedSession.time}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Locatie:</span> {selectedSession.location}
      </p>
      <p className="text-sm">
        <span className="font-semibold">Trainer:</span> {selectedSession.trainer}
      </p>
      <p className="text-sm mt-3 text-gray-600">
        Nog {selectedSession.spotsLeft} plaats(en) beschikbaar
      </p>
    </div>
  );
};
