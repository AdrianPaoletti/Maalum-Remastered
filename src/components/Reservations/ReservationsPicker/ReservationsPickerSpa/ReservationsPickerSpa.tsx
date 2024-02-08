import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Collapse, IconButton, Radio, useMediaQuery } from "@mui/material";

import { MAX_DISABLE_CAVE } from "maalum/core/constants/constants";
import {
  Reservation,
  ReservationsPickerInformation,
  ReservationsSpaCounter,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { dateToUTC } from "maalum/utils/formatters/formatters.utils";
import { spaInformation } from "maalum/utils/reservations/reservations.utils";
import { ReservationsPickerGuests } from "../ReservationsPickerGuests/ReservationsPickerGuests";

import stylesGuests from "../ReservationsPickerGuests/ReservationsPickerGuests.module.scss";
import styles from "./ReservationsPickerSpa.module.scss";

interface ReservationsPickerServicesGuestsProps {
  // reservations: Reservation[];
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerSpa({
  // reservations,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerServicesGuestsProps) {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  const spaGuests = spaInformation
    .map(({ id }) => reservationsPickerInformation[id])
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const isButtonPlusDisabled =
    spaGuests >= reservationsPickerInformation.totalGuests ? true : false;
  // const [isCaveDisabled, setIsCaveDisabled] = useState<boolean>(false);
  // const [isSpa, setIsSpa] = useState<boolean>(false);
  // const [serviceSelected, setServiceSelected] = useState<string>("");
  // const { date: reservationsPickerDate } = reservationsPickerInformation;

  // useEffect(() => {
  //   if (reservationsPickerDate) {
  //     const reservationsMatched = reservations.filter(
  //       ({ date }) =>
  //         date.toString() ===
  //         dateToUTC(reservationsPickerDate as Date).toISOString()
  //     );
  //     const totalGuestsReservation = reservationsMatched.reduce(
  //       (accumulator, currentValue) => accumulator + currentValue.totalGuests,
  //       0
  //     );
  //     const isSpaService = reservationsMatched.some(
  //       ({ service }) => service === "caveAndSpa"
  //     );

  //     setIsSpa(isSpaService);
  //     setIsCaveDisabled(
  //       totalGuestsReservation >= MAX_DISABLE_CAVE && !isSpaService
  //     );
  //   }
  // }, [reservations, reservationsPickerDate]);

  // const handleClick = (id: string) => {
  //   setServiceSelected((prevServiceSelected) =>
  //     prevServiceSelected === id ? "" : id
  //   );
  // };

  // const handleClick = (id: string) => {
  //   if (reservationsPickerService.includes(id)) {
  //     return setReservationsPickerInformation(
  //       (prevReservationsPickerInformation) => ({
  //         ...prevReservationsPickerInformation,
  //         service: prevReservationsPickerInformation.service.filter(
  //           (serviceId) => serviceId !== id
  //         ),
  //       })
  //     );
  //   }

  //   setReservationsPickerInformation((prevReservationsPickerInformation) => ({
  //     ...prevReservationsPickerInformation,
  //     service: [...prevReservationsPickerInformation.service, id],
  //   }));
  // };

  const handlePlus = (id: keyof ReservationsSpaCounter) =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] + 1,
      service: [],
      date: null,
    }));

  const handleMinus = (id: keyof ReservationsSpaCounter) =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] - 1,
    }));

  return (
    <form className={styles.spa}>
      {spaInformation.map(
        ({ id, title, subtitle, dollarsPrice, shillingPrice }) => {
          const isDisabled = false;
          return (
            <div
              key={id}
              className={`${styles.spa__card} ${
                isDisabled && styles["spa__card--disabled"]
              }`}
            >
              <div
                className={`${styles.spa__service} ${
                  isDisabled && styles["spa__service--disabled"]
                } u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
                // onClick={() => handleClick(id)}
              >
                <div>
                  <p
                    className={`text-secondary ${
                      isDisabled && "text-secondary--disabled"
                    } ${styles["spa__text-title"]}`}
                  >
                    {title}
                  </p>
                  <p
                    className={`text-primary ${
                      isDisabled && "text-primary--disabled"
                    } ${styles["spa__text-subtitle"]}`}
                  >
                    {subtitle}
                  </p>
                </div>
              </div>
              <div
                key={id}
                className={`${stylesGuests.guests__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
              >
                <div className={`${stylesGuests["guests__text-container"]}`}>
                  <p className={`${stylesGuests["guests__text-title"]}`}>
                    {reservationsPickerInformation[id] > 1 ||
                    !reservationsPickerInformation[id]
                      ? "Guests"
                      : "Guest"}
                    {!isSmallPhoneViewPort && (
                      <span className="text-terciary">
                        {` - ${dollarsPrice}$ | ${shillingPrice}tsh pp`}
                      </span>
                    )}
                  </p>
                  <p className={`${stylesGuests["guests__text-subtitle"]}`}>
                    {subtitle}
                  </p>
                  {isSmallPhoneViewPort && (
                    <span className="text-terciary">
                      {`${dollarsPrice}$ | ${shillingPrice}tsh pp`}
                    </span>
                  )}
                </div>
                <div className={`${stylesGuests["guests__counter"]}`}>
                  <IconButton
                    onClick={() => handleMinus(id)}
                    disabled={!reservationsPickerInformation[id]}
                    className={`${stylesGuests["guests__button"]}`}
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: defaultTheme.palette.beige.disabled,
                        color: defaultTheme.palette.white,
                      },
                    }}
                    disableRipple
                  >
                    <RemoveIcon fontSize="inherit" />
                  </IconButton>
                  <span className={`${stylesGuests["guests__count"]}`}>
                    {reservationsPickerInformation[id]}
                  </span>
                  <IconButton
                    onClick={() => handlePlus(id)}
                    disabled={isButtonPlusDisabled}
                    className={`${stylesGuests["guests__button"]}`}
                    sx={{
                      "&.Mui-disabled": {
                        backgroundColor: defaultTheme.palette.beige.disabled,
                        color: defaultTheme.palette.white,
                      },
                    }}
                    disableRipple
                  >
                    <AddIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        }
      )}
      <div className={`${stylesGuests["guests__button-submit-container"]}`}>
        <button
          className={`${stylesGuests["guests__button-submit"]}`}
          type="submit"
        >
          CONTINUE
        </button>
      </div>
    </form>
  );
}
