import {
  NATURAL_ESSENCE_PRICE,
  RITUAL_PRICE,
} from "maalum/core/constants/constants";
import {
  ReservationsGuestsCounter,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import {
  initialGuestsCounter,
  reservationsGuestsInformation,
} from "./reservations.utils";

const cardElements: {
  id: "naturalEssence" | "maalumRitual";
  title: string;
  price: number;
  description: string;
}[] = [
  {
    id: "naturalEssence",
    title: "Natural Essence",
    price: NATURAL_ESSENCE_PRICE,
    description:
      "Maalum massage surrounded by nature and tailored to individual preferences. This immersive experience invites you to feel a deep connection with your inner self and the special rhythms around you.",
  },
  {
    id: "maalumRitual",
    title: "Maalum Ritual",
    price: RITUAL_PRICE,
    description:
      "Pure relaxation with facial and head massage 35min combo. Boost circulation and leave your skin feeling refreshed with a radiant glow.",
  },
];

const getHour = (hour: string) => {
  switch (hour.trim()) {
    case "8:00":
      return "9:30";

    case "9:30":
      return "11:30";

    case "12:30":
      return "14:00";

    case "14:00":
      return "16:00";

    default:
      return "SOLD OUT";
  }
};

const sumUpgradeGuests = (
  ...spaGuests: ReservationsGuestsCounter[]
): ReservationsGuestsCounter => {
  return spaGuests.reduce(
    (acc, curr) => {
      return {
        adults: acc.adults + curr.adults,
        children: acc.children + curr.children,
        residents: acc.residents + curr.residents,
      };
    },
    { adults: 0, children: 0, residents: 0 }
  );
};

const formatUpgradeGuests = (upgradeGuests: UpgradeGuests) => {
  let formattedUpgradeGuests: {
    [key in keyof UpgradeGuests]: ReservationsGuestsCounter;
  } = {
    naturalEssence: initialGuestsCounter,
    maalumRitual: initialGuestsCounter,
  };

  Object.keys(upgradeGuests).forEach((key) => {
    if (upgradeGuests[key as keyof UpgradeGuests].size) {
      reservationsGuestsInformation.forEach(({ id }) => {
        const value = upgradeGuests[key as keyof UpgradeGuests].get(id);

        if (value) {
          formattedUpgradeGuests[key as keyof UpgradeGuests] = {
            ...formattedUpgradeGuests[key as keyof UpgradeGuests],
            [id]: value,
          };
        }
      });
    }
  });

  return formattedUpgradeGuests;
};

export { cardElements, getHour, formatUpgradeGuests, sumUpgradeGuests };
