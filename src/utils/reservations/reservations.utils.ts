import {
  ADULTS_PRICE,
  CHILDREN_PRICE,
  NATURAL_ESSENCE_PRICE,
  RESIDENTS_PRICE,
  RITUAL_PRICE,
  TRADITION_BEAUTY_PRICE,
} from "maalum/core/constants/constants";
import {
  ReservationsConfirmationInformation,
  ReservationsGuestsInformation,
  ReservationsPickerInformation,
  ReservationsSpaCounter,
} from "maalum/core/models/reservations.model";

const initialReservationsPickerInformation: ReservationsPickerInformation = {
  adults: 0,
  children: 0,
  residents: 0,
  totalGuests: 0,
  naturalEssence: 0,
  traditionOfBeauty: 0,
  maalumRitual: 0,
  date: null,
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

const spaInformation: {
  id: keyof ReservationsSpaCounter;
  type: string;
  title: string;
  subtitle: string;
  dollarsPrice: number;
  shillingPrice: string;
}[] = [
  {
    id: "naturalEssence",
    type: "caveAndSpa",
    title: "Natural essence + Maalum Cave",
    subtitle: "Lorem ipsum ergo ipsum",
    dollarsPrice: NATURAL_ESSENCE_PRICE,
    shillingPrice: `${NATURAL_ESSENCE_PRICE * 2},000`,
  },
  {
    id: "traditionOfBeauty",
    type: "caveAndSpa",
    title: "Tradition of beauty + Maalum Cave",
    subtitle: "Lorem ipsum ergo ipsum",
    dollarsPrice: TRADITION_BEAUTY_PRICE,
    shillingPrice: `${TRADITION_BEAUTY_PRICE * 2},000`,
  },
  {
    id: "maalumRitual",
    type: "caveAndSpa",
    title: "Maalum Ritual + Maalum Cave",
    subtitle: "Lorem ipsum ergo ipsum",
    dollarsPrice: RITUAL_PRICE,
    shillingPrice: `${RITUAL_PRICE * 2},000`,
  },
];

export {
  reservationsGuestsInformation,
  spaInformation,
  initialReservationsPickerInformation,
  initialReservationsConfirmationInformation,
  // initialReservationsPickerSubmited,
};
