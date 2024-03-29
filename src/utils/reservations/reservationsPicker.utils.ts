import {
  ADD_HOURS,
  MAX_GUESTS_PER_HOUR,
} from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  Reservation,
  ReservationsSpaCounter,
} from "maalum/core/models/reservations.model";
import { dateToUTC } from "../formatters/formatters.utils";

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

const getAccumulatedDates = (
  reservations: Reservation[],
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

  return accumulatedDates;
};

const getReservationsExcludedHours = (
  reservations: Reservation[],
  totalGuests: number,
  selectedDate: Date
) => {
  const accumulatedDates: Reservation[] = getAccumulatedDates(
    reservations,
    selectedDate
  );

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

const getReseravtionsSpaGuests = (
  reservations: Reservation[],
  selectedDate: Date
): ReservationsSpaCounter => {
  const accumulatedDates: Reservation[] = getAccumulatedDates(
    reservations,
    selectedDate
  )
    .map((reservation) => ({
      ...reservation,
      caveDate: dateToUTC(
        new Date(
          new Date(reservation.caveDate).setHours(
            new Date(reservation.caveDate).getHours() - 2
          )
        )
      ),
    }))
    .filter(
      ({ service, caveDate }) =>
        caveDate.getHours() === selectedDate.getHours() &&
        service === "caveAndSpa"
    );
  return accumulatedDates.reduce(
    (accum, value) => {
      const { spaType, totalGuests } = value;
      accum[spaType as keyof ReservationsSpaCounter] =
        (accum[spaType as keyof ReservationsSpaCounter] || 0) + totalGuests;
      return accum;
    },
    { naturalEssence: 0, maalumRitual: 0 }
  );
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

const getLastDayMonth = () =>
  new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));

const includedTimes = [
  new Date(new Date(new Date().setHours(8)).setMinutes(0)),
  new Date(new Date(new Date().setHours(9)).setMinutes(30)),
  new Date(new Date(new Date().setHours(11)).setMinutes(0)),
  new Date(new Date(new Date().setHours(30)).setMinutes(12)),
  new Date(new Date(new Date().setHours(14)).setMinutes(0)),
  new Date(new Date(new Date().setHours(30)).setMinutes(15)),
  new Date(new Date(new Date().setHours(17)).setMinutes(0)),
];

export {
  getBlockedDaysExcludedHours,
  getReservationsExcludedHours,
  getReseravtionsSpaGuests,
  getLastDayMonth,
  getMinimumHour,
  addDaysToDate,
  addHoursToTime,
  includedTimes,
};
