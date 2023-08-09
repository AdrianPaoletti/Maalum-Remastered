"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Navbar } from "../Navbar/Navbar";

import styles from "./Header.module.scss";

export function Header() {
  const pathname = usePathname();

  const [showImageHeader, setShowImageHeader] = useState<boolean>(true);
  useEffect(() => {
    const pathNames = ["/terms-conditions", "/privacy-policy"];

    if (!pathNames.includes(pathname)) {
      setShowImageHeader(true);
      return;
    }
    setShowImageHeader(false);
  }, [pathname]);

  return (
    <header className={styles["header"]} id="header">
      <Navbar />
      {showImageHeader && (
        <Image
          src="/images/header-cave.jpg"
          alt="maalum swimming cave"
          fill
          className={styles["header__image"]}
        />
      )}
      <h1 className={`${styles["header__title"]} heading-primary`}>
        WELCOME TO PARADISE
      </h1>
    </header>
  );
}
