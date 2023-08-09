"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Carousel } from "maalum/components/ui/Carousel/Carousel";
import { IsSocialMedia } from "maalum/core/models/home.model";
import { socialMediaLogos } from "maalum/utils/footer/footer.utils";
import {
  bookNowListItem,
  carouselImages,
  imagesDescription,
  imagesInstagram,
} from "../utils/home/home.utils";

import styles from "./page.module.scss";

export default function Home() {
  const [isSocialMediaHover, setIsSocialMediaHover] = useState<IsSocialMedia>({
    instagram: false,
    facebook: false,
    tripadvisor: false,
  });

  const handleSocialMediaMouseEvent = ({
    target,
  }: React.MouseEvent<HTMLImageElement>) => {
    const { id } = target as Element;
    setIsSocialMediaHover((prevIsSocialMediaHover) => ({
      ...prevIsSocialMediaHover,
      [id]: !prevIsSocialMediaHover[id as keyof IsSocialMedia],
    }));
  };

  return (
    <main>
      <article
        className={`${styles.description} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
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
        className={`${styles["images"]} ${styles["images--description"]} u-padding-horizontal-mega-large u-padding-vertical-large-mega`}
      >
        {imagesDescription.map(({ url, id }) => (
          <div key={id} className={`${styles["images__container"]}`}>
            <Image src={url} alt="swimming cave zanzibar" fill sizes="33vw" />
          </div>
        ))}
      </article>
      <article
        className={`${styles["book-now"]} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
      >
        <h2 className={`heading-secundary`}>BOOK NOW</h2>
        <div
          className={`${styles["book-now__text-container"]} u-padding-vertical-large`}
        >
          <div className={`${styles["book-now__description"]} col-1-of-2`}>
            <h3 className={`text-primary u-padding-bottom-medium`}>
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
        className={`${styles["spa"]} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
      >
        <Carousel images={carouselImages} />
        <div className={`${styles["spa__text-container"]} col-1-of-2`}>
          <h2 className={`heading-secundary`}>MAALUM SPA</h2>
          <h3
            className={`${styles["spa__subtitle"]} text-primary u-padding-top-large`}
          >
            NATURAL RETREAT
          </h3>
          <p className={`text-primary u-padding-top-small`}>
            Indulge in serenity and rejuvenation at La Valise SPA, our luxurious
            wellness sanctuary in Tulum. Experience our signature treatments and
            immersive spa experiences at our sister property.
          </p>
          <p className={`text-primary u-padding-top-small`}>
            Immerse yourself in a sensorial journey, nurturing body, mind, and
            soul. From blissful massages to revitalizing facials, our therapies
            embrace ancient Mayan techniques in a tranquil atmosphere. Our
            skilled practitioners curate tailored treatments, ensuring a
            sanctuary of relaxation.
          </p>
          <p className={`text-primary u-padding-top-small`}>
            Indulge in serenity and rejuvenation at La Valise SPA, our luxurious
            wellness sanctuary in Tulum. Experience our signature treatments and
            immersive spa experiences at our sister property.
          </p>
          <div className={`${styles["spa__button"]} u-padding-top-large`}>
            <span className="text-primary">RESERVE NOW</span>
          </div>
        </div>
      </article>
      <article
        className={`${styles["restaurant"]} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
      >
        <div className={`${styles["restaurant__text-container"]} col-1-of-2`}>
          <h2 className={`heading-secundary`}>OUR RESTAURANT</h2>
          <h3
            className={`${styles["restaurant__subtitle"]} text-primary u-padding-top-large`}
          >
            LIVE THE FULL EXPERIENCE
          </h3>
          <p className={`text-primary u-padding-top-small`}>
            After a magical swim at Maalum Natural Swimming Pool, relax on our
            sun beds, drink one of our refreshing tropical fruit smoothies and
            enjoy our local cuisine surrounded by nature.
          </p>
          <p className={`text-primary u-padding-top-small`}>
            We carefully select fresh food from the garden and adapt to your
            preferences and suggestions. Come and enjoy a day full of flavours
            with us.
          </p>
          <h3
            className={`${styles["restaurant__subtitle"]} text-primary u-padding-top-large`}
          >
            DINE AT MAALUM RESTAURANT
          </h3>
          <p className={`text-primary u-padding-top-small`}>
            Zanzibar is often described as a cultural melting pot, due to the
            different people who have settled on the island over time and
            therefore so is its cuisine.
          </p>
          <p className={`text-primary u-padding-top-small`}>
            Tasting the typical delicacies of a country is the perfect way to
            enter in its culture, history and traditions, are you ready to taste
            the delicious costal East African cuisine?
          </p>
          <p className={`text-primary u-padding-top-large`}>
            <a className={`${styles["restaurant__food-menu"]}`}>Food Menu</a>
          </p>
        </div>
        <Carousel images={carouselImages} />
      </article>
      <article
        className={`${styles["instagram"]} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
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
      <article
        className={`${styles["contact-us"]} u-padding-vertical-large-mega u-padding-horizontal-mega-large`}
        id="contact"
      >
        <h2 className={`heading-secundary`}>CONTACT US</h2>
        <div
          className={`${styles["contact-us__container"]} u-padding-top-large`}
        >
          <div className={`${styles["contact-us__text-container"]} col-1-of-2`}>
            <h3 className="heading-terciary">CONTACT</h3>{" "}
            <p
              className={`${styles["contact-us__text"]} text-primary u-padding-top-small`}
            >
              <span>Information: </span>EMAIL |{" "}
              <Link
                className={`${styles["contact-us__link-mail"]}`}
                href="mailto:info@maalumzanzibar.com"
              >
                info@maalumzanzibar.com
              </Link>
            </p>
            <h3 className="heading-terciary u-padding-top-medium-large">
              OUR LOCATION
            </h3>
            <p
              className={`${styles["contact-us__text"]} text-primary u-padding-top-small`}
            >
              Paje
            </p>
          </div>
          <div className={`${styles["contact-us__map-container"]} col-1-of-2`}>
            <div className={`${styles["contact-us__map"]}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15863.580284911572!2d39.5308595!3d-6.2775242!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xad0717d2fee3609e!2sMAALUM!5e0!3m2!1ses!2ses!4v1655978628957!5m2!1ses!2ses"
                width="600"
                height="450"
                frameBorder="0"
                title="maalum zanzibar swimming cave"
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles["contact-us__social-media"]} u-padding-top-large`}
        >
          {socialMediaLogos.map(({ id, white, black, altText, href }) => (
            <Link href={href} key={id}>
              <Image
                id={id}
                src={isSocialMediaHover[id] ? black : white}
                width={30}
                height={30}
                alt={altText}
                onMouseEnter={handleSocialMediaMouseEvent}
                onMouseLeave={handleSocialMediaMouseEvent}
              />
            </Link>
          ))}
        </div>
      </article>
    </main>
  );
}
