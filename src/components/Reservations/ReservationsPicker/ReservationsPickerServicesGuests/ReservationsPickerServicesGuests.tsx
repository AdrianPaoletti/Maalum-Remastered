import { useEffect, useState } from "react";

import { Collapse, Radio } from "@mui/material";

import { MAX_DISABLE_CAVE } from "maalum/core/constants/constants";
import {
  Reservation,
  ReservationsPickerInformation,
  ReservationsServiceInformation,
} from "maalum/core/models/reservations.model";
import { dateToUTC } from "maalum/utils/formatters/formatters.utils";
import { servicesInformation } from "maalum/utils/reservations/reservations.utils";
import { ReservationsPickerGuests } from "./ReservationsPickerGuests/ReservationsPickerGuests";

import styles from "./ReservationsPickerServicesGuests.module.scss";

interface ReservationsPickerServicesGuestsProps {
  reservations: Reservation[];
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerServicesGuests({
  reservations,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerServicesGuestsProps) {
  const [isCaveDisabled, setIsCaveDisabled] = useState<boolean>(false);
  const [isSpa, setIsSpa] = useState<boolean>(false);
  const [serviceSelected, setServiceSelected] = useState<string>("");
  const [serviceInformation, setServiceInformation] = useState<
    ReservationsServiceInformation[]
  >([]);
  const { date: reservationsPickerDate } = reservationsPickerInformation;

  useEffect(() => {
    if (reservationsPickerDate) {
      const reservationsMatched = reservations.filter(
        ({ date }) =>
          date.toString() ===
          dateToUTC(reservationsPickerDate as Date).toISOString()
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
  }, [reservations, reservationsPickerDate]);

  const handleClick = (id: string) => {
    setServiceSelected((prevServiceSelected) =>
      prevServiceSelected === id ? "" : id
    );
  };

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

  return (
    <section className={styles.services}>
      {servicesInformation.map(({ id, title, text }) => {
        const isCaveServiceDisabled = id === "cave" && isCaveDisabled;
        const isSpaServiceDisabled = id === "caveAndSpa" && isSpa;
        const isDisabled = isCaveServiceDisabled || isSpaServiceDisabled;

        return (
          <article
            key={id}
            className={`${styles.services__card} ${
              isDisabled && styles["services__card--disabled"]
            }`}
          >
            <div
              className={`${styles.services__service} ${
                isDisabled && styles["services__service--disabled"]
              } u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
              onClick={() => handleClick(id)}
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
              {/* <div className={`${styles["services__checkbox"]}`}>
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
                  checked={reservationsPickerService.includes(id)}
                />
              </div> */}
            </div>
            <Collapse in={serviceSelected === id}>
              <ReservationsPickerGuests
                serviceSelected={serviceSelected}
                serviceInformation={serviceInformation}
                setServiceInformation={setServiceInformation}
                // isOpen={serviceSelected === id}
              />
            </Collapse>
          </article>
        );
      })}
    </section>
  );
}
