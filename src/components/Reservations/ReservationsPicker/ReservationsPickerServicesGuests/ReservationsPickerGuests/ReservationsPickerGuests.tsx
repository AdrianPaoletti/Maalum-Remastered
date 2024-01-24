import { useEffect, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, useMediaQuery } from "@mui/material";

import {
  ReservationsPickerInformation,
  ReservationsServiceInformation,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { reservationsGuestsInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerGuests.module.scss";

interface ReservationsPickerGuestsProps {
  // handleSubmit: (totalGuests: number) => void;
  serviceSelected: string;
  serviceInformation: ReservationsServiceInformation[];
  setServiceInformation: React.Dispatch<
    React.SetStateAction<ReservationsServiceInformation[]>
  >;
  // isOpen: boolean;
}

export function ReservationsPickerGuests({
  // handleSubmit,
  serviceSelected,
  serviceInformation,
  setServiceInformation,
}: // isOpen,
ReservationsPickerGuestsProps) {
  const isSmallPhoneViewPort = useMediaQuery("(max-width:27.2em)");
  // const [totalGuests, setTotalGuests] = useState<number>(0);
  // const [isButtonPlusDisabled, setIsButtonPlusDisabled] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   const totalGuests = Object.values(reservationsPickerInformation)
  //     .splice(0, 3)
  //     .reduce((accumulator, currentValue) => accumulator + currentValue);
  //   setIsButtonPlusDisabled(totalGuests === 10 ? true : false);
  //   setTotalGuests(totalGuests);
  // }, [reservationsPickerInformation, setReservationsPickerInformation]);

  return (
    <form
      className={`${styles.guests}`}
      // onSubmit={(event) => {
      //   event.preventDefault();
      //   handleSubmit(totalGuests);
      // }}
    >
      {reservationsGuestsInformation.map(
        ({
          id,
          pluralTitle,
          singleTitle,
          subtitle,
          dollarsPrice,
          shillingPrice,
        }) => {
          const service = serviceInformation.find(
            ({ id }) => id === serviceSelected
          );
          return (
            <div
              key={id}
              className={`${styles.guests__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
            >
              <div className={`${styles["guests__text-container"]}`}>
                <p className={`${styles["guests__text-title"]}`}>
                  {!service || service[id] > 1 || !service[id]
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
                  onClick={() => {
                    !!service?.[id] &&
                      setServiceInformation((prevServiceInformation) => ({
                        ...prevServiceInformation,
                        [id]: prevServiceInformation[id] - 1,
                      }));
                  }}
                  // disabled={!reservationsPickerInformation[id]}
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
                  0{/* {reservationsPickerInformation[id]} */}
                </span>
                <IconButton
                  onClick={() => {
                    // setReservationsPickerInformation(
                    //   (prevReservationsPickerInformation) => ({
                    //     ...prevReservationsPickerInformation,
                    //     [id]: prevReservationsPickerInformation[id] + 1,
                    //     service: [],
                    //     date: null,
                    //   })
                    // );
                  }}
                  // disabled={isButtonPlusDisabled}
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
    </form>
  );
}
