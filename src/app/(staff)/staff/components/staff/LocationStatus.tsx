"use client";

import { useEffect, useState } from "react";
import { BadgeInfo, MapPin, MapPinOff } from "lucide-react";
import { getUserDistanceFromStore } from "@/lib/location";

export default function LocationStatus() {
  const [isWithinLocation, setIsWithinLocation] = useState(false);
  const [locationError, setLocationError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const within = getUserDistanceFromStore(latitude, longitude) <= 2;
        setIsWithinLocation(within);
      },
      (err) => setLocationError("Location access denied"),
      { enableHighAccuracy: true },
    );
  }, []);

  return (
    <>
      {/* Daily Status */}
      <div className="flex items-center gap-4">
        <BadgeInfo className="text-orange-500" />
        <div>
          <h2 className="font-medium">Daily Status</h2>
          <p className="text-muted-foreground text-sm">
            You have not checked in today
          </p>
        </div>
      </div>

      {/* Location Status */}
      <div className="flex items-center gap-4">
        {locationError ? (
          <MapPinOff className="text-orange-500" />
        ) : isWithinLocation ? (
          <MapPin className="text-green-500" />
        ) : (
          <MapPinOff className="text-orange-500" />
        )}
        <div>
          <h2 className="font-medium">Location Status</h2>
          <p className="text-muted-foreground text-sm">
            {locationError
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
