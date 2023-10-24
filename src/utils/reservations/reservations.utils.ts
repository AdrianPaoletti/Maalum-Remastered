import {
  BlockedDaysHours,
  ReservationsGuestsInformation,
} from "maalum/core/models/reservations.model";

const reservationsGuestsInformation: ReservationsGuestsInformation[] = [
  {
    id: "adults",
    singleTitle: "Adult",
    pluralTitle: "Adults",
    subtitle: "14 years or older",
    dollarsPrice: 20,
    shillingPrice: "40,000",
  },
  {
    id: "children",
    singleTitle: "Child",
    pluralTitle: "Children",
    subtitle: "From 5 to 13 years",
    dollarsPrice: 10,
    shillingPrice: "20,000",
  },
  {
    id: "residents",
    singleTitle: "Resident",
    pluralTitle: "Residents",
    subtitle: "National ID required",
    dollarsPrice: 15,
    shillingPrice: "30,000",
  },
];

const servicesInformation: {
  id: string;
  title: string;
  text: string;
  disclaimer?: string;
}[] = [
  {
    id: "cave",
    title: "Maalum Cave",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "",
  },
  {
    id: "caveAndSpa",
    title: "Maalum Cave + Spa",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "Maximum 4 persons per day",
  },
];

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

const addDaysToDate = (date: Date, days: number): Date =>
  new Date(date.setDate(date.getDate() + days));

const addHoursToTime = (date: Date, hours: number): Date =>
  new Date(date.setTime(date.getTime() + hours * 60 * 60 * 1000));

export {
  reservationsGuestsInformation,
  servicesInformation,
  getExcludedHours,
  addDaysToDate,
  addHoursToTime,
};
