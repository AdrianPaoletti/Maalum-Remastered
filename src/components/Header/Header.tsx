"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { WordsPullUp } from "maalum/components/ui/Animations/Animations";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import { Navbar } from "../Navbar/Navbar";
import { Reservations } from "../Reservations/Reservations";

import styles from "./Header.module.scss";

const MotionImage = motion.create(Image);

export function Header() {
  const { setIsImageLoaded } = useContext(MaalumContext);
  const [isHeaderImageLoaded, setIsHeaderImageLoaded] = useState(false);

  return (
    <header className={styles["header"]} id="header">
      <Navbar />
      <MotionImage
        src="/images/header-cave.jpg"
        alt="maalum swimming cave"
        fill
        className={styles["header__image"]}
        onLoad={() => {
          setIsImageLoaded(true);
          setIsHeaderImageLoaded(true);
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHeaderImageLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <h1 className={`${styles["header__title"]} heading-primary`}>
        <WordsPullUp
          text="WELCOME TO PARADISE"
          delay={0.45}
          active={isHeaderImageLoaded}
        />
      </h1>
      <Reservations />
    </header>
  );
}
