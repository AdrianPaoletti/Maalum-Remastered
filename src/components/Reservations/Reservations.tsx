import { useContext } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  IconButton,
} from "@mui/material";

import MaalumContext from "maalum/core/store/context/MaalumContext";
import { Guests } from "./Guests/Guests";

import styles from "./Reservations.module.scss";

export function Reservations() {
  const { isReservationsOpen, setIsReservationsOpen } =
    useContext(MaalumContext);

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    document.body.className = `${document.body.classList[0]}`;
  };

  const accordionElements: {
    id: string;
    title: string;
    component: JSX.Element;
  }[] = [
    { id: "services", title: "SERVICE", component: <></> },
    { id: "guests", title: "GUESTS", component: <Guests /> },
  ];

  return (
    <Backdrop
      open={isReservationsOpen}
      onClick={() => handleOnClose()}
      transitionDuration={{ enter: 800, exit: 800 }}
      sx={{ zIndex: 2 }}
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
        <article className={`${styles.reservations__body}`}>
          {accordionElements.map(({ id, title, component }) => (
            <Accordion key={id} disableGutters square>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
              >
                <h5
                  className={`${styles["reservations__sub-title"]} heading-cuaternary`}
                >
                  {title}
                </h5>
              </AccordionSummary>
              <AccordionDetails>{component}</AccordionDetails>
            </Accordion>
          ))}
        </article>
        <article className={`${styles.reservations__footer} `}></article>
      </section>
    </Backdrop>
  );
}
