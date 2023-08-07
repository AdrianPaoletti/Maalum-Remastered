import Image from "next/image";
import Link from "next/link";

import {
  bookNowListItem,
  imagesDescription,
  imagesInstagram,
} from "../utils/home/home.utils";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <article
        className={`${styles.description} u-padding-vertical-extra-large u-padding-horizontal-large`}
      >
        <h2 className={`${styles["description__title"]} heading-secundary`}>
          TAKE A BREATH <span>LOVE NATURE</span>
        </h2>
        <div className={`${styles["description__text"]} u-padding-top-large`}>
          <p className="text-primary">
            Welcome to Maalum, a unique natural swimming pool in Paje, Zanzibar.
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
        className={`${styles["images"]} ${styles["images--description"]} u-padding-horizontal-large u-padding-vertical-extra-large`}
      >
        {imagesDescription.map(({ url, id }) => (
          <div key={id} className={`${styles["images__container"]}`}>
            <Image src={url} alt="swimming cave zanzibar" fill sizes="33vw" />
          </div>
        ))}
      </article>
      <article
        className={`${styles["book-now"]} u-padding-vertical-extra-large u-padding-horizontal-large`}
      >
        <h2 className={`heading-secundary`}>BOOK NOW</h2>
        <div
          className={`${styles["book-now__text-container"]} u-padding-vertical-large`}
        >
          <div className={`${styles["book-now__description"]} col-1-of-2`}>
            <h3
              className={`${styles["book-now__title"]} heading-terciary u-padding-bottom-medium`}
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
                  sizes="5vw"
                />
                <p className="text-primary">{text}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles["book-now__button"]}`}>
          <span className="text-primary">BOOK NOW</span>
        </div>
      </article>
      <article
        className={`${styles["instagram"]} u-padding-vertical-extra-large u-padding-horizontal-large`}
      >
        <h2 className={`heading-secundary`}>FOLLOW US ON INSTAGRAM</h2>
        <div
          className={`${styles["images"]} ${styles["images--instagram"]} u-padding-top-large`}
        >
          {imagesInstagram.map(({ url, id, href }) => (
            <Link
              key={id}
              className={`${styles["images__container"]}`}
              href={href}
            >
              <Image src={url} alt="swimming cave zanzibar" fill sizes="25vw" />
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
