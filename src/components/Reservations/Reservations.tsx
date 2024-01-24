import { useContext, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Backdrop, IconButton, Slide, useMediaQuery } from "@mui/material";

import { EMAIL_REGEX } from "maalum/core/constants/constants";
import {
  ConfirmationState,
  ReservationsConfirmationInformation,
  ReservationsPickerInformation,
  ReservationsPickerSubmited,
  ReservationsServiceInformation,
} from "maalum/core/models/reservations.model";
import { getURLPesapalPayment } from "maalum/core/services/payments/payments.service";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import {
  initialReservationsConfirmationInformation,
  initialReservationsPickerInformation,
  initialReservationsServicePickerInformation,
} from "maalum/utils/reservations/reservations.utils";
import { ReservationConfirmation } from "./ReservationsConfirmation/ReservationsConfirmation";
import ReservationsPayment from "./ReservationsPayment/ReservationsPayment";
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
  // const [reservationsPickerSubmited, setReservationsPickerSubmited] =
  //   useState<ReservationsPickerSubmited>(initialReservationsPickerSubmited);
  const [accordionExpanded, setAccordionExpanded] = useState<string>("dates");
  const [isError, setIsError] = useState<boolean>(false);
  const [
    reservationsConfirmationInformation,
    setReservationsConfirmationInformation,
  ] = useState<ReservationsConfirmationInformation>(
    initialReservationsConfirmationInformation
  );
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>("loading");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [URLPayment, setURLPayment] = useState<string>("");

  const isReservationsConfirmationButtonDisabled = Object.values(
    reservationsConfirmationInformation
  ).some((value) => !value || !value?.length);

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    setReservationsPickerInformation(initialReservationsPickerInformation);
    setReservationsConfirmationInformation(
      initialReservationsConfirmationInformation
    );
    // setReservationsPickerSubmited(initialReservationsPickerSubmited);
    setAccordionExpanded("dates");
    document.body.className = `${document.body.classList[0]}`;
    const timer = setTimeout(() => {
      setReservationStepper("reservationsPicker");
      clearTimeout(timer);
    }, 1000);
  };

  const handleReservationsPickerSubmit = () => {
    setReservationStepper("reservationsConfirmation");
    setAccordionExpanded("");
    // setReservationsPickerSubmited((prevReservationsPickerSubmited) => ({
    //   ...prevReservationsPickerSubmited,
    //   services: true,
    // }));
    setIsError(false);
  };

  const handleReservationConfirmationSubmit = async () => {
    const isError = !new RegExp(EMAIL_REGEX, "gm").test(
      reservationsConfirmationInformation.email
    );

    if (!isError) {
      setConfirmationState("loading");
      setReservationStepper("reservationsPayment");
      try {
        // await postReservation({
        //   ...reservationsPickerInformation,
        //   ...reservationsConfirmationInformation,
        //   client: true,
        //   date: dateToUTC(reservationsPickerInformation.date as Date),
        // });
        const URLPesapalPayment = await getURLPesapalPayment();
        setURLPayment(URLPesapalPayment);
        setIsPaymentModalOpen(true);
        // setConfirmationState("resolved");
      } catch (error) {
        setConfirmationState("rejected");
      }
    }

    setIsError(isError);
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
              reservationsPickerInformation={reservationsPickerInformation}
              setReservationsPickerInformation={
                setReservationsPickerInformation
              }
              // reservationsPickerSubmited={reservationsPickerSubmited}
              // setReservationsPickerSubmited={setReservationsPickerSubmited}
              accordionExpanded={accordionExpanded}
              setAccordionExpanded={setAccordionExpanded}
            />
          ),
          title: "SELECT DATE AND SERVICES",
          buttonText: "NEXT",
          isButtonDisabled: false,
          onClick: () => handleReservationsPickerSubmit(),
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
          onClick: () => handleReservationConfirmationSubmit(),
          hasGoBackIcon: true,
        };
      case "reservationsPayment":
        return {
          component: (
            <ReservationsPayment
              confirmationState={confirmationState}
              isPaymentModalOpen={isPaymentModalOpen}
              setIsPaymentModalOpen={setIsPaymentModalOpen}
              URLPayment={URLPayment}
            />
          ),
          title: "PAYMENT CONFIRMATION",
          buttonText: "CLOSE",
          isButtonDisabled: confirmationState === "loading",
          onClick: () => handleOnClose(),
          hasGoBackIcon: false,
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
