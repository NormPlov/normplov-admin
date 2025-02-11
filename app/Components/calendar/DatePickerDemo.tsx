import * as React from "react";
import { format, parseISO, isValid, differenceInYears, subYears } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

type DatePickerDemoProps = {
  selectedDate: string | null | undefined;
  onDateChange: (date: string | undefined) => void;
  dobUser: Date | string;
};

export function DatePickerDemo({ selectedDate, onDateChange, dobUser }: DatePickerDemoProps) {
  const thirteenYearsAgo = subYears(new Date(), 13);

  // State for the selected date
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [manualDate, setManualDate] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  // Parse dobUser on initial load and when dobUser changes
  React.useEffect(() => {
    let parsedDate: Date | undefined;

    if (typeof dobUser === "string" && isValid(parseISO(dobUser))) {
      parsedDate = parseISO(dobUser);
    } else if (dobUser instanceof Date) {
      parsedDate = dobUser;
    }

    if (parsedDate) {
      setDate(parsedDate);
      setManualDate(format(parsedDate, "yyyy-MM-dd"));
    } else {
      setDate(thirteenYearsAgo); // Default to 13 years ago if dobUser is invalid
    }
  }, [dobUser]);

  const handleDateChange = (selected: Date | undefined) => {
    if (!selected) {
      setError("Please select a valid date.");
      return;
    }

    const age = differenceInYears(new Date(), selected);
    if (age < 13) {
      setError("You must be at least 13 years old.");
      return;
    }

    setError("");
    setDate(selected);
    const formattedDate = format(selected, "yyyy-MM-dd");
    setManualDate(formattedDate);
    onDateChange(formattedDate);
  };

  const handleManualInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setManualDate(value);

    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) {
      const age = differenceInYears(new Date(), parsedDate);
      if (age < 13) {
        setError("You must be at least 13 years old.");
        return;
      }

      setError("");
      setDate(parsedDate);
      onDateChange(value);
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
          defaultMonth={date || thirteenYearsAgo} // Ensure only Date type is passed
          disabled={(date) =>
            date > new Date() || differenceInYears(new Date(), date) < 13 || date < new Date("1900-01-01")
          }
        />
      </PopoverContent>
    </Popover>
  );
}
