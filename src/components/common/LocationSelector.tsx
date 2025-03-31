
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

// Demo locations for the employer
const demoLocations = [
  { id: "1", name: "Hoofdkantoor Amsterdam" },
  { id: "2", name: "Productielocatie Rotterdam" },
  { id: "3", name: "Magazijn Utrecht" },
  { id: "4", name: "R&D Centrum Eindhoven" },
  { id: "5", name: "Distributiecentrum Zwolle" },
];

interface LocationSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const LocationSelector = ({
  value,
  onChange,
  placeholder = "Selecteer locatie",
  className,
}: LocationSelectorProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <MapPin className="text-gray-400 flex-shrink-0" size={20} />
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="flex-1">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {demoLocations.map((location) => (
            <SelectItem key={location.id} value={location.id}>
              {location.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

// Export locations for reuse across components
export const getLocations = () => demoLocations;
