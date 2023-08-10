import { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  IconButton,
} from "@mui/material";

import MaalumContext from "maalum/core/store/context/MaalumContext";

import styles from "./Reservations.module.scss";

export function Reservations() {
  const { isReservationsOpen, setIsReservationsOpen } =
    useContext(MaalumContext);

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    document.body.className = `${document.body.classList[0]}`;
  };

  return (
    <Backdrop
      open={isReservationsOpen}
      onClick={() => handleOnClose()}
      transitionDuration={{ enter: 800, exit: 800 }}
      sx={{ zIndex: 1 }}
    >
      <section
        className={`${styles.reservations} ${
          isReservationsOpen && styles["reservations--active"]
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <article className={`${styles.reservations__header}`}>
          <h4 className={`${styles.reservations__title} heading-cuaternary`}>
            SELECT DATE AND TIME
          </h4>
          <IconButton
            onClick={handleOnClose}
            className={`${styles["reservations__button-close"]}`}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </article>
        <article className={`${styles.reservations__body}`}></article>
        <article className={`${styles.reservations__footer} `}></article>
      </section>
    </Backdrop>
  );
}
