"use client";

import { useState } from "react";
import { Clock, TrendingUp } from "lucide-react";
import { StatsCard } from "./components/StatsCard";
import { useStaffRecords } from "@/app/hooks/useStaffRecords";
import { FilterBar } from "./components/FilterBar";
import { RecordsTable } from "./components/RecordsTable";
import { QuickActions } from "./components/QuickActions";

export default function AdminPage() {
  const [filterType, setFilterType] = useState<"all" | "day" | "week">("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const { staffRecords, totalCheckIns, onTimeCount } = useStaffRecords(
    filterType,
    selectedDate,
  );

  return (
    <div className="mx-auto space-y-6 p-4 md:w-4xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
        <StatsCard
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          label="Check-ins Today"
          count={totalCheckIns}
        />
        <StatsCard
          icon={<Clock className="h-6 w-6 text-yellow-600" />}
          label="On Time"
          count={onTimeCount}
        />
      </div>

      <FilterBar
        filterType={filterType}
        setFilterType={setFilterType}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <RecordsTable records={staffRecords} filterType={filterType} />

      {/* <QuickActions /> */}
    </div>
  );
}
