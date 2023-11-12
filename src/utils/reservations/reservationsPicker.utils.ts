import {
  ADD_HOURS,
  MAX_GUESTS_PER_HOUR,
} from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  Reservation,
} from "maalum/core/models/reservations.model";

const getBlockedDaysExcludedHours = (
  blockedDaysHours: BlockedDaysHours[],
  selectedDate: Date
): Date[] => {
  const excludedHours: Date[] = [];
  const date = new Date(selectedDate);

  const matchedDates = blockedDaysHours.filter(
    ({ dates }) =>
      dates
        .map((date) => new Date(date).getDate())
        .indexOf(selectedDate.getDate()) > -1
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

const getReservationsExcludedHours = (
  reservations: Reservation[],
  totalGuests: number,
  selectedDate: Date
) => {
  const accumulatedDates: Reservation[] = [];

  const excludedDates = reservations.filter(
    ({ date }) => new Date(date).getDate() === selectedDate.getDate()
  );

  excludedDates.forEach((reservation) => {
    const indexAccumulatedDates = accumulatedDates.findIndex(
      (accumulatedDate) => accumulatedDate?.date === reservation.date
    );

    if (indexAccumulatedDates > -1) {
      accumulatedDates[indexAccumulatedDates].totalGuests +=
        reservation.totalGuests;
      return;
    }

    accumulatedDates.push({ ...reservation });
  });

  return accumulatedDates
    .filter(
      ({ totalGuests: totalReservationsGuests }) =>
        MAX_GUESTS_PER_HOUR - totalReservationsGuests < totalGuests
    )
    .map(({ date: reservationDate }) => {
      const date = new Date(reservationDate);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;

      return new Date(date.getTime() + userTimezoneOffset);
    });
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

export {
  getBlockedDaysExcludedHours,
  getReservationsExcludedHours,
  getMinimumHour,
  addDaysToDate,
  addHoursToTime,
};
