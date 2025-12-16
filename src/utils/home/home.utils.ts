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

const carouselSpa: { id: string; url: string }[] = [
    {
        id: "spa-first",
        url: "/images/spa-1.jpg",
    },
    {
        id: "spa-second",
        url: "/images/spa-3.jpg",
    },
    {
        id: "spa-third",
        url: "/images/spa-6.jpg",
    },
    {
        id: "spa-forth",
        url: "/images/spa-9.jpg",
    },
];

const carouselExperiences: { id: string; url: string }[] = [
    {
        id: "spa-first",
        url: "/images/spa-2.jpg",
    },
    {
        id: "spa-second",
        url: "/images/spa-5.jpg",
    },
    {
        id: "spa-third",
        url: "/images/spa-4.jpg",
    },
    {
        id: "spa-forth",
        url: "/images/spa-8.jpg",
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
        title: "FOREST SPA",
        subtitle: "NATURAL RETREAT",
        text: [
            {
                id: 1,
                paragraph:
                    "Welcome to our natural retreat, where relaxation meets nature. We invite you to unwind and rejuvenate in our peaceful sanctuary.",
            },
            {
                id: 2,
                paragraph:
                    "Immerse yourself in nature's embrace as you indulge in our tailored treatments aimed at restoring your body and mind. Step into our serene environment and let us help you find balance and relaxation.",
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
                    "After a magical swim at Maalum Natural Swimming Pool, relax on our sun beds, drink one of our refreshing tropical fruit smoothies and enjoy our cuisine surrounded by nature.",
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
        subtitle: "MAALUM RITUAL 45 MIN",
        text: [
            {
                id: 1,
                paragraph:
                    "Experience pure relaxation with a 45min massage of your choice, tailored just for you. This special experience helps you connect deeply with yourself and the peaceful world around you. Let our skilled therapists pamper you from head to toe, ease away tension and restore your body's balance, while you enjoy the calming beauty of your surroundings.",
            },
        ],
    },
    {
        id: 2,
        title: "",
        subtitle: "MAALUM RITUAL 80 MIN",
        text: [
            {
                id: 1,
                paragraph:
                    "Experience pure relaxation with a 80min massage of your choice, tailored just for you. This special experience helps you connect deeply with yourself and the peaceful world around you. Let our skilled therapists pamper you from head to toe, ease away tension and restore your body's balance, while you enjoy the calming beauty of your surroundings.",
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

const sustainabilityInformation = [
    {
        title: "Renewable Energy & Sustainable Materials",
        description: [
            "At Maalum, sustainability guides how we build, operate and grow. Our facilities rely primarily on renewable solar energy, reducing dependence on fossil fuels and lowering greenhouse gas emissions in a region highly vulnerable to climate change.",
            "We carefully select sustainable, durable and locally sourced (Km0) materials, prioritising ecological solutions that minimise environmental impact while supporting local suppliers and craftsmanship. By combining clean energy, responsible sourcing and efficient resource use, Maalum demonstrates that low-impact infrastructure can coexist with comfort, quality and long-term resilience.",
        ],
        sdgs: ["07", "12", "13", "08"],
    },
    {
        title: "Ecosystem Restoration & Biodiversity Conservation",
        description: [
            "Maalum is deeply committed to the restoration and conservation of Zanzibar’s natural ecosystems, recognising biodiversity as the foundation of climate resilience and community well-being. Our actions focus on protecting coastal areas, freshwater systems and tropical vegetation surrounding the cenote.",
            "In Paje, we are planting 200–300 native tree species to create a climate refuge that enhances biodiversity, stabilises soils and improves local microclimates. These restored areas also function as living spaces for environmental education, fostering a deeper connection between people and nature.",
            "Working closely with the Zanzibar Ministry of Environment, Maalum has supported land-use protection measures and the development of management strategies for groundwater systems and terrestrial caves, ensuring the long-term preservation of these sensitive ecosystems.",
        ],
        sdgs: ["15", "06", "13", "04"],
    },
    {
        title: "Circular Economy & Local Community Development",
        description: [
            "Maalum embraces a circular economy approach that reduces waste, extends the life cycle of materials and keeps economic value within the local community. From construction choices to daily operations, we prioritise reuse, durability and responsible consumption.",
            "We collaborate closely with local artisans, suppliers and professionals, generating fair employment opportunities and strengthening local value chains. Our team reflects our commitment to equity and inclusion, with equal representation of women and men, including women in leadership and decision-making roles.",
            "Through continuous training and professional development, Maalum invests in people as a cornerstone of long-term social, environmental and economic sustainability.",
        ],
        sdgs: ["08", "05", "10", "12"],
    },
    {
        title: "Environmental Management & Conservation",
        description: [
            "The Maalum cenote is a fragile and unique freshwater ecosystem, and its protection is central to our mission. We apply strict environmental management and conservation measures to ensure the long-term ecological balance of the cenote and its surrounding habitats.",
            "Visitor access is carefully regulated through limited numbers and time-controlled entry. To protect water quality and wildlife, smoking, food and waste are prohibited, and visitors are required to shower before entering the water to remove chemical residues. Behavioural guidelines promote a calm, respectful environment that safeguards both biodiversity and geological formations.",
            "As a result of these measures, the cenote’s fauna has increased by approximately 40% since the project began. We continue to protect and maintain natural buffer zones around the cenote to preserve its ecological integrity for future generations.",
        ],
        sdgs: ["14", "15", "06", "12"],
    },
];

export {
    imagesDescription,
    imagesInstagram,
    imagesRestaurant,
    bookNowListItem,
    carouselSpa,
    carouselExperiences,
    socialMediaLogos,
    spaInformation,
    experiencesInformation,
    restaurantInformation,
    sustainabilityInformation,
};
