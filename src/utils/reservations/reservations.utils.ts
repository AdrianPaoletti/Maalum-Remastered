import {
  ADULTS_PRICE,
  CHILDREN_PRICE,
  RESIDENTS_PRICE,
} from "maalum/core/constants/constants";
import {
  ReservationsConfirmationInformation,
  ReservationsGuestsInformation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";

const initialGuestsCounter = {
  adults: 0,
  children: 0,
  residents: 0,
};

const initialReservationsPickerInformation: ReservationsPickerInformation = {
  ...initialGuestsCounter,
  totalGuests: 0,
  naturalEssence: 0,
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

const initialUpgradeGuestsValue = {
  naturalEssence: new Map<string, number>(),
  maalumRitual: new Map<string, number>(),
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

export {
  reservationsGuestsInformation,
  initialGuestsCounter,
  initialReservationsPickerInformation,
  initialReservationsConfirmationInformation,
  initialUpgradeGuestsValue,
};
