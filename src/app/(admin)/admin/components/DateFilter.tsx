import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export function DateFilter({ onChange }: { onChange: (date: string) => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="flex flex-col items-start gap-2">
      <p className="text-sm font-medium">Select a date</p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(newDate) => {
          setDate(newDate);
          if (newDate) onChange(format(newDate, "yyyy-MM-dd"));
        }}
        className="rounded-md border"
      />
    </div>
  );
}
