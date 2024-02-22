import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, useMediaQuery } from "@mui/material";

import {
  ReservationsGuestsCounter,
  ReservationsPickerInformation,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { reservationsGuestsInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerGuests.module.scss";

interface ReservationsPickerGuestsProps {
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  upgradeGuests: UpgradeGuests;
}

export function ReservationsPickerGuests({
  reservationsPickerInformation,
  setReservationsPickerInformation,
  upgradeGuests,
}: ReservationsPickerGuestsProps) {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const isDisabled =
      reservationsPickerInformation.totalGuests >= 10 ? true : false;
    setIsButtonDisabled(isDisabled);
  }, [reservationsPickerInformation.totalGuests]);

  const handlePlus = (id: keyof ReservationsGuestsCounter) => {
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] + 1,
      totalGuests: prevReservationsPickerInformation.totalGuests + 1,
      date: null,
    }));
    Object.keys(upgradeGuests).forEach((key) =>
      upgradeGuests[key as keyof UpgradeGuests].clear()
    );
  };

  const handleMinus = (id: keyof ReservationsGuestsCounter) => {
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] - 1,
      totalGuests: prevReservationsPickerInformation.totalGuests - 1,
      date: null,
    }));
    Object.keys(upgradeGuests).forEach((key) =>
      upgradeGuests[key as keyof UpgradeGuests].clear()
    );
  };

  return (
    <form className={`${styles.guests} u-padding-vertical-small-medium`}>
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
                disabled={isButtonDisabled}
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
    </form>
  );
}
