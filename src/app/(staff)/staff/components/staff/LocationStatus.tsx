"use client";

import { useEffect, useState } from "react";
import { BadgeInfo, MapPin, MapPinOff } from "lucide-react";
import { getUserDistanceFromStore } from "@/lib/location";

interface Props {
  checkedIn: boolean;
}

export default function LocationStatus({ checkedIn }: Props) {
  const [isWithinLocation, setIsWithinLocation] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [locationChecked, setLocationChecked] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const distance = getUserDistanceFromStore(latitude, longitude);
        console.log("📍 Distance from office:", distance);
        setIsWithinLocation(distance <= 15); // ← realistic threshold
        setLocationChecked(true);
      },
      (err) => {
        console.error("❌ Location error:", err);
        setLocationError("Location access denied");
        setLocationChecked(true);
      },
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <>
      {/* Daily Status */}
      <div className="flex items-center gap-4">
        {checkedIn ? (
          <MapPin className="text-green-500" />
        ) : (
          <BadgeInfo className="text-orange-500" />
        )}
        <div>
          <h2 className="font-medium">Daily Status</h2>
          <p className="text-muted-foreground text-sm">
            {checkedIn ? "You've checked in today ✅" : "You have not checked in today"}
          </p>
        </div>
      </div>

      {/* Location Status */}
      <div className="flex items-center gap-4">
        {!locationChecked ? (
          <BadgeInfo className="text-yellow-500 animate-pulse" />
        ) : locationError ? (
          <MapPinOff className="text-orange-500" />
        ) : isWithinLocation ? (
          <MapPin className="text-green-500" />
        ) : (
          <MapPinOff className="text-orange-500" />
        )}
        <div>
          <h2 className="font-medium">Location Status</h2>
          <p className="text-muted-foreground text-sm">
            {!locationChecked
              ? "Checking location..."
              : locationError
              ? locationError
              : isWithinLocation
              ? "You're within store range"
              : "You're not near the store"}
          </p>
        </div>
      </div>
    </>
  );
}
