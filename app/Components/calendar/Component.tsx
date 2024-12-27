"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type DatePickerDemoProps = {
  selectedDate: string | null | undefined; // Closing date
  onDateChange: (date: string | undefined) => void; // Callback for closing date
  postedAt?: string | null | undefined; // Posted at date for validation
};

export function PostedDate({
  selectedDate,
  onDateChange,
  postedAt,
}: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate && typeof selectedDate === "string" && isValid(parseISO(selectedDate))
      ? parseISO(selectedDate)
      : undefined
  );
  const [manualDate, setManualDate] = React.useState<string>(selectedDate || "");
  const [inputError, setInputError] = React.useState<string | null>(null);

  const postedAtParsedDate = postedAt ? parseISO(postedAt) : null;

  // Handle date change from the calendar
  const handleDateChange = (selected: Date | undefined) => {
    if (selected) {
      if (postedAtParsedDate && selected <= postedAtParsedDate) {
        setInputError("Closing date must be after the posted date.");
        return;
      }
    }

    setDate(selected);
    const formattedDate = selected ? format(selected, "yyyy-MM-dd'T'HH:mm:ss") : "";
    setManualDate(formattedDate);
    setInputError(null);
    onDateChange(formattedDate); // Pass to parent
  };

  // Handle manual input change
  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualDate(value);

    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) {
      if (postedAtParsedDate && parsedDate <= postedAtParsedDate) {
        setInputError("Closing date must be after the posted date.");
        return;
      }

      setDate(parsedDate);
      setInputError(null);
      onDateChange(value);
    } else {
      setInputError("Invalid date format. Use YYYY-MM-DDTHH:mm:ss.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full h-10 mt-1 text-left font-normal bg-white border-slate-200 placeholder-gray-400 text-md justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date && isValid(date) ? (
            format(date, "PPP") // Display formatted date (e.g., Dec 13, 2024)
          ) : (
            <span className="text-gray-500 text-sm">Select a closing date</span>
          )}
          <span className="inline-block ml-2">
            <CalendarDays className="h-8 w-8" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 text-slate-700">
        <div className="p-2">
          {/* Manual date input */}
          <input
            type="text"
            value={manualDate}
            onChange={handleManualInputChange}
            placeholder="YYYY-MM-DDTHH:mm:ss"
            className={`w-full p-2 border ${
              inputError ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {inputError && (
            <p className="text-red-500 text-sm mt-1">{inputError}</p>
          )}
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={(date) =>
            (postedAtParsedDate && date <= postedAtParsedDate) ||
            date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
