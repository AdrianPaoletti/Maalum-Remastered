"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MaalumContext from "maalum/core/store/context/MaalumContext";

import styles from "./Navbar.module.scss";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const [hasScrollMoved, setHasScrollMoved] = useState<boolean>(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);
  const { setIsReservationsOpen } = useContext(MaalumContext);

  const handleScrollEvent = useCallback(() => {
    if (window.scrollY > 0) {
      setHasScrollMoved(true);
      return;
    }
    setHasScrollMoved(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    if (window.scrollY > 0) {
      setHasScrollMoved(true);
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
    onClick: () => void;
  }[] = [
    {
      id: "contact",
      title: "CONTACT US",
      refference: "contact",
      onClick: () => {
        document.body.className = `${document.body.classList[0]}`;
      },
    },
    {
      id: "bookNow",
      title: "BOOK NOW",
      onClick: () => {
        setIsReservationsOpen(true);
        document.body.className = `${document.body.classList[0]} u-scroll-disabled`;
      },
    },
  ];

  const handleBurgerMenuClick = () => {
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
      <div className={`${styles.navbar__container}`}>
        <Link href="/#header">
          <Image
            src={
              hasScrollMoved
                ? "/images/logo-beige.png"
                : "/images/logo-white.png"
            }
            alt="maalum-zanzibar-logo"
            className={styles.navbar__image}
            width={157}
            height={41}
          />
        </Link>
        <div
          className={`${styles["menu__burger-container"]}`}
          onClick={handleBurgerMenuClick}
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
      </div>
      <div className={`${styles.menu}`}>
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
                setIsMenuExpanded(!isMenuExpanded);
                onClick();
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
