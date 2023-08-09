const BOOK_NOW_PATH =
  "https://static1.squarespace.com/static/5edbafe6caad7c68afd91215/t";

const imagesDescription: { id: number; url: string }[] = [
  { id: 1, url: "/images/body-1.jpg" },
  { id: 2, url: "/images/body-2.jpg" },
  { id: 3, url: "/images/body-3.jpg" },
];

const imagesInstagram: { id: number; url: string; href: string }[] = [
  {
    id: 1,
    url: "/images/instagram-1.jpg",
    href: "https://www.instagram.com/p/CXy4MRvsRaA/?hl=es",
  },
  {
    id: 2,
    url: "/images/instagram-2.jpg",
    href: "https://www.instagram.com/p/CXigyu5M0mL/?hl=es",
  },
  {
    id: 3,
    url: "/images/instagram-3.jpg",
    href: "https://www.instagram.com/p/CXjMQouM8Ux/?hl=es",
  },
  {
    id: 4,
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
    url: "/images/spa-1.jpg",
  },
  {
    id: "spa-second",
    url: "/images/spa-2.jpg",
  },
];

export { imagesDescription, imagesInstagram, bookNowListItem, carouselImages };
