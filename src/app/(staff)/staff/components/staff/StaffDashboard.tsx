"use client";

import { useUser } from "@clerk/nextjs";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { getPunctualityStatus, Punctuality } from "@/lib/punctuality";
import { AlertCircleIcon, BadgeCheckIcon, CheckIcon } from "lucide-react";
import LocationStatus from "./LocationStatus";
import CheckActionButtons from "./CheckActionButtons";

type AttendanceLog = {
  checkedIn: boolean;
  checkedOut: boolean;
  checkInTime?: any;
  checkOutTime?: any;
};

export default function StaffDashboard() {
  const { user, isSignedIn } = useUser();
  const userId = user?.id;
  const today = format(new Date(), "EEEE, MMMM d, yyyy");
  const dateKey = format(new Date(), "yyyy-MM-dd");

  const [log, setLog] = useState<AttendanceLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchLog = async () => {
      const ref = doc(db, `attendance/${userId}/logs/${dateKey}`);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setLog(snap.data() as AttendanceLog);
      }
      setLoading(false);
    };

    fetchLog();
  }, [userId, dateKey]);

  function getBadgeProps(
    type: "check-in" | "check-out",
    time: any,
  ): {
    icon: React.ReactNode;
    label: string;
    className?: string;
  } {
    const punctuality = getPunctualityStatus(
      type,
      time?.toDate ? time.toDate() : time,
    );
    if (punctuality === "early") {
      return {
        icon: <CheckIcon className="mr-1" strokeWidth={3} />,
        label: "Early",
        className:
          "bg-blue-100 border border-blue-500 text-black mt-2 rounded-full px-3 py-1 font-semibold",
      };
    } else if (punctuality === "on-time") {
      return {
        icon: <BadgeCheckIcon className="mr-1" strokeWidth={3} />,
        label: "On Time",
        className:
          "bg-green-100 border border-green-600 text-black mt-2 rounded-full px-3 py-1 font-semibold",
      };
    } else {
      return {
        icon: <AlertCircleIcon className="mr-1" strokeWidth={3} />,
        label: "Late",
        className:
          "bg-red-100 border border-red-600 text-black mt-2 rounded-full px-3 py-1 font-semibold",
      };
    }
  }

  const checkInBadge =
    log?.checkedIn && log.checkInTime
      ? getBadgeProps("check-in", log.checkInTime)
      : null;
  const checkOutBadge =
    log?.checkedOut && log.checkOutTime
      ? getBadgeProps("check-out", log.checkOutTime)
      : null;

  return (
    <div className="mx-auto space-y-6 p-6 md:w-4xl">
      <header className="space-y-2">
        <h1 className="text-2xl leading-tight font-semibold">
          Good day, {user?.firstName ?? "Staff"}
        </h1>
        <p className="text-muted-foreground text-sm">{today}</p>
        <div className="gap flex items-center justify-between">
          <div>
            <span className="text-muted-foreground mr-1 text-xs">
              Check-in:
            </span>
            {checkInBadge ? (
              <Badge className={checkInBadge.className}>
                {checkInBadge.icon}
                {checkInBadge.label}
              </Badge>
            ) : (
              <Badge className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                Not Checked In
              </Badge>
            )}
          </div>
          <div>
            <span className="text-muted-foreground mr-1 text-xs">
              Check-out:
            </span>
            {checkOutBadge ? (
              <Badge className={checkOutBadge.className}>
                {checkOutBadge.icon}
                {checkOutBadge.label}
              </Badge>
            ) : (
              <Badge className="rounded-full border border-gray-400 bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                Not Checked Out
              </Badge>
            )}
          </div>
        </div>
      </header>

      <Card>
        <CardContent className="space-y-6 py-6">
          {/* ✅ Fixed line below */}
          <LocationStatus checkedIn={log?.checkedIn ?? false} />
          {userId && (
            <CheckActionButtons
              name={`${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim()}
              userId={userId}
              log={log}
              setLog={setLog}
              loading={loading}
            />
          )}
        </CardContent>
      </Card>

      <div>
        <span>Last Activity</span>
        <div>
          {log ? (
            <>
              <p className="text-muted-foreground text-sm">
                {log.checkedIn
                  ? `Checked in at ${log.checkInTime?.toDate().toLocaleTimeString()}`
                  : "Not checked in today"}
              </p>
              <p className="text-muted-foreground text-sm">
                {log.checkedOut
                  ? `Checked out at ${log.checkOutTime?.toDate().toLocaleTimeString()}`
                  : "Not checked out yet"}
              </p>
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No activity today</p>
          )}
        </div>
      </div>
      <p className="text-muted-foreground text-sm">
        Note: Ensure your location services are enabled for accurate tracking.
      </p>
    </div>
  );
}
