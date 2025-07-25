"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getStatusBadgeColor } from "@/lib/adminHelpers";
import { StaffRecord } from "@/app/hooks/useStaffRecords";

interface RecordsTableProps {
  records: StaffRecord[];
  filterType: "all" | "day" | "week";
}

export const RecordsTable = ({ records, filterType }: RecordsTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Check-In Time</TableHead>
            <TableHead>Check-In Status</TableHead>
            <TableHead>Check-Out Time</TableHead>
            <TableHead>Check-Out Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                No records found for the selected{" "}
                {filterType === "day"
                  ? "day"
                  : filterType === "week"
                    ? "week"
                    : "period"}
                .
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="font-medium text-gray-900">{record.name}</div>
                  <div className="text-sm text-gray-600">{record.email}</div>
                </TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.checkInTime || "-"}</TableCell>
                <TableCell>
                  <Badge
                    className={getStatusBadgeColor(record.checkInStatus || "-")}
                  >
                    {record.checkInStatus || "Not Checked In"}
                  </Badge>
                </TableCell>
                <TableCell>{record.checkOutTime || "-"}</TableCell>
                <TableCell>
                  <Badge
                    className={getStatusBadgeColor(
                      record.checkOutStatus || "-",
                    )}
                  >
                    {record.checkOutStatus || "Not Checked Out"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
