import {
  ADULTS_PRICE,
  CHILDREN_PRICE,
  RESIDENTS_PRICE,
} from "maalum/core/constants/constants";
import {
  ReservationsConfirmationInformation,
  ReservationsGuestsInformation,
  ReservationsPickerInformation,
  ReservationsPickerSubmited,
  ReservationsServiceInformation,
} from "maalum/core/models/reservations.model";

const initialReservationsPickerInformation: ReservationsPickerInformation = {
  totalGuests: 0,
  date: null,
  service: [],
};

const initialReservationsServicePickerInformation: ReservationsServiceInformation =
  {
    type: "",
    id: "",
    adults: 0,
    children: 0,
    residents: 0,
    totalGuests: 0,
  };

const initialReservationsConfirmationInformation: ReservationsConfirmationInformation =
  {
    firstName: "",
    lastName: "",
    phone: null,
    email: "",
  };

// const initialReservationsPickerSubmited: ReservationsPickerSubmited = {
//   guests: false,
//   dates: false,
//   services: false,
// };

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
  type: string;
  title: string;
  text: string;
  disclaimer?: string;
}[] = [
  {
    id: "cave",
    type: "cave",
    title: "Maalum Cave",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "",
  },
  {
    id: "caveAndNaturalEssence",
    type: "caveAndSpa",
    title: "Maalum Cave + Natural essence",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "Maximum 2 persons per hour",
  },
  {
    id: "caveAndTraditionOfBeauty",
    type: "caveAndSpa",
    title: "Maalum Cave + Tradition of beauty",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "Maximum 2 persons per hour",
  },
  {
    id: "caveAndMaalumRitual",
    type: "caveAndSpa",
    title: "Maalum Cave + Maalum Ritual",
    text: "Lorem ipsum ergo ipsum",
    disclaimer: "Maximum 2 persons per hour",
  },
];

export {
  reservationsGuestsInformation,
  servicesInformation,
  initialReservationsPickerInformation,
  initialReservationsConfirmationInformation,
  initialReservationsServicePickerInformation,
  // initialReservationsPickerSubmited,
};
