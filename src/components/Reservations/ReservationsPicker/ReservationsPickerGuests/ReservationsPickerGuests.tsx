import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, useMediaQuery } from "@mui/material";

import { ReservationsGuestsCounter } from "maalum/core/models/reservations.model";
import { reservationsGuestsInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerGuests.module.scss";

export function ReservationsPickerGuests() {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  const [reservationsGuestsCounter, setReservationsGuestsCounter] =
    useState<ReservationsGuestsCounter>({
      adults: 0,
      children: 0,
      residents: 0,
    });
  const [reservationsTotalGuestsCounter, setReservationsTotalGuestsCounter] =
    useState<number>(0);
  const [isButtonDisabled, setIsButtonsDisabled] = useState<boolean>(false);

  useEffect(() => {
    const totalGuests = Object.values(reservationsGuestsCounter).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    setIsButtonsDisabled(totalGuests === 10 ? true : false);
    setReservationsTotalGuestsCounter(totalGuests);
  }, [reservationsGuestsCounter]);

  return (
    <div className={styles.guests}>
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
                {reservationsGuestsCounter[id] > 1 ||
                !reservationsGuestsCounter[id]
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
                  !!reservationsGuestsCounter[id] &&
                    setReservationsGuestsCounter(
                      (prevReservationsGuestsCounter) => ({
                        ...prevReservationsGuestsCounter,
                        [id]: prevReservationsGuestsCounter[id] - 1,
                      })
                    );
                }}
                className={`${styles["guests__button"]}`}
                disableRipple
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
              <span className={`${styles["guests__count"]}`}>
                {reservationsGuestsCounter[id]}
              </span>
              <IconButton
                onClick={() => {
                  setReservationsGuestsCounter(
                    (prevReservationsGuestsCounter) => ({
                      ...prevReservationsGuestsCounter,
                      [id]: prevReservationsGuestsCounter[id] + 1,
                    })
                  );
                }}
                disabled={isButtonDisabled}
                className={`${styles["guests__button"]}`}
                disableRipple
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </div>
          </div>
        )
      )}
      <div className={`${styles["guests__button-submit"]}`}>
        <button type="button">NEXT</button>
      </div>
    </div>
  );
}
