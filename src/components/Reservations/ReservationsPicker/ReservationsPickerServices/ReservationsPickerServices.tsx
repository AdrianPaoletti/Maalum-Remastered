import { useEffect, useState } from "react";

import { Radio } from "@mui/material";

import { MAX_DISABLE_CAVE } from "maalum/core/constants/constants";
import {
  Reservation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { dateToUTC } from "maalum/utils/formatters/formatters";
import { servicesInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerServices.module.scss";

interface ReservationsPickerServicesProps {
  reservations: Reservation[];
  selectedService: string;
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerServices({
  reservations,
  selectedService,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerServicesProps) {
  const [isCaveDisabled, setIsCaveDisabled] = useState<boolean>(false);
  const [isSpa, setIsSpa] = useState<boolean>(false);

  useEffect(() => {
    if (reservationsPickerInformation.date) {
      const reservationsMatched = reservations.filter(
        ({ date }) =>
          date.toString() ===
          dateToUTC(reservationsPickerInformation.date as Date).toISOString()
      );
      const totalGuestsReservation = reservationsMatched.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalGuests,
        0
      );
      const isSpaService = reservationsMatched.some(
        ({ service }) => service === "caveAndSpa"
      );

      setIsSpa(isSpaService);
      setIsCaveDisabled(
        totalGuestsReservation >= MAX_DISABLE_CAVE && !isSpaService
      );
    }
  }, [reservations, reservationsPickerInformation.date]);

  const handleClick = (id: string) => {
    if (selectedService === id) {
      return setReservationsPickerInformation(
        (prevReservationsPickerInformation) => ({
          ...prevReservationsPickerInformation,
          service: "",
        })
      );
    }

    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      service: id,
    }));
  };

  return (
    <div className={styles.services}>
      {servicesInformation.map(({ id, title, text }) => {
        const isCaveServiceDisabled = id === "cave" && isCaveDisabled;
        const isSpaServiceDisabled = id === "caveAndSpa" && isSpa;
        const isDisabled = isCaveServiceDisabled || isSpaServiceDisabled;

        return (
          <div
            key={id}
            className={`${styles.services__card} ${
              isDisabled && styles["services__card--disabled"]
            } u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
          >
            <div className={`${styles["services__text-container"]}`}>
              <p
                className={`text-secondary ${
                  isDisabled && "text-secondary--disabled"
                } ${styles["services__text-title"]}`}
              >
                {title}
              </p>
              <p
                className={`text-primary ${
                  isDisabled && "text-primary--disabled"
                } ${styles["services__text-subtitle"]}`}
              >
                {text}
              </p>
            </div>
            <div className={`${styles["services__checkbox"]}`}>
              <Radio
                disableRipple
                sx={{
                  color: defaultTheme.palette.beige.light,
                  padding: 0,
                  "& .MuiSvgIcon-root": { fontSize: 24 },
                  "&.Mui-checked": {
                    color: defaultTheme.palette.beige.light,
                  },
                }}
                onClick={() => handleClick(id)}
                disabled={isDisabled}
                checked={selectedService === id}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
