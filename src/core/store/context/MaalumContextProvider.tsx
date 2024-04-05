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

  return (
    <MaalumContext.Provider
      value={{ isReservationsOpen, setIsReservationsOpen, isImageLoaded, setIsImageLoaded }}
    >
      {children}
    </MaalumContext.Provider>
  );
}
