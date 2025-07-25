// components/admin/FilterBar.tsx
"use client";

import { format, startOfWeek } from "date-fns";
import { CalendarIcon, Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filterType: "all" | "day" | "week";
  setFilterType: (value: "all" | "day" | "week") => void;
  selectedDate?: Date;
  setSelectedDate: (date?: Date) => void;
}

export const FilterBar = ({
  filterType,
  setFilterType,
  selectedDate,
  setSelectedDate,
}: FilterBarProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Staff Activity</h2>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <FilterIcon className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Records</SelectItem>
              <SelectItem value="day">Single Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>

          {(filterType === "day" || filterType === "week") && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[200px] justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    filterType === "week" ? (
                      `Week of ${format(startOfWeek(selectedDate, { weekStartsOn: 1 }), "MMM d")}`
                    ) : (
                      format(selectedDate, "MMM d, yyyy")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="pointer-events-auto p-3"
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};
