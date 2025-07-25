// hooks/useStaffRecords.ts
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface StaffRecord {
  id: string;
  name: string;
  email: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  checkInStatus?: string;
  checkOutStatus?: string;
}

export const useStaffRecords = (
  filterType: "all" | "day" | "week",
  selectedDate?: Date,
) => {
  const [staffRecords, setStaffRecords] = useState<StaffRecord[]>([]);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [onTimeCount, setOnTimeCount] = useState(0);

  useEffect(() => {
    const fetchRecords = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const groupedRecords: Record<string, StaffRecord> = {};

      for (const user of usersSnapshot.docs) {
        const userId = user.id;
        const fullName = user.data().fullName;
        const email = user.data().email;
        const logsRef = collection(db, `attendance/${userId}/logs`);

        let logQuery = query(logsRef);
        if (filterType === "day" && selectedDate) {
          const dateKey = format(selectedDate, "yyyy-MM-dd");
          logQuery = query(logsRef, where("date", "==", dateKey));
        }

        const logsSnapshot = await getDocs(logQuery);
        logsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const date = data.date;
          const key = `${userId}-${date}`;

          if (!groupedRecords[key]) {
            groupedRecords[key] = {
              id: key,
              name: fullName,
              email,
              date,
            };
          }

          if (data.checkedIn) {
            groupedRecords[key].checkInTime = new Date(
              data.checkInTime.seconds * 1000,
            ).toLocaleTimeString();
            groupedRecords[key].checkInStatus = data.checkInStatus || "-";
          }

          if (data.checkedOut) {
            groupedRecords[key].checkOutTime = new Date(
              data.checkOutTime.seconds * 1000,
            ).toLocaleTimeString();
            groupedRecords[key].checkOutStatus = data.checkOutStatus || "-";
          }
        });
      }

      const finalRecords = Object.values(groupedRecords);
      setStaffRecords(finalRecords);
      setTotalCheckIns(finalRecords.filter((r) => r.checkInTime).length);
      setOnTimeCount(
        finalRecords.filter((r) => r.checkInStatus === "on-time").length,
      );
    };

    fetchRecords();
  }, [filterType, selectedDate]);

  return { staffRecords, totalCheckIns, onTimeCount };
};
