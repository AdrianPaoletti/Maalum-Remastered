import { IsSocialMedia } from "maalum/core/models/home.model";

const BOOK_NOW_PATH =
  "https://static1.squarespace.com/static/5edbafe6caad7c68afd91215/t";

const imagesDescription: { id: number; url: string }[] = [
  { id: 1, url: "/images/body-1.jpg" },
  { id: 2, url: "/images/body-2.jpg" },
  { id: 3, url: "/images/body-3.jpg" },
  { id: 4, url: "/images/body-4.jpg" },
];

const imagesInstagram: { id: string; url: string; href: string }[] = [
  {
    id: "1",
    url: "/images/instagram-1.jpg",
    href: "https://www.instagram.com/p/CXy4MRvsRaA/?hl=es",
  },
  {
    id: "2",
    url: "/images/instagram-2.jpg",
    href: "https://www.instagram.com/p/CXigyu5M0mL/?hl=es",
  },
  {
    id: "3",
    url: "/images/instagram-3.jpg",
    href: "https://www.instagram.com/p/CXjMQouM8Ux/?hl=es",
  },
  {
    id: "4",
    url: "/images/instagram-4.jpg",
    href: "https://www.instagram.com/p/CXkjRdLozkJ/?hl=es",
  },
];

const bookNowListItem: {
  id: string;
  url: string;
  text: string;
  size?: number;
}[] = [
  {
    id: "1621032601945",
    url: `${BOOK_NOW_PATH}/609efe990d9395780c51aa48/1621032601945/private_outdoor_seating-01.svg`,
    text: "Chill and relax",
  },
  {
    id: "1621032628107",
    url: `${BOOK_NOW_PATH}/609efeb4ce15a13eb81a4202/1621032628107/breakfast_included-01.svg`,
    text: "Restaurant Service",
  },
  {
    id: "1621032659724",
    url: `${BOOK_NOW_PATH}/609efed38254c307c1f01610/1621032659724/all_natural_soaps-01-01.svg`,
    text: "All natural soaps",
  },
  {
    id: "1621032729616",
    url: `${BOOK_NOW_PATH}/609eff193eba882097c37649/1621032729616/parking_included-01-white.svg`,
    text: "Parking",
  },
  {
    id: "1621032747753",
    url: `${BOOK_NOW_PATH}/609eff2be93ae07ca7dfdacc/1621032747753/safe_included-01-white.svg`,
    text: "Changing Rooms and Lockers",
  },
  {
    id: "1621032747600",
    url: `/images/book-now-shower.png`,
    text: "Shower",
    size: 21,
  },
  {
    id: "1621032747660",
    url: `/images/book-now-towel.png`,
    text: "Towel",
    size: 21,
  },
  {
    id: "1621032747690",
    url: `/images/book-now-googles.png`,
    text: "Diving masks",
  },
];

const carouselImages: { id: string; url: string }[] = [
  {
    id: "spa-first",
    url: "/images/restaurant-1.jpg",
  },
  {
    id: "spa-second",
    url: "/images/restaurant-2.jpg",
  },
];

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

const spaInformation: {
  id: number;
  title: string;
  subtitle: string;
  text: { id: number; paragraph: string }[];
}[] = [
  {
    id: 1,
    title: "MAALUM SPA",
    subtitle: "NATURAL RETREAT",
    text: [
      {
        id: 1,
        paragraph:
          "Indulge in serenity and rejuvenation at La Valise SPA, our luxurious wellness sanctuary in Tulum. Experience our signature treatments and immersive spa experiences at our sister property.",
      },
      {
        id: 2,
        paragraph:
          "Immerse yourself in a sensorial journey, nurturing body, mind, and soul. From blissful massages to revitalizing facials, our therapies embrace ancient Mayan techniques in a tranquil atmosphere. Our skilled practitioners curate tailored treatments, ensuring a sanctuary of relaxation.",
      },
      {
        id: 3,
        paragraph:
          "Indulge in serenity and rejuvenation at La Valise SPA, our luxurious wellness sanctuary in Tulum. Experience our signature treatments and immersive spa experiences at our sister property.",
      },
    ],
  },
];

const restaurantInformation = [
  {
    id: 1,
    title: "LIVE THE FULL EXPERIENCE",
    text: [
      {
        id: 1,
        paragraph:
          "After a magical swim at Maalum Natural Swimming Pool, relax on our sun beds, drink one of our refreshing tropical fruit smoothies and enjoy our local cuisine surrounded by nature.",
      },
      {
        id: 2,
        paragraph:
          "We carefully select fresh food from the garden and adapt to your preferences and suggestions. Come and enjoy a day full of flavours with us.",
      },
    ],
  },
  {
    id: 2,
    title: "DINE AT MAALUM RESTAURANT",
    text: [
      {
        id: 1,
        paragraph:
          "Zanzibar is often described as a cultural melting pot, due to the different people who have settled on the island over time and therefore so is its cuisine.",
      },
      {
        id: 2,
        paragraph:
          "Tasting the typical delicacies of a country is the perfect way to enter in its culture, history and traditions, are you ready to taste the delicious costal East African cuisine?",
      },
    ],
  },
];

const experiencesInformation = [
  {
    id: 1,
    title: "EXPERIENCES",
    subtitle: "NATURAL ESSENCE",
    text: [
      {
        id: 1,
        paragraph:
          "Maalum massage surrounded by nature and tailored to individual preferences. This immersive experience invites you to feel a deep connection with your inner self and the special rhythms around you.",
      },
    ],
  },
  {
    id: 2,
    title: "",
    subtitle: "MAALUM RITUAL",
    text: [
      // {
      //   id: 1,
      //   paragraph:
      //     "Maalum massage surrounded by nature and tailored to individual preferences. This immersive experience invites you to feel a deep connection with your inner self and the special rhythms around you.",
      // },
      {
        id: 1,
        paragraph:
          "Pure relaxation with facial and head massage 35min combo. Boost circulation and leave your skin feeling refreshed with a radiant glow.",
      },
    ],
  },
  {
    id: 3,
    title: "",
    subtitle: "TRADITION OF BEAUTY",
    text: [
      {
        id: 1,
        paragraph:
          "Discover the ancient secret of Japanese beauty with the Japanase facial lifting massage. This ancient skincare technique is combined with nourishing ingredients to cleanse, balance and renew your skin, leaving you with a rejuvenated and revitalized feeling.",
      },
    ],
  },
];

const imagesRestaurant: { id: string; url: string }[] = [
  {
    id: "1",
    url: "/images/restaurant-1.jpg",
  },
  {
    id: "2",
    url: "/images/restaurant-2.jpg",
  },
  {
    id: "3",
    url: "/images/restaurant-3.jpg",
  },
  {
    id: "4",
    url: "/images/restaurant-4.jpg",
  },
];

export {
  imagesDescription,
  imagesInstagram,
  imagesRestaurant,
  bookNowListItem,
  carouselImages,
  socialMediaLogos,
  spaInformation,
  experiencesInformation,
  restaurantInformation,
};
