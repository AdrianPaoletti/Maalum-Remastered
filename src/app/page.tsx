"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Banner } from "maalum/components/ui/Banner/Banner";
import { Carousel } from "maalum/components/ui/Carousel/Carousel";
import Loading from "maalum/components/ui/Loading/Loading";
import { IsSocialMedia } from "maalum/core/models/home.model";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import { defaultTheme } from "maalum/styles/themes";
import {
  bookNowListItem,
  carouselExperiences,
  carouselSpa,
  experiencesInformation,
  imagesDescription,
  imagesInstagram,
  imagesRestaurant,
  restaurantInformation,
  socialMediaLogos,
  spaInformation,
} from "../utils/home/home.utils";

import styles from "./page.module.scss";

export default function Home() {
  const { isImageLoaded, setIsReservationsOpen } = useContext(MaalumContext);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isReservation, setIsReservation] = useState<boolean>(false);
  const [isSocialMediaHover, setIsSocialMediaHover] = useState<IsSocialMedia>({
    instagram: false,
    facebook: false,
    tripadvisor: false,
  });

  useEffect(() => {
    setIsReservation(!!localStorage.getItem("reservation"));
  }, []);

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
      <Loading
        isLoading={!isImageLoaded}
        backgroundColor={"#000"}
        opacity={0.6}
      />
      <Banner
        open={isOpen && !isReservation && isImageLoaded}
        setIsOpen={setIsOpen}
      />
      <article className={`${styles.description}`}>
        <div
          className={`${styles.container} u-padding-vertical-large-extra u-padding-horizontal-huge`}
        >
          <h2 className={`${styles["description__title"]} heading-secundary`}>
            TAKE A BREATH <span>LOVE NATURE</span>
          </h2>
          <div className={`${styles["description__text"]} u-padding-top-large`}>
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
        </div>
      </article>
      <article
        className={`${styles.container} ${styles["images"]} ${styles["images--description"]} u-padding-horizontal-huge u-padding-vertical-large-extra`}
      >
        {imagesDescription.map(({ url, id }) => (
          <div
            key={id}
            className={`${styles["images__container"]} ${styles["images__container--description"]}`}
          >
            <Image src={url} alt="swimming cave zanzibar" fill sizes="50vw" />
          </div>
        ))}
      </article>
      <article className={`${styles["book-now"]}`}>
        <div
          className={`${styles.container} u-padding-vertical-large-extra u-padding-horizontal-huge`}
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
                    sizes="50vw"
                  />
                  <p className="text-primary">{text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles["book-now__button"]}`}>
            <span
              className="text-primary"
              onClick={() => setIsReservationsOpen(true)}
            >
              BOOK NOW
            </span>
          </div>
        </div>
      </article>
      <article
        className={`${styles.container} ${styles["restaurant"]} u-padding-vertical-large-extra u-padding-horizontal-huge`}
      >
        <h2 className={`heading-secundary`}>OUR RESTAURANT</h2>
        <div
          className={`${styles["restaurant__image-container"]} u-padding-vertical-large`}
        >
          <Image
            src={"/images/restaurant-main.jpg"}
            className={`${styles["restaurant__image"]}`}
            alt="restaurant menu"
            fill
            sizes="100vw"
          />
        </div>
        <div className={`${styles["restaurant__text-container"]}`}>
          {restaurantInformation.map(({ id, title, text }, indexNumber) => (
            <div key={id}>
              <h2
                className={`heading-secundary ${styles["restaurant__subtitle"]}`}
              >
                {title}
              </h2>
              {text.map(({ id, paragraph }) => (
                <p key={id} className={`text-primary u-padding-top-small`}>
                  {paragraph}
                </p>
              ))}
              {!!indexNumber && (
                <p className={`text-primary u-padding-top-small`}>
                  <a
                    href="/documents/menu-2024.pdf"
                    download="menu-maalum"
                    className={`${styles["restaurant__food-menu"]}`}
                  >
                    Food Menu
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
        <div
          className={`${styles["images"]} ${styles["images--restaurant"]} u-padding-top-large`}
        >
          {imagesRestaurant.map(({ url, id }) => (
            <div key={id} className={`${styles["images__container"]}`}>
              <Image
                src={url}
                alt="restaurant cave zanzibar"
                fill
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      </article>
      <article className={`${styles["spa-container"]}`}>
        <div
          id={"spa"}
          className={`${styles.container} ${styles["spa"]} u-padding-vertical-large-extra u-padding-horizontal-huge`}
        >
          <Carousel images={carouselSpa} />
          <div className={`${styles["spa__text-container"]} col-1-of-2`}>
            {spaInformation.map(({ id, title, subtitle, text }) => (
              <div key={id}>
                <h2 className={`heading-secundary`}>{title}</h2>
                <h3
                  className={`${styles["spa__subtitle"]} text-primary ${
                    subtitle.length && "u-padding-top-large"
                  }`}
                >
                  {subtitle}
                </h3>
                {text.map(({ id, paragraph }) => (
                  <p key={id} className={`text-primary u-padding-top-small`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
            <div
              className={`${styles["spa__button"]} u-padding-top-large`}
              onClick={() => setIsReservationsOpen(true)}
            >
              <span className="text-primary">RESERVE NOW</span>
            </div>
          </div>
        </div>
      </article>
      <article className={`${styles["experiences-container"]}`}>
        <div
          className={`${styles.container} ${styles["experiences"]} u-padding-vertical-large-extra u-padding-horizontal-huge`}
        >
          <div
            className={`${styles["experiences__text-container"]} col-1-of-2`}
          >
            {experiencesInformation.map(
              ({ id, title, subtitle, text }, index) => (
                <div key={id}>
                  <h2 className={`heading-secundary`}>{title}</h2>
                  <h3
                    className={`${
                      styles["experiences__subtitle"]
                    } text-primary ${"u-padding-top-large"}`}
                  >
                    {subtitle}
                  </h3>
                  {text.map(({ id, paragraph }) => (
                    <p key={id} className={`text-primary u-padding-top-small`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )
            )}
          </div>
          <Carousel images={carouselExperiences} />
        </div>
      </article>
      <article
        className={`${styles.container} ${styles["instagram"]} u-padding-vertical-large-extra u-padding-horizontal-huge`}
      >
        <h2 className={`heading-secundary`}>FOLLOW US ON INSTAGRAM</h2>
        <div
          className={`${styles["images"]} ${styles["images--instagram"]} u-padding-top-large`}
        >
          {imagesInstagram.map(({ url, id, href }) => (
            <Link
              id={id}
              key={id}
              className={`${styles["images__container"]}`}
              href={href}
            >
              <Image src={url} alt="swimming cave zanzibar" fill sizes="50vw" />
            </Link>
          ))}
        </div>
      </article>
      <article className={`${styles["contact-us"]}`} id={"contact"}>
        <div
          className={`${styles.container} u-padding-vertical-large-extra u-padding-horizontal-huge`}
        >
          <h2 className={`heading-secundary`}>CONTACT US</h2>
          <div
            className={`${styles["contact-us__container"]} u-padding-top-large`}
          >
            <div
              className={`${styles["contact-us__text-container"]} col-1-of-2`}
            >
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
            <div
              className={`${styles["contact-us__map-container"]} col-1-of-2`}
            >
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
        </div>
      </article>
    </main>
  );
}
