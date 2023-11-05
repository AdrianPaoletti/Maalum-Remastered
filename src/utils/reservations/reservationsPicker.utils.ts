import { ADD_HOURS } from "maalum/core/constants/constants";
import { BlockedDaysHours } from "maalum/core/models/reservations.model";

const getExcludedHours = (
  blockedDaysHours: BlockedDaysHours[],
  startingDate: Date
): Date[] => {
  const excludedHours: Date[] = [];
  const date = new Date(startingDate);

  const matchedDates = blockedDaysHours.filter(
    ({ dates }) =>
      dates
        .map((date) => new Date(date).getDate())
        .indexOf(startingDate.getDate()) > -1
  );
  for (const { hours: matchedDatesHours } of matchedDates) {
    matchedDatesHours.forEach((hour) => {
      const [hours, minutes] = hour.split(":");
      excludedHours.push(
        new Date(new Date(date.setHours(+hours)).setMinutes(+minutes))
      );
    });
  }

  return excludedHours;
};

const getMinimumHour = (selectedDate: Date): Date => {
  const isTodaySelected =
    new Date().toLocaleDateString() === selectedDate.toLocaleDateString();

  return isTodaySelected
    ? addHoursToTime(new Date(), ADD_HOURS)
    : new Date(new Date(selectedDate).setHours(0, 0));
};

const addDaysToDate = (date: Date, days: number): Date =>
  new Date(date.setDate(date.getDate() + days));

const addHoursToTime = (date: Date, hours: number): Date =>
  new Date(date.setTime(date.getTime() + hours * 60 * 60 * 1000));

export { getExcludedHours, getMinimumHour, addDaysToDate, addHoursToTime };
