import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, useMediaQuery } from "@mui/material";

import {
  ReservationsGuestsCounter,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { reservationsGuestsInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerGuests.module.scss";

interface ReservationsPickerGuestsProps {
  submit: () => void;
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerGuests({
  submit,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerGuestsProps) {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  const totalGuests = reservationsGuestsInformation
    .map(({ id }) => reservationsPickerInformation[id])
    .reduce((accumulator, currentValue) => accumulator + currentValue);
  const isButtonPlusDisabled = totalGuests >= 10 ? true : false;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      totalGuests,
    }));
    submit();
  };

  const handlePlus = (id: keyof ReservationsGuestsCounter) =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] + 1,
      service: [],
      date: null,
    }));

  const handleMinus = (id: keyof ReservationsGuestsCounter) =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] - 1,
    }));

  return (
    <article className={`${styles["guests-container__card"]}`}>
      <div
        className={`${styles["guests-container__service"]} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
      >
        <div className={`${styles["guests-container__text-container"]}`}>
          <p
            className={`text-secondary ${styles["guests-container__text-title"]}`}
          >
            {"Maalum Cave"}
          </p>
          <p
            className={`text-primary ${styles["guests-container__text-subtitle"]}`}
          >
            {"Lorem ipsum ergo ipsum"}
          </p>
        </div>
      </div>
      <form className={`${styles.guests}`} onSubmit={handleSubmit}>
        {reservationsGuestsInformation.map(
          ({
            id,
            pluralTitle,
            singleTitle,
            subtitle,
            dollarsPrice,
            shillingPrice,
          }) => {
            return (
              <div
                key={id}
                className={`${styles.guests__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
              >
                <div className={`${styles["guests__text-container"]}`}>
                  <p className={`${styles["guests__text-title"]}`}>
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
                  <p className={`${styles["guests__text-subtitle"]}`}>
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
                    onClick={() => handleMinus(id)}
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
                    onClick={() => handlePlus(id)}
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
            );
          }
        )}
        <div className={`${styles["guests__button-submit-container"]}`}>
          <button
            className={`${styles["guests__button-submit"]} ${
              !totalGuests && styles["guests__button-submit--disabled"]
            }`}
            disabled={!totalGuests}
            type="submit"
          >
            CONTINUE
          </button>
        </div>
      </form>
    </article>
  );
}
