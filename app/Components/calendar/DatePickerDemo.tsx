"use client";

import * as React from "react";
import { format, parse, parseISO, isValid, differenceInYears, subYears } from "date-fns";
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
  const thirteenYearsAgo = subYears(new Date(), 13); // Calculate 13 years ago
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate && typeof selectedDate === "string" && isValid(parseISO(selectedDate))
      ? parseISO(selectedDate)
      : thirteenYearsAgo // Default to 13 years ago if no date is provided
  );
  const [manualDate, setManualDate] = React.useState<string>(selectedDate || "");
  const [error, setError] = React.useState<string>("");

  // Handle date change from calendar or input
  const handleDateChange = (selected: Date | undefined) => {
    if (!selected) {
      setError("Please select a valid date.");
      return;
    }

    // Ensure the user is at least 13 years old
    const age = differenceInYears(new Date(), selected);
    if (age < 13) {
      setError("You must be at least 13 years old.");
      return;
    }

    setError("");
    setDate(selected);

    // Format the date to "YYYY-MM-DD"
    const formattedDate = format(selected, "yyyy-MM-dd");
    setManualDate(formattedDate);
    onDateChange(formattedDate); // Send formatted date back to parent
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualDate(value);

    // Check if the value is a valid date in the correct format (yyyy-MM-dd)
    const parsedDate = parse(value, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) {
      const age = differenceInYears(new Date(), parsedDate);
      if (age < 13) {
        setError("You must be at least 13 years old.");
        return;
      }

      setError("");
      setDate(parsedDate); // Update the calendar date when input is valid
      onDateChange(value); // Pass the valid date back to the parent
    } else {
      setError("Invalid date format. Please use YYYY-MM-DD.");
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
            placeholder="YYYY-MM-DD"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          defaultMonth={thirteenYearsAgo} // Set the calendar to start at 13 years ago
          disabled={(date) =>
            date > new Date() || differenceInYears(new Date(), date) < 13 || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
