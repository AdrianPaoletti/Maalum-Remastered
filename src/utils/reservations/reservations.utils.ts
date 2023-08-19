import { GuestsInformation } from "maalum/core/models/guests.model";

const guestsInformation: GuestsInformation[] = [
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

export { guestsInformation, servicesInformation };
