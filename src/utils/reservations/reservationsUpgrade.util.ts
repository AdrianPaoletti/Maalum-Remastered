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
  image: string;
  description: string;
}[] = [
  {
    id: "naturalEssence",
    title: "Natural Essence",
    price: NATURAL_ESSENCE_PRICE,
    image: "/images/restaurant-main.jpg",
    description:
      "Relax with our 45-minute full-body massage, surrounded by nature and tailored just for you. This special experience helps you connect deeply with yourself and the peaceful world around you. Let our skilled therapists ease away tension and restore your body's balance, while you enjoy the calming beauty of the outdoors.",
  },
  {
    id: "maalumRitual",
    title: "Maalum Ritual",
    price: RITUAL_PRICE,
    image: "/images/spa-card-2.jpg",
    description:
      "Experience pure relaxation with our 45-minute full-body massage followed by a 35-minute facial and head massage combo. This indulgent treatment not only soothes muscles but also enhances circulation, leaving your skin refreshed and glowing with radiance. Let us pamper you from head to toe, revitalizing both body and spirit for a truly rejuvenating experience.",
  },
];

const getHour = (hour: string) => {
  switch (hour?.trim()) {
    case "8:00":
    case "08:00":
      return "9:30";

    case "9:30":
    case "09:30":
      return "11:30";

    case "12:30":
      return "14:00";

    case "14:00":
      return "16:00";

    default:
      return "SOLD OUT";
  }
};

const getSpaDate = (date: Date) => {
  const hour = date?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hourSpa = getHour(hour as string);

  if (hourSpa !== "SOLD OUT") {
    const [hour, minutes] = hourSpa.split(":");

    return new Date(new Date(date.setHours(+hour)).setMinutes(+minutes));
  }

  return date;
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

export {
  cardElements,
  getHour,
  formatUpgradeGuests,
  sumUpgradeGuests,
  getSpaDate,
};
