import {
  NATURAL_ESSENCE_PRICE,
  RITUAL_PRICE,
} from "maalum/core/constants/constants";

export const cardElements: {
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

export const getHour = (hour: string) => {
  switch (hour) {
    case "8:00":
      return "9:30";

    case "9:30":
      return "11:30";

    case "12:30":
      return "14:00";

    case "14:00":
      return "16:00";

    default:
      return "";
  }
};
