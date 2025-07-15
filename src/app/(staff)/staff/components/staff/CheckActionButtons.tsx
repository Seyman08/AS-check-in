import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { handleAttendanceAction } from "@/lib/attendance";
import { Button } from "@/components/ui/button";
import { CheckCircle, LogOut } from "lucide-react";
import { sendAttendanceNotification } from "@/lib/sendEmail";
import { getUserDistanceFromStore } from "@/lib/location";

type AttendanceLog = {
  checkedIn: boolean;
  checkedOut: boolean;
  checkInTime?: any;
  checkOutTime?: any;
};

interface Props {
  userId: string;
  name: string;
  log: AttendanceLog | null;
  setLog: React.Dispatch<React.SetStateAction<AttendanceLog | null>>;
  loading: boolean;
}

export default function CheckActionButtons({
  userId,
  name,
  log,
  setLog,
  loading,
}: Props) {
  const [actionLoading, setActionLoading] = useState(false);
  const [isWithinRange, setIsWithinRange] = useState(false);
  const [locationChecked, setLocationChecked] = useState(false);

  const today = new Date();
  const dateKey = today.toISOString().split("T")[0];

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getUserDistanceFromStore(latitude, longitude);
        setIsWithinRange(distance <= 15); // ✅ Only allow check-in within 15 meters
        setLocationChecked(true);
      },
      (error) => {
        console.error("Location error:", error);
        setLocationChecked(true);
      }
    );
  }, []);

  const handleAction = async (type: "check-in" | "check-out") => {
    if (!userId) return;
    setActionLoading(true);

    const result = await handleAttendanceAction(userId, type, name);
    const ref = doc(db, `attendance/${userId}/logs/${dateKey}`);
    const snap = await getDoc(ref);
    if (snap.exists()) setLog(snap.data() as AttendanceLog);

    if (result) {
      await sendAttendanceNotification(
        result.name,
        result.action,
        result.time,
        result.status
      );
    }

    setActionLoading(false);
  };

  const baseStyle =
    "w-1/2 font-medium transition-all relative py-6 flex items-center justify-center gap-2";
  const checkInFeedback = log?.checkedIn
    ? "bg-green-100 text-black border-green-500 border-2"
    : "";
  const checkOutFeedback = log?.checkedOut
    ? "bg-red-100 text-black border-red-500 border-2"
    : "";

  return (
    <div className="flex w-full items-center justify-between space-x-2">
      <Button
        onClick={() => handleAction("check-in")}
        disabled={
          log?.checkedIn || actionLoading || loading || !isWithinRange || !locationChecked
        }
        className={`${baseStyle} ${checkInFeedback}`}
        variant="outline"
      >
        <CheckCircle className="h-5 w-5" />
        {actionLoading && !log?.checkedIn
          ? "Checking In..."
          : log?.checkedIn
            ? "Checked In"
            : !isWithinRange && locationChecked
              ? "Not in Range"
              : "Check In"}
      </Button>

      <Button
        onClick={() => handleAction("check-out")}
        variant="outline"
        disabled={
          !log?.checkedIn || log?.checkedOut || actionLoading || loading
        }
        className={`${baseStyle} ${checkOutFeedback}`}
      >
        <LogOut className="h-5 w-5 text-red-500" />
        {actionLoading && !log?.checkedOut
          ? "Checking Out..."
          : log?.checkedOut
            ? "Checked Out"
            : "Check Out"}
      </Button>
    </div>
  );
}
