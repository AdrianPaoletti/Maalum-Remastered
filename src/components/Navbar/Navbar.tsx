"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import zIndex from "@mui/material/styles/zIndex";

import MaalumContext from "maalum/core/store/context/MaalumContext";

import styles from "./Navbar.module.scss";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const [hasScrollMoved, setHasScrollMoved] = useState<boolean>(false);
  const [isPhoneSize, setIsPhoneSize] = useState<boolean>(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const { setIsReservationsOpen } = useContext(MaalumContext);

  const handleScrollEvent = useCallback(() => {
    if (window.scrollY > 0) {
      setHasScrollMoved(true);
      return;
    }
    setHasScrollMoved(false);
  }, []);

  const handleInnerWidth = useCallback(() => {
    if (window.innerWidth <= 700) {
      setIsPhoneSize(true);
      return;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    if (window.scrollY > 0) {
      setHasScrollMoved(true);
      return;
    }
    if (window.innerWidth <= 700) {
      setIsPhoneSize(true);
      return;
    }

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handleScrollEvent]);

  const menuItems: {
    id: string;
    title: string;
    refference?: string;
    onClick?: () => void;
  }[] = [
    { id: "contact", title: "CONTACT US", refference: "contact" },
    {
      id: "bookNow",
      title: "BOOK NOW",
      onClick: () => {
        setIsReservationsOpen(true);
        document.body.className = `${document.body.classList[0]} u-scroll-disabled`;
      },
    },
  ];

  const handleClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
    if (!isMenuExpanded) {
      document.body.className = `${document.body.classList[0]} u-scroll-disabled`;
      return;
    }
    document.body.className = `${document.body.classList[0]}`;
  };

  return (
    <nav
      className={`${styles.navbar} ${
        hasScrollMoved && styles["navbar--sticky"]
      }`}
    >
      <div className={`${styles.navbar__container} col-1-of-2`}>
        <Link href="/#header">
          <Image
            src={
              hasScrollMoved || isPhoneSize
                ? "/images/logo-beige.png"
                : "/images/logo-white.png"
            }
            alt="maalum-zanzibar-logo"
            className={styles.navbar__image}
            width={isPhoneSize ? 135 : 157}
            height={isPhoneSize ? 36 : 41}
          />
        </Link>
      </div>
      <div className={`${styles.menu} col-1-of-2`}>
        <div
          className={`${styles["menu__burger-container"]}`}
          onClick={handleClick}
        >
          {[1, 2, 3].map((value) => (
            <span
              key={value}
              className={`${styles["menu__burger-line"]} ${
                isMenuExpanded && styles["menu__burger-line--active"]
              }`}
            ></span>
          ))}
        </div>
        <ul
          className={`${styles["menu__list"]} ${
            isMenuExpanded && styles["menu__list--active"]
          }`}
        >
          {menuItems.map(({ id, title, refference, onClick }) => (
            <li
              key={id}
              className={`navbar-list-item ${styles["menu__item"]} ${
                hasScrollMoved && styles["menu__item--sticky"]
              }`}
              onClick={() => {
                handleClick();
                onClick && onClick();
              }}
            >
              {refference ? (
                <Link
                  href={`/#${refference}`}
                  className={`${styles["menu__link-item"]}`}
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
