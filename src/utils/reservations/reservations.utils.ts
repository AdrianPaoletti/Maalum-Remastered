import {
  ADD_HOURS,
  ADULTS_PRICE,
  CHILDREN_PRICE,
  RESIDENTS_PRICE,
} from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  ReservationsConfirmationInformation,
  ReservationsGuestsInformation,
  ReservationsPickerInformation,
  ReservationsPickerSubmited,
} from "maalum/core/models/reservations.model";

const initialReservationsPickerInformation: ReservationsPickerInformation = {
  adults: 0,
  children: 0,
  residents: 0,
  totalGuests: 0,
  date: null,
  service: "",
};

const initialReservationsConfirmationInformation: ReservationsConfirmationInformation =
  {
    firstName: "",
    lastName: "",
    phone: null,
    email: "",
  };

const initialReservationsPickerSubmited: ReservationsPickerSubmited = {
  guests: false,
  dates: false,
  services: false,
};

const reservationsGuestsInformation: ReservationsGuestsInformation[] = [
  {
    id: "adults",
    singleTitle: "Adult",
    pluralTitle: "Adults",
    subtitle: "14 years or older",
    dollarsPrice: ADULTS_PRICE,
    shillingPrice: `${ADULTS_PRICE * 2},000`,
  },
  {
    id: "children",
    singleTitle: "Child",
    pluralTitle: "Children",
    subtitle: "From 5 to 13 years",
    dollarsPrice: CHILDREN_PRICE,
    shillingPrice: `${CHILDREN_PRICE * 2},000`,
  },
  {
    id: "residents",
    singleTitle: "Resident",
    pluralTitle: "Residents",
    subtitle: "National ID required",
    dollarsPrice: RESIDENTS_PRICE,
    shillingPrice: `${RESIDENTS_PRICE * 2},000`,
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

export {
  reservationsGuestsInformation,
  servicesInformation,
  initialReservationsPickerInformation,
  initialReservationsConfirmationInformation,
  initialReservationsPickerSubmited,
};
