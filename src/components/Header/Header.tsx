"use client";

import { useContext } from "react";
import Image from "next/image";

import MaalumContext from "maalum/core/store/context/MaalumContext";
import { Navbar } from "../Navbar/Navbar";
import { Reservations } from "../Reservations/Reservations";

import styles from "./Header.module.scss";

export function Header() {
  const { setIsImageLoaded } = useContext(MaalumContext);

  return (
    <header className={styles["header"]} id="header">
      <Navbar />
      {
        <Image
          src="/images/header-cave.jpg"
          alt="maalum swimming cave"
          fill
          className={styles["header__image"]}
          onLoad={(e) => setIsImageLoaded(true)}
        />
      }
      <h1 className={`${styles["header__title"]} heading-primary`}>
        WELCOME TO PARADISE
      </h1>
      <Reservations />
    </header>
  );
}
