import { set } from "date-fns";

const now = new Date();
const startDate = new Date("2021-01-01 00:00:00")



const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

export const selectedInterval = [
  getTodayAtSpecificHour(),
  getTodayAtSpecificHour(14)
];

export const timelineInterval = [
   startDate,
   now

];

export const disabledIntervals = [
];

