
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { ChevronDown, Filter, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getLocations } from "@/components/common/LocationSelector";

interface ReportFiltersProps {
  selectedReportType: string | null;
  setSelectedReportType: (value: string | null) => void;
  selectedLocation: string | null;
  setSelectedLocation: (value: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (value: string | null) => void;
  dateRange: DateRange;
  handleDateRangeChange: (range: DateRange) => void;
}

export const ReportFilters = ({
  selectedReportType,
  setSelectedReportType,
  selectedLocation,
  setSelectedLocation,
  selectedStatus,
  setSelectedStatus,
  dateRange,
  handleDateRangeChange,
}: ReportFiltersProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filter rapportages</span>
          <ChevronDown size={14} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4 p-1">
          <div className="space-y-2">
            <Label>Type rapport</Label>
            <Select value={selectedReportType || ""} onValueChange={(value) => setSelectedReportType(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecteer type rapport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle rapporten</SelectItem>
                <SelectItem value="certificate">Certificaten</SelectItem>
                <SelectItem value="pbm">PBM's</SelectItem>
                <SelectItem value="safety">Veiligheidsmiddelen</SelectItem>
                <SelectItem value="incident">Incidenten</SelectItem>
                <SelectItem value="exercise">Oefeningen</SelectItem>
                <SelectItem value="audit">Audit</SelectItem>
                <SelectItem value="bhv">BHV</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Locatie</Label>
            <Select value={selectedLocation || ""} onValueChange={(value) => setSelectedLocation(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Alle locaties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle locaties</SelectItem>
                {getLocations().map(location => (
                  <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
              <SelectTrigger>
                <SelectValue placeholder="Alle statussen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Alle statussen</SelectItem>
                <SelectItem value="active">Actief</SelectItem>
                <SelectItem value="expired">Verlopen</SelectItem>
                <SelectItem value="expiring">Bijna verlopen</SelectItem>
                <SelectItem value="action">Actie vereist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Periode</Label>
            <DatePickerWithRange 
              date={dateRange} 
              setDate={handleDateRangeChange} 
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedReportType(null);
                setSelectedLocation(null);
                setSelectedStatus(null);
                handleDateRangeChange({
                  from: new Date(),
                  to: addDays(new Date(), 30),
                });
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Wissen
            </Button>
            <Button size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Toepassen
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
