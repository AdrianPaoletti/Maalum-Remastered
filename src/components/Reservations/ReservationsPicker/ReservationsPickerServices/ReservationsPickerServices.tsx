import { Radio } from "@mui/material";

import { ReservationsPickerInformation } from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import { servicesInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./ReservationsPickerServices.module.scss";

interface ReservationsPickerServicesProps {
  selectedService: string;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPickerServices({
  selectedService,
  setReservationsPickerInformation,
}: ReservationsPickerServicesProps) {
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
      {servicesInformation.map(({ id, title, text }) => (
        <div
          key={id}
          className={`${styles.services__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
          onClick={(): void => handleClick(id)}
        >
          <div className={`${styles["services__text-container"]}`}>
            <p className={`${styles["services__text-title"]} text-secondary`}>
              {title}
            </p>
            <p className={`${styles["services__text-subtitle"]} text-primary`}>
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
              checked={selectedService === id}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
