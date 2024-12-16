"use client";

import * as React from "react";
import { format, parseISO, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type DatePickerDemoProps = {
  selectedDate: string | null | undefined;
  onDateChange: (date: string | undefined) => void;
};

export function DatePickerDemo({ selectedDate, onDateChange }: DatePickerDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate && typeof selectedDate === "string" && isValid(parseISO(selectedDate))
      ? parseISO(selectedDate)
      : undefined
  );
  const [manualDate, setManualDate] = React.useState<string>(selectedDate || "");

  // Handle date change from calendar or input
  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);

    // Format the date to "YYYY-MM-DDTHH:mm:ss"
    const formattedDate = selected ? format(selected, "yyyy-MM-dd'T'HH:mm:ss") : "";
    setManualDate(formattedDate);
    onDateChange(formattedDate); // Send formatted date back to parent
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualDate(value);

    // Check if the value is a valid date in the correct format (yyyy-MM-dd'T'HH:mm:ss)
    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) {
      setDate(parsedDate); // Update the calendar date when input is valid
      onDateChange(value); // Pass the valid date back to the parent
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-10 mt-1 text-left font-normal bg-white border-slate-200 placeholder-gray-400 text-md justify-between",
            !date && "text-muted-foreground"
          )}
        >
          {date && isValid(date) ? format(date, "PPP") : <span className="text-gray-500 text-sm">Date of birth</span>}
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
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        />
      </PopoverContent>
    </Popover>
  );
}
