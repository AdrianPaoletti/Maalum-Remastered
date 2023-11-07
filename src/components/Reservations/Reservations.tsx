import { useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Backdrop, IconButton, Slide, useMediaQuery } from "@mui/material";

import { EMAIL_REGEX } from "maalum/core/constants/constants";
import {
  ReservationsConfirmationInformation,
  ReservationsPickerInformation,
  ReservationsPickerSubmited,
} from "maalum/core/models/reservations.model";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import {
  initialReservationsConfirmationInformation,
  initialReservationsPickerInformation,
  initialReservationsPickerSubmited,
} from "maalum/utils/reservations/reservations.utils";
import { ReservationConfirmation } from "./ReservationsConfirmation/ReservationsConfirmation";
import { ReservationsPicker } from "./ReservationsPicker/ReservationsPicker";

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
    useState<string>("reservationsPicker");
  const [reservationsPickerInformation, setReservationsPickerInformation] =
    useState<ReservationsPickerInformation>(
      initialReservationsPickerInformation
    );
  const [reservationsPickerSubmited, setReservationsPickerSubmited] =
    useState<ReservationsPickerSubmited>(initialReservationsPickerSubmited);
  const [accordionExpanded, setAccordionExpanded] = useState<string>("guests");
  const [isError, setIsError] = useState<boolean>(false);
  const [
    reservationsConfirmationInformation,
    setReservationsConfirmationInformation,
  ] = useState<ReservationsConfirmationInformation>(
    initialReservationsConfirmationInformation
  );

  const isReservationsPickerButtonDisabled = (
    reservationsPickerInformation: ReservationsPickerInformation
  ): boolean => {
    const totalGuests = Object.values(reservationsPickerInformation)
      .slice(0, 3)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const dateServiceValue = Object.values(reservationsPickerInformation).slice(
      3,
      5
    );

    return !totalGuests || dateServiceValue.some((value) => !value);
  };

  const isReservationsConfirmationButtonDisabled = Object.values(
    reservationsConfirmationInformation
  ).some((value) => !value || !value?.length);

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    setReservationsPickerInformation(initialReservationsPickerInformation);
    setReservationsConfirmationInformation(
      initialReservationsConfirmationInformation
    );
    setReservationsPickerSubmited(initialReservationsPickerSubmited);
    setReservationStepper("reservationsPicker");
    setAccordionExpanded("guests");
    document.body.className = `${document.body.classList[0]}`;
  };

  const renderReservationComponent = (): {
    component: React.ReactNode;
    title: string;
    buttonText: string;
    isButtonDisabled: boolean;
    onClick: () => void;
    hasGoBackIcon?: boolean;
  } => {
    switch (reservationStepper) {
      case "reservationsPicker":
        return {
          component: (
            <ReservationsPicker
              isPhoneViewport={isPhoneViewport}
              reservationsPickerInformation={reservationsPickerInformation}
              setReservationsPickerInformation={
                setReservationsPickerInformation
              }
              reservationsPickerSubmited={reservationsPickerSubmited}
              setReservationsPickerSubmited={setReservationsPickerSubmited}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          ),
          title: "SELECT DATE AND TIME",
          buttonText: "NEXT",
          isButtonDisabled: isReservationsPickerButtonDisabled(
            reservationsPickerInformation
          ),
          onClick: () => {
            setReservationStepper("reservationsConfirmation");
            setAccordionExpanded("");
            setReservationsPickerSubmited((prevReservationsPickerSubmited) => ({
              ...prevReservationsPickerSubmited,
              services: true,
            }));
          },
        };
      case "reservationsConfirmation":
        return {
          component: (
            <ReservationConfirmation
              isError={isError}
              reservationsPickerInformation={reservationsPickerInformation}
              reservationsConfirmationInformation={
                reservationsConfirmationInformation
              }
              setReservationsConfirmationInformation={
                setReservationsConfirmationInformation
              }
            />
          ),
          title: "BOOKING CONFIRMATION",
          buttonText: "PROCEED TO BOOK",
          isButtonDisabled: isReservationsConfirmationButtonDisabled,
          onClick: () => {
            setIsError(
              !new RegExp(EMAIL_REGEX, "gm").test(
                reservationsConfirmationInformation.email
              )
            );
          },
          hasGoBackIcon: true,
        };
      default:
        return {
          component: <></>,
          title: "",
          buttonText: "",
          isButtonDisabled: false,
          onClick: () => {},
        };
    }
  };

  const {
    component,
    title,
    buttonText,
    onClick,
    hasGoBackIcon,
    isButtonDisabled,
  } = renderReservationComponent();

  return (
    <ReservationsWrapper
      isPhoneViewport={isPhoneViewport}
      wrapper={(children) => (
        <Backdrop
          open={isReservationsOpen}
          transitionDuration={{ enter: 800, exit: 800 }}
          sx={{ zIndex: 2, opacity: 1 }}
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
                  onClick={() => setReservationStepper("reservationsPicker")}
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
            <button
              className={`${styles["reservations__footer-button"]} ${
                isButtonDisabled &&
                styles["reservations__footer-button--disabled"]
              }`}
              disabled={isButtonDisabled}
              type="button"
              onClick={onClick}
            >
              {buttonText}
            </button>
          </article>
        </div>
      </section>
    </ReservationsWrapper>
  );
}
