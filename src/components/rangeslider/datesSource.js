import { set } from "date-fns";

const now = new Date();

const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

export const selectedInterval = [
  getTodayAtSpecificHour(),
  getTodayAtSpecificHour(14)
];

export const timelineInterval = [
  getTodayAtSpecificHour(7),
  getTodayAtSpecificHour(24)
];

export const disabledIntervals = [
  { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
  { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
  { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) }
];

