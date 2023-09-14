import { useContext, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Backdrop, IconButton, useMediaQuery } from "@mui/material";

import MaalumContext from "maalum/core/store/context/MaalumContext";
import { ReservationsChoice } from "./ReservationsChoice/ReservationsChoice";
import { ReservationConfirmation } from "./ReservationsConfirmation/ReservationsConfirmation";

import styles from "./Reservations.module.scss";

interface ReservationsWrapperProps {
  wrapper: (element: JSX.Element) => JSX.Element;
  children: JSX.Element;
  isPhoneViewport: boolean;
}

function ReservationsWrapper({
  wrapper,
  children,
  isPhoneViewport,
}: ReservationsWrapperProps) {
  return isPhoneViewport ? children : wrapper(children);
}

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
    hasGoBackIcon?: boolean;
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
            <ReservationConfirmation isPhoneViewport={isPhoneViewport} />
          ),
          title: "BOOKING CONFIRMATION",
          buttonText: "PROCEED TO BOOK",
          onClick: () => setReservationStepper(""),
          hasGoBackIcon: true,
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

  const { component, title, buttonText, onClick, hasGoBackIcon } =
    renderReservationComponent();

  return (
    <ReservationsWrapper
      isPhoneViewport={isPhoneViewport}
      wrapper={(children) => (
        <Backdrop
          open={isReservationsOpen}
          onClick={() => handleOnClose()}
          transitionDuration={{ enter: 800, exit: 800 }}
          sx={{ zIndex: 2 }}
        >
          {children}
        </Backdrop>
      )}
    >
      <section
        className={`${styles.reservations} ${
          isReservationsOpen && styles["reservations--active"]
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`${styles["reservations__container"]}`}>
          <article className={`${styles.reservations__header}`}>
            <div className={`${styles["reservations__title-container"]}`}>
              {hasGoBackIcon && (
                <IconButton
                  onClick={() => setReservationStepper("reservationsChoice")}
                  sx={{ color: "inherit", fontSize: 22, paddingLeft: 0 }}
                  disableRipple
                >
                  <KeyboardBackspaceIcon fontSize="inherit" />
                </IconButton>
              )}
              <h4
                className={`${styles.reservations__title} heading-cuaternary`}
              >
                {title}
              </h4>
            </div>
            <IconButton
              onClick={handleOnClose}
              sx={{ color: "inherit", fontSize: 22 }}
              disableRipple
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </article>
          <article className={`${styles["reservations__body"]}`}>
            {component}
          </article>
          <article className={`${styles.reservations__footer}`}>
            <button type="button" onClick={onClick}>
              {buttonText}
            </button>
          </article>
        </div>
      </section>
    </ReservationsWrapper>
  );
}
