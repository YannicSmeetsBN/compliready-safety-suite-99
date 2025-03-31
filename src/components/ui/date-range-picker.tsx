
import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: (date: DateRange) => void;
  className?: string;
}

export function DatePickerWithRange({
  date,
  setDate,
  className,
}: DatePickerWithRangeProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd-MM-yyyy")} -{" "}
                  {format(date.to, "dd-MM-yyyy")}
                </>
              ) : (
                format(date.from, "dd-MM-yyyy")
              )
            ) : (
              <span>Selecteer datumbereik</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              if (selectedDate) {
                setDate(selectedDate);
              }
            }}
            numberOfMonths={2}
          />
          <div className="p-3 border-t flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDate({
                  from: undefined,
                  to: undefined,
                });
              }}
            >
              Wissen
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const today = new Date();
                setDate({
                  from: today,
                  to: addDays(today, 30),
                });
              }}
            >
              30 dagen
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
