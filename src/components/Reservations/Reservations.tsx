import { useContext, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Backdrop, IconButton, useMediaQuery } from "@mui/material";

import MaalumContext from "maalum/core/store/context/MaalumContext";
import ReservationsChoice from "./ReservationsChoice/ReservationsChoice";
import ReservationsConfirmation from "./ReservationsConfirmation/ReservationsConfirmation";

import styles from "./Reservations.module.scss";

export function Reservations() {
  const isPhoneViewport = useMediaQuery("(max-width:43.75em)");
  const { isReservationsOpen, setIsReservationsOpen } =
    useContext(MaalumContext);
  const [reservationStepper, setReservationStepper] =
    useState<string>("reservationsChoice");

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    document.body.className = `${document.body.classList[0]}`;
  };

  const renderReservationComponent = (): {
    component: React.ReactNode;
    title: string;
    buttonText: string;
    onClick: () => void;
  } => {
    switch (reservationStepper) {
      case "reservationsChoice":
        return {
          component: <ReservationsChoice isPhoneViewport={isPhoneViewport} />,
          title: "SELECT DATE AND TIME",
          buttonText: "NEXT",
          onClick: () => setReservationStepper("reservationsConfirmation"),
        };
      case "reservationsConfirmation":
        return {
          component: (
            <ReservationsConfirmation isPhoneViewport={isPhoneViewport} />
          ),
          title: "BOOKING CONFIRMATION",
          buttonText: "PROCEED TO BOOK",
          onClick: () => setReservationStepper("reservationsConfirmation"),
        };
      default:
        return {
          component: <ReservationsChoice isPhoneViewport={isPhoneViewport} />,
          title: "SELECT DATE AND TIME",
          buttonText: "NEXT",
          onClick: () => setReservationStepper("reservationsConfirmation"),
        };
    }
  };

  const { component, title, buttonText, onClick } =
    renderReservationComponent();

  return (
    <Backdrop
      open={isReservationsOpen}
      onClick={() => handleOnClose()}
      transitionDuration={{ enter: 800, exit: isPhoneViewport ? 500 : 800 }}
      sx={{ zIndex: 2 }}
    >
      <section
        className={`${styles.reservations} ${
          isReservationsOpen && styles["reservations--active"]
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`${styles["reservations__container"]}`}>
          <article className={`${styles.reservations__header}`}>
            <h4 className={`${styles.reservations__title} heading-cuaternary`}>
              {title}
            </h4>
            <IconButton
              onClick={handleOnClose}
              sx={{ color: "inherit", fontSize: 22 }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </article>
          {component}
          <article className={`${styles.reservations__footer}`}>
            <button type="button" onClick={onClick}>
              {buttonText}
            </button>
          </article>
        </div>
      </section>
    </Backdrop>
  );
}
