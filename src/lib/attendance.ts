import {
  doc,
  setDoc,
  getDoc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { getPunctualityStatus } from "./punctuality";
import { differenceInMinutes, format } from "date-fns";

type AttendanceAction = "check-in" | "check-out";

// In lib/attendance.ts

export async function handleAttendanceAction(
  userId: string,
  type: AttendanceAction,
  name?: string,
): Promise<{
  name: string;
  action: string;
  time: string;
  status: string;
} | null> {
  const now = new Date();
  const dateKey = format(now, "yyyy-MM-dd");
  const attendanceRef = doc(db, `attendance/${userId}/logs/${dateKey}`);
  const snapshot = await getDoc(attendanceRef);
  const punctuality = getPunctualityStatus(type, now);
  const nowTS = Timestamp.fromDate(now);
  const readableTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (type === "check-in" && !snapshot.exists()) {
    await setDoc(attendanceRef, {
      date: dateKey,
      checkedIn: true,
      checkedOut: false,
      checkInTime: nowTS,
      checkInStatus: punctuality,
      createdAt: serverTimestamp(),
    });
    if (name) {
      return {
        name,
        action: "Check-In",
        time: readableTime,
        status: punctuality,
      };
    }
  }

  if (type === "check-out" && snapshot.exists()) {
    const prev = snapshot.data();
    const checkInDate = prev.checkInTime?.toDate?.();

    let durationHours = 0;
    let readableDuration = "0h 0m";
    if (checkInDate) {
      const totalMinutes = differenceInMinutes(now, checkInDate);
      durationHours = totalMinutes / 60;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      readableDuration = `${hours}h ${minutes}m`;
    }

    await setDoc(
      attendanceRef,
      {
        checkedOut: true,
        checkOutTime: nowTS,
        checkOutStatus: punctuality,
        durationHours: Number(durationHours.toFixed(2)),
        readableDuration,
      },
      { merge: true },
    );

    if (name) {
      return {
        name,
        action: "Check-Out",
        time: readableTime,
        status: punctuality,
      };
    }
  }

  return null;
}
