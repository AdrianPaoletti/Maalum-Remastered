"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import MaalumContext from "maalum/core/store/context/MaalumContext";

import styles from "./Navbar.module.scss";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const pathname = usePathname();
  const [hasScrollMoved, setHasScrollMoved] = useState<boolean>(false);
  const { setIsReservationsOpen, isMenuExpanded, setIsMenuExpanded, handleBurgerMenuClick } = useContext(MaalumContext);
  const isMenuPath = pathname === '/menus';

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

    if(isMenuPath) {
      handleBurgerMenuClick()
    }

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, [handleScrollEvent]);

  const menuItems: {
    id: string;
    title: string;
    onClick: () => void;
  }[] = [
    {
      id: "",
      title: "CONTACT US",
      onClick: () => {
        document.body.className = `${document.body.classList[0]}`;
        const section = document.getElementById("contact");

        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
          window.scrollTo({
            top: section.offsetTop - 128,
            behavior: "smooth",
          });
        }
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

  const menuPDF: {
    id: string;
    title: string;
  }[] = [
    {
      id: "restaurant",
      title: "RESTAURANT MENU",
    },
    {
      id: "spa",
      title: "SPA MENU",
    },
  ];

  return (
    <nav
      className={`${styles.navbar} ${
        hasScrollMoved && styles["navbar--sticky"]
      }`}
    >
      <div className={`${styles.navbar__container}`}>
        <Image
          src={
            hasScrollMoved ? "/images/logo-beige.png" : "/images/logo-white.png"
          }
          alt="maalum-zanzibar-logo"
          className={styles.navbar__image}
          onClick={() =>
            document
              .getElementById("header")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          width={157}
          height={41}
        />
        {!isMenuPath && <div
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
        </div>}
      </div>
      <div className={`${styles.menu}`}>
        <ul
          className={`${styles["menu__list"]} ${
            isMenuExpanded && styles["menu__list--active"]
          }`}
        >
          {isMenuPath ? menuPDF.map(({ id, title }, index) => (
            <li
              key={id}
              className={`navbar-list-item ${styles["menu__item"]} ${
                hasScrollMoved && styles["menu__item--sticky"]
              }`}
              onClick={() => window.open(`/documents/${id}-2025.pdf`, "_blank")}
            >
              <a
                href={`/documents/${id}-2025.pdf`}
                download={`menu-${id}`}
                className={`navbar-list-item ${styles["menu__item"]}`}
                style={{border: !!index ? 'none' : undefined}}
                >
                {title}
                </a>
            </li>
          )) : menuItems.map(({ id, title, onClick }) => (
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
              {title}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
