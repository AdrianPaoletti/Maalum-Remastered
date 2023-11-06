import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, useMediaQuery } from "@mui/material";

import { ReservationsPickerInformation } from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import {
  initialReservationsPickerInformation,
  reservationsGuestsInformation,
} from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerGuests.module.scss";

interface ReservationsPickerGuestsProps {
  handleSubmit: () => void;
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerGuests({
  handleSubmit,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerGuestsProps) {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  const [reservationsTotalGuestsCounter, setReservationsTotalGuestsCounter] =
    useState<number>(0);
  const [isButtonPlusDisabled, setIsButtonPlusDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    const totalGuests = Object.values(reservationsPickerInformation)
      .splice(0, 3)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
    setReservationsPickerInformation((prevReservationsPickerInformation) =>
      !totalGuests
        ? initialReservationsPickerInformation
        : prevReservationsPickerInformation
    );
    setIsButtonPlusDisabled(totalGuests === 10 ? true : false);
    setReservationsTotalGuestsCounter(totalGuests);
  }, [reservationsPickerInformation, setReservationsPickerInformation]);

  return (
    <form
      className={styles.guests}
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      {reservationsGuestsInformation.map(
        ({
          id,
          pluralTitle,
          singleTitle,
          subtitle,
          dollarsPrice,
          shillingPrice,
        }) => (
          <div
            key={id}
            className={`${styles.guests__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
          >
            <div className={`${styles["guests__text-container"]}`}>
              <p className={`${styles["guests__text-title"]} text-secondary`}>
                {reservationsPickerInformation[id] > 1 ||
                !reservationsPickerInformation[id]
                  ? pluralTitle
                  : singleTitle}
                {!isSmallPhoneViewPort && (
                  <span className="text-terciary">
                    {` - ${dollarsPrice}$ | ${shillingPrice}tsh pp`}
                  </span>
                )}
              </p>
              <p className={`${styles["guests__text-subtitle"]} text-primary`}>
                {subtitle}
              </p>
              {isSmallPhoneViewPort && (
                <span className="text-terciary">
                  {`${dollarsPrice}$ | ${shillingPrice}tsh pp`}
                </span>
              )}
            </div>
            <div className={`${styles["guests__counter"]}`}>
              <IconButton
                onClick={() => {
                  !!reservationsPickerInformation[id] &&
                    setReservationsPickerInformation(
                      (prevReservationsPickerInformation) => ({
                        ...prevReservationsPickerInformation,
                        [id]: prevReservationsPickerInformation[id] - 1,
                      })
                    );
                }}
                disabled={!reservationsPickerInformation[id]}
                className={`${styles["guests__button"]}`}
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
              <span className={`${styles["guests__count"]}`}>
                {reservationsPickerInformation[id]}
              </span>
              <IconButton
                onClick={() => {
                  setReservationsPickerInformation(
                    (prevReservationsPickerInformation) => ({
                      ...prevReservationsPickerInformation,
                      [id]: prevReservationsPickerInformation[id] + 1,
                    })
                  );
                }}
                disabled={isButtonPlusDisabled}
                className={`${styles["guests__button"]}`}
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
        )
      )}
      <div className={`${styles["guests__button-submit-container"]}`}>
        <button
          className={`${styles["guests__button-submit"]} ${
            !reservationsTotalGuestsCounter &&
            styles["guests__button-submit--disabled"]
          }`}
          disabled={!reservationsTotalGuestsCounter}
          type="submit"
        >
          CONTINUE
        </button>
      </div>
    </form>
  );
}
