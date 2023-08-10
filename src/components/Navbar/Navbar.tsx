"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.module.scss";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  const [hasScrollMoved, setHasScrollMoved] = useState<boolean>(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

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

  const menuItems: { id: string; title: string; refference?: string }[] = [
    { id: "contact", title: "CONTACT US", refference: "contact" },
    { id: "bookNow", title: "BOOK NOW" },
  ];

  const handleClick = () => {
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <nav
      className={`${styles.navbar} ${
        hasScrollMoved && styles["navbar--sticky"]
      } u-padding-vertical-small`}
    >
      <div className={"col-1-of-2"}>
        <Link href="/#header">
          <Image
            src="/images/header-logo.png"
            alt="maalum-zanzibar-logo"
            width={162.5}
            height={45}
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
          {menuItems.map(({ id, title, refference }) => (
            <li
              key={id}
              className={`navbar-list-item ${styles["menu__item"]} ${
                hasScrollMoved && styles["menu__item--sticky"]
              }`}
              onClick={handleClick}
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
