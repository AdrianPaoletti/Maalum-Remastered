import { IsSocialMedia } from "maalum/core/models/home.model";

const socialMediaLogos: {
  id: keyof IsSocialMedia;
  white: string;
  black: string;
  altText: string;
  href: string;
}[] = [
  {
    id: "instagram",
    white: "/images/icon-instagram-white.png",
    black: "/images/icon-instagram-black.png",
    altText: "instagram logo",
    href: "https://www.instagram.com/maalumzanzibar/?hl=es",
  },
  {
    id: "facebook",
    white: "/images/icon-facebook-white.png",
    black: "/images/icon-facebook-black.png",
    altText: "facebook logo",
    href: "https://www.instagram.com/maalumzanzibar/?hl=es",
  },
  {
    id: "tripadvisor",
    white: "/images/icon-tripadvisor-white.png",
    black: "/images/icon-tripadvisor-black.png",
    altText: "tripadvisor logo",
    href: "https://www.tripadvisor.es/Attraction_Review-g616020-d23946364-Reviews-Maalum-Paje_Zanzibar_Island_Zanzibar_Archipelago.html",
  },
];

export { socialMediaLogos };
