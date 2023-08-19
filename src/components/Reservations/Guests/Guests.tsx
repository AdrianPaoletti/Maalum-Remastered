import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

import { GuestsCounter } from "maalum/core/models/guests.model";
import { guestsInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./Guests.module.scss";

export function Guests() {
  const [guestsCounter, setGuestsCounter] = useState<GuestsCounter>({
    adults: 0,
    children: 0,
    residents: 0,
  });

  return (
    <div className={styles.guests}>
      {guestsInformation.map(
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
                {guestsCounter[id] > 1 || !guestsCounter[id]
                  ? pluralTitle
                  : singleTitle}
                <span className="text-terciary">
                  {` - ${dollarsPrice}$ | ${shillingPrice}tsh pp`}
                </span>
              </p>
              <p className={`${styles["guests__text-subtitle"]} text-primary`}>
                {subtitle}
              </p>
            </div>
            <div className={`${styles["guests__counter"]}`}>
              <IconButton
                onClick={() => {
                  !!guestsCounter[id] &&
                    setGuestsCounter((prevGuestsCounter) => ({
                      ...prevGuestsCounter,
                      [id]: prevGuestsCounter[id] - 1,
                    }));
                }}
                className={`${styles["guests__button"]}`}
                disableRipple
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
              <span className={`${styles["guests__count"]}`}>
                {guestsCounter[id]}
              </span>
              <IconButton
                onClick={() => {
                  setGuestsCounter((prevGuestsCounter) => ({
                    ...prevGuestsCounter,
                    [id]: prevGuestsCounter[id] + 1,
                  }));
                }}
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
