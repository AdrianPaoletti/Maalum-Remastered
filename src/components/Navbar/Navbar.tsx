"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import MaalumContext from "maalum/core/store/context/MaalumContext";

import styles from "./Navbar.module.scss";

// Drop-in entrance used for individual navbar pieces on load. Applied only to
// non-fixed inner elements, never to <nav>/<ul>, so the sticky white bar and
// the mobile off-canvas menu keep their own behaviour untouched. Snappy spring
// to match the rest of the motion system.
const dropIn = (delay: number) => ({
  initial: { opacity: 0, y: -14 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 300, damping: 24, delay },
});

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
        <motion.div {...dropIn(0.1)}>
          <Image
            src={
              hasScrollMoved
                ? "/images/logo-beige.png"
                : "/images/logo-white.png"
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
        </motion.div>
        {!isMenuPath && <motion.div
          className={`${styles["menu__burger-container"]}`}
          onClick={handleBurgerMenuClick}
          {...dropIn(0.2)}
        >
          {[1, 2, 3].map((value) => (
            <span
              key={value}
              className={`${styles["menu__burger-line"]} ${
                isMenuExpanded && styles["menu__burger-line--active"]
              }`}
            ></span>
          ))}
        </motion.div>}
      </div>
      <div className={`${styles.menu}`}>
        <ul
          className={`${styles["menu__list"]} ${!isMenuPath ? styles["menu__list--normal"] : styles["menu__list--active"]} ${
            isMenuExpanded && styles["menu__list--active"]
          }`}
        >
          {isMenuPath ? menuPDF.map(({ id, title }, index) => (
            <motion.li
              key={id}
              className={`navbar-list-item ${styles["menu__item"]} ${
                hasScrollMoved && styles["menu__item--sticky"]
              }`}
              onClick={() => window.open(`/documents/${id}-2025.pdf`, "_blank")}
              {...dropIn(0.25 + index * 0.08)}
            >
              <a
                href={`/documents/${id}-2025.pdf`}
                download={`menu-${id}`}
                className={`navbar-list-item`}
                style={{color: !!index ? 'none' : undefined}}
                >
                {title}
                </a>
            </motion.li>
          )) : menuItems.map(({ id, title, onClick }, index) => (
            <motion.li
              key={id}
              className={`navbar-list-item ${styles["menu__item"]} ${
                hasScrollMoved && styles["menu__item--sticky"]
              }`}
              onClick={() => {
                setIsMenuExpanded(!isMenuExpanded);
                onClick();
              }}
              {...dropIn(0.25 + index * 0.08)}
            >
              {title}
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
