"use client";

import { useState } from "react";

import MaalumContext from "./MaalumContext";

interface MaalumContextProviderProps {
  children: JSX.Element;
}

export default function MaalumContextProvider({
  children,
}: MaalumContextProviderProps) {
  const [isReservationsOpen, setIsReservationsOpen] = useState<boolean>(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isMenuExpanded, setIsMenuExpanded] = useState<boolean>(false);

  const handleBurgerMenuClick = () => {
    setIsMenuExpanded(!isMenuExpanded);

    if (!isMenuExpanded) {
      document.body.className = `${document.body.classList[0]} u-scroll-disabled`;
      return;
    }
    document.body.className = `${document.body.classList[0]}`;
  };

  return (
    <MaalumContext.Provider
      value={{ isReservationsOpen, setIsReservationsOpen, isImageLoaded, setIsImageLoaded, isMenuExpanded, setIsMenuExpanded, handleBurgerMenuClick }}
    >
      {children}
    </MaalumContext.Provider>
  );
}
