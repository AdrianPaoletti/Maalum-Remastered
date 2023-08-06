import Image from "next/image";

import { Navbar } from "maalum/components/Navbar/Navbar";

import styles from "./page.module.scss";

export default function Home() {
  const BOOK_NOW_PATH =
    "https://static1.squarespace.com/static/5edbafe6caad7c68afd91215/t";
  const imagesDescription: { id: number; url: string }[] = [
    { id: 1, url: "/images/body-1.jpg" },
    { id: 2, url: "/images/body-2.jpg" },
    { id: 3, url: "/images/body-3.jpg" },
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

  return (
    <main>
      <header className={styles["header"]}>
        <Navbar />
        <Image
          src="/images/header-cave.jpg"
          alt="maalum swimming cave"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <h1 className={`${styles["header__title"]} heading-primary`}>
          WELCOME TO PARADISE
        </h1>
      </header>
      <section className="main-content">
        <article
          className={`${styles.description} u-padding-vertical-45 u-padding-horizontal-40`}
        >
          <h2 className={`${styles["description__title"]} heading-secundary`}>
            TAKE A BREATH <span>LOVE NATURE</span>
          </h2>
          <div className={`${styles["description__text"]} u-padding-top-40`}>
            <p className="text-primary">
              Welcome to Maalum, a unique natural swimming pool in Paje,
              Zanzibar.
            </p>
            <p className="text-primary">
              A special place to reconnect with nature, explore the underground
              life, relax and enjoy the peace.
            </p>
            <p className="text-primary">
              The word Maalum means Special in Swahili language.
            </p>
          </div>
        </article>
        <article
          className={`${styles["images"]} u-padding-horizontal-40 u-padding-vertical-45`}
        >
          {imagesDescription.map(({ url, id }) => (
            <div key={id} className={`${styles["images__container"]}`}>
              <Image src={url} alt="swimming cave zanzibar" fill />
            </div>
          ))}
        </article>
        <article
          className={`${styles["book-now"]} u-padding-vertical-45 u-padding-horizontal-40`}
        >
          <h2 className={`heading-secundary`}>BOOK NOW</h2>
          <div
            className={`${styles["book-now__text-container"]} u-padding-vertical-45`}
          >
            <div className={`${styles["book-now__description"]} col-1-of-2`}>
              <h3
                className={`${styles["book-now__title"]} text-primary u-padding-bottom-30`}
              >
                NATURAL SWIMMING POOL
              </h3>
              <p className="text-primary">
                Ensure your spot by booking in advance
              </p>
              <p className="text-primary">
                The duration of the slot is 90 min. inside the cave area
              </p>
            </div>
            <ul className={`${styles["book-now__list"]} col-1-of-2`}>
              {bookNowListItem.map(({ id, url, text, size }) => (
                <li key={id} className={`${styles["book-now__list-item"]}`}>
                  <Image
                    src={url}
                    alt="zanzibar swimming cave services"
                    width={size || 22}
                    height={size || 22}
                  />
                  <p className="text-primary">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles["book-now__button"]}`}>
            <span>BOOK NOW</span>
          </div>
        </article>
      </section>
    </main>
  );
}
