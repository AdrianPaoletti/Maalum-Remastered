"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { IsSocialMedia } from "maalum/core/models/home.model";
import { socialMediaLogos } from "maalum/utils/footer/footer.utils";

import styles from "./Footer.module.scss";

export function Footer() {
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
    <footer
      className={`${styles["footer"]} u-padding-vertical-extra-large u-padding-horizontal-large`}
    >
      <h2 className={`heading-secundary`}>CONTACT US</h2>
      <article className={`${styles["footer__container"]} u-padding-top-large`}>
        <div className={`${styles["footer__text-container"]} col-1-of-2`}>
          <h3 className="heading-terciary">CONTACT</h3>{" "}
          <p
            className={`${styles["footer__text"]} text-primary u-padding-top-small`}
          >
            <span>Information: </span>EMAIL |{" "}
            <Link
              className={`${styles["footer__link-mail"]}`}
              href="mailto:info@maalumzanzibar.com"
            >
              info@maalumzanzibar.com
            </Link>
          </p>
          <h3 className="heading-terciary u-padding-top-medium-large">
            OUR LOCATION
          </h3>
          <p
            className={`${styles["footer__text"]} text-primary u-padding-top-small`}
          >
            Paje
          </p>
        </div>
        <div className={`${styles["footer__map-container"]} col-1-of-2`}>
          <div className={`${styles["footer__map"]}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15863.580284911572!2d39.5308595!3d-6.2775242!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xad0717d2fee3609e!2sMAALUM!5e0!3m2!1ses!2ses!4v1655978628957!5m2!1ses!2ses"
              width="600"
              height="450"
              frameBorder="0"
              title="maalum zanzibar swimming cave"
            />
          </div>
        </div>
      </article>
      <div className={`${styles["footer__social-media"]} u-padding-top-large`}>
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
    </footer>
  );
}
