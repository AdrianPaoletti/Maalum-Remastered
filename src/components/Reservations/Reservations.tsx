import { useCallback, useContext, useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Backdrop, IconButton, Slide, useMediaQuery } from "@mui/material";
import { v4 as uuid } from "uuid";

import { EMAIL_REGEX } from "maalum/core/constants/constants";
import {
  Reservation,
  ReservationsConfirmationInformation,
  ReservationsGuestsCounter,
  ReservationsPickerInformation,
  ReservationsSpaCounter,
  ReservationStepper,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import {
  getTransactionStatus,
  getURLPesapalPayment,
} from "maalum/core/services/payments/payments.service";
import { postReservation } from "maalum/core/services/reservations/reservations.service";
import MaalumContext from "maalum/core/store/context/MaalumContext";
import { dateToUTC } from "maalum/utils/formatters/formatters.utils";
import {
  initialGuestsCounter,
  initialReservationsConfirmationInformation,
  initialReservationsPickerInformation,
  initialUpgradeGuestsValue,
} from "maalum/utils/reservations/reservations.utils";
import { totalPrice as totalPriceSum } from "maalum/utils/reservations/reservationsConfirmation.utils";
import { getReseravtionsSpaGuests } from "maalum/utils/reservations/reservationsPicker.utils";
import {
  formatUpgradeGuests,
  getSpaDate,
  sumUpgradeGuests,
} from "maalum/utils/reservations/reservationsUpgrade.util";
import { ReservationConfirmation } from "./ReservationsConfirmation/ReservationConfirmation";
import ReservationsPayment from "./ReservationsPayment/ReservationsPayment";
import { ReservationsPicker } from "./ReservationsPicker/ReservationsPicker";
import { ReservationsUpgrade } from "./ReservationsUpgrade/ReservationsUpgrade";

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
  const [isLoadingPayment, setIsLoadingPayment] = useState<boolean>(false);
  const { isReservationsOpen, setIsReservationsOpen } =
    useContext(MaalumContext);
  const [reservationStepper, setReservationStepper] =
    useState<ReservationStepper>("reservationsPicker");
  const [reservationsPickerInformation, setReservationsPickerInformation] =
    useState<ReservationsPickerInformation>(
      initialReservationsPickerInformation
    );
  const [isError, setIsError] = useState<boolean>(false);
  const [isValidPhone, setIsValidPhone] = useState<boolean>(true);
  const [
    reservationsConfirmationInformation,
    setReservationsConfirmationInformation,
  ] = useState<ReservationsConfirmationInformation>(
    initialReservationsConfirmationInformation
  );
  const [caveGuests, setCaveGuests] =
    useState<ReservationsGuestsCounter>(initialGuestsCounter);
  const [URLPayment, setURLPayment] = useState<string>("");
  const [upgradeGuests, setUpgradeGuests] = useState<UpgradeGuests>(
    initialUpgradeGuestsValue
  );
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [spaExcluded, setSpaExcluded] = useState<ReservationsSpaCounter>();
  const [confirmationTexts, setConfirmationTexts] = useState<{
    title: string;
    text: string;
  }>({ title: "", text: "" });
  const isReservationsConfirmationButtonDisabled = Object.values(
    reservationsConfirmationInformation
  ).some((value) => !value || !value?.length);
  const isButtonDisabledPicker =
    !reservationsPickerInformation.totalGuests ||
    !reservationsPickerInformation.date?.getHours();

  const createReservation = useCallback(
    async (reservationParsed: any) => {
      const { orderTrackingId, token } = reservationParsed;
      try {
        const { payment_status_description: status } =
          await getTransactionStatus(orderTrackingId, token);

        localStorage.removeItem("reservation");
        if (status === "Completed") {
          setReservationStepper("reservationsPayment");
          setIsLoadingPayment(true);
          setIsReservationsOpen(true);
          await postReservation(reservationParsed);
          setIsLoadingPayment(false);
        }
      } catch (error) {}
    },
    [setIsReservationsOpen]
  );

  useEffect(() => {
    const reservation = localStorage.getItem("reservation");

    if (reservation) {
      const reservationParsed = JSON.parse(reservation);
      createReservation(reservationParsed);
    }
  }, [createReservation]);

  const handleOnClose = () => {
    setIsReservationsOpen(false);
    setReservationsPickerInformation(initialReservationsPickerInformation);
    setReservationsConfirmationInformation(
      initialReservationsConfirmationInformation
    );
    document.body.className = `${document.body.classList[0]}`;
    const timer = setTimeout(() => {
      setReservationStepper("reservationsPicker");
      clearTimeout(timer);
    }, 1000);
  };

  const handleReservationsPickerSubmit = () => {
    setReservationStepper("reservationsUpgrade");
    setIsError(false);
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      naturalEssence: 0,
      maalumRitual: 0,
    }));
    setSpaExcluded(
      getReseravtionsSpaGuests(
        reservations,
        reservationsPickerInformation.date as Date
      )
    );
  };

  const handleReservationsUpgradeSubmit = () => {
    // const formattedUpgradeGuests = formatUpgradeGuests(upgradeGuests);
    // const sumSpaGuests = sumUpgradeGuests(
    //   formattedUpgradeGuests.maalumRitual,
    //   formattedUpgradeGuests.naturalEssence
    // );
    const caveGuests = {
      adults: reservationsPickerInformation.adults,
      children: reservationsPickerInformation.children,
      residents: reservationsPickerInformation.residents,
    };
    const totalPrice = totalPriceSum({
      ...caveGuests,
      maalumRitual: reservationsPickerInformation.maalumRitual,
      naturalEssence: reservationsPickerInformation.naturalEssence,
    });

    setCaveGuests(caveGuests);
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      totalPrice,
    }));
    setReservationStepper("reservationsConfirmation");
  };

  const handleReservationConfirmationSubmit = async () => {
    const isError = !new RegExp(EMAIL_REGEX).test(
      reservationsConfirmationInformation.email
    );

    const reservation = {
      ...reservationsPickerInformation,
      ...reservationsConfirmationInformation,
      client: true,
      date: dateToUTC(reservationsPickerInformation.date as Date),
      spaDate: dateToUTC(
        getSpaDate(reservationsPickerInformation.date as Date)
      ),
      orderTrackingId: uuid(),
      caveGuests,
      ...formatUpgradeGuests(upgradeGuests),
    };

    if (isError) {
      setIsError(isError);
      return;
    }

    if (
      reservationsPickerInformation.totalGuests >= 4 ||
      reservationsPickerInformation.maalumRitual ||
      reservationsPickerInformation.naturalEssence
    ) {
      setConfirmationTexts({
        title: "PAYMENT CONFIRMATION",
        text: "A PAYMENT CONFIRMATION EMAIL HAS BEEN SENT TO YOU",
      });
      setReservationStepper("reservationsPayment");
      setIsLoadingPayment(true);
      try {
        const { url, orderTrackingId, token } = await getURLPesapalPayment({
          ...reservationsPickerInformation,
          ...reservationsConfirmationInformation,
        });
        setURLPayment(url);
        localStorage.setItem(
          "reservation",
          JSON.stringify({
            ...reservation,
            token,
            orderTrackingId,
          })
        );
      } catch (error) {}
      return;
    }

    setReservationStepper("reservationsPayment");
    setIsLoadingPayment(true);
    setIsReservationsOpen(true);
    setConfirmationTexts({
      title: "BOOKING CONFIRMATION",
      text: "A BOOKING CONFIRMATION EMAIL HAS BEEN SENT TO YOU",
    });
    await postReservation(reservation as any);
    setIsLoadingPayment(false);
  };

  const handleGoBack = () => {
    if (reservationStepper === "reservationsUpgrade") {
      setReservationStepper("reservationsPicker");
      return;
    }

    if (reservationStepper === "reservationsConfirmation") {
      setReservationStepper("reservationsUpgrade");
      return;
    }
  };

  const renderReservationComponent = (): {
    component: React.ReactNode;
    title: string;
    buttonText: string;
    isButtonDisabled: boolean;
    onClick: () => void;
    hasGoBackIcon?: boolean;
    hideCloseIcon?: boolean;
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
              reservations={reservations}
              setReservations={setReservations}
              upgradeGuests={upgradeGuests}
            />
          ),
          title: "SELECT GUESTS AND DATES",
          buttonText: "NEXT",
          isButtonDisabled: isButtonDisabledPicker,
          onClick: () => handleReservationsPickerSubmit(),
        };
      case "reservationsUpgrade":
        return {
          component: (
            <ReservationsUpgrade
              reservationsPickerInformation={reservationsPickerInformation}
              setReservationsPickerInformation={
                setReservationsPickerInformation
              }
              upgradeGuests={upgradeGuests}
              setUpgradeGuests={setUpgradeGuests}
              spaExcluded={spaExcluded as ReservationsSpaCounter}
              setReservationStepper={setReservationStepper}
            />
          ),
          title: "UPGRADE YOUR EXPERIENCE",
          buttonText: "NEXT",
          isButtonDisabled: false,
          onClick: () => handleReservationsUpgradeSubmit(),
          hasGoBackIcon: true,
        };
      case "reservationsConfirmation":
        return {
          component: (
            <ReservationConfirmation
              isError={isError}
              isValidPhone={isValidPhone}
              setIsValidPhone={setIsValidPhone}
              reservationsPickerInformation={reservationsPickerInformation}
              formattedUpgradeGuests={formatUpgradeGuests(upgradeGuests)}
              caveGuests={caveGuests}
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
          isButtonDisabled:
            isReservationsConfirmationButtonDisabled || !isValidPhone,
          onClick: () => handleReservationConfirmationSubmit(),
          hasGoBackIcon: true,
        };
      case "reservationsPayment":
        return {
          component: (
            <ReservationsPayment
              URLPayment={URLPayment}
              isLoading={isLoadingPayment}
              setIsLoading={setIsLoadingPayment}
              text={confirmationTexts.text}
            />
          ),
          title: confirmationTexts.title.length
            ? confirmationTexts.title
            : "PAYMENT CONFIRMATION",
          buttonText: "CLOSE",
          isButtonDisabled: false,
          onClick: () => handleOnClose(),
          hasGoBackIcon: false,
          hideCloseIcon: !!URLPayment,
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
    hideCloseIcon,
  } = renderReservationComponent();
  const showFooter = title !== "PAYMENT CONFIRMATION";

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
          <header className={`${styles.reservations__header}`}>
            <div className={`${styles["reservations__title-container"]}`}>
              {hasGoBackIcon && (
                <IconButton
                  onClick={handleGoBack}
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
              sx={{
                color: "inherit",
                fontSize: 22,
                visibility: hideCloseIcon ? "hidden" : "visible",
              }}
              disableRipple
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </header>
          {component}
          {showFooter && (
            <footer className={`${styles.reservations__footer}`}>
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
            </footer>
          )}
        </div>
      </section>
    </ReservationsWrapper>
  );
}
