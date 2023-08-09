"use client";

import Image from "next/image";

import { Navbar } from "../Navbar/Navbar";

import styles from "./Header.module.scss";

export function Header() {
  return (
    <header className={styles["header"]} id="header">
      <Navbar />
      {
        <Image
          src="/images/header-cave.jpg"
          alt="maalum swimming cave"
          fill
          className={styles["header__image"]}
        />
      }
      <h1 className={`${styles["header__title"]} heading-primary`}>
        WELCOME TO PARADISE
      </h1>
    </header>
  );
}
