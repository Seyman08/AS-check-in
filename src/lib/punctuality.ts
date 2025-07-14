import {
  setHours,
  setMinutes,
  isBefore,
  isAfter,
  isEqual,
  addMinutes,
} from "date-fns";

export type Punctuality = "early" | "on-time" | "late";

const START_HOUR = 9;
const END_HOUR = 18;
const GRACE_MINUTES = 10;

export function getPunctualityStatus(
  type: "check-in" | "check-out",
  date: Date,
): Punctuality {
  if (type === "check-in") {
    const start = setMinutes(setHours(date, START_HOUR), 0);
    const startWithGrace = addMinutes(start, GRACE_MINUTES);

    if (isBefore(date, start)) {
      return "early";
    }
    if (
      (isEqual(date, start) || isAfter(date, start)) &&
      !isAfter(date, startWithGrace)
    ) {
      return "on-time";
    }
    return "late";
  }

  if (type === "check-out") {
    const end = setMinutes(setHours(date, END_HOUR), 0);
    const endWithGrace = addMinutes(end, GRACE_MINUTES);

    if (isBefore(date, end)) {
      return "early";
    }
    if (
      (isEqual(date, end) || isAfter(date, end)) &&
      !isAfter(date, endWithGrace)
    ) {
      return "on-time";
    }
    return "late";
  }

  return "late";
}
