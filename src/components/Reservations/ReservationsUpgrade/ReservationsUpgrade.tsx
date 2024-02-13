import Image from "next/image";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";

import {
  ReservationsPickerInformation,
  ReservationStepper,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import {
  cardElements,
  getHour,
} from "maalum/utils/reservations/reservationsUpgrade.util";
import Calendar from "../../../../public/svgs/calendar.svg";
import Guests from "../../../../public/svgs/guests.svg";

import styles from "./ReservationsUpgrade.module.scss";

interface ReservationsUpgradeProps {
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  setReservationStepper: React.Dispatch<
    React.SetStateAction<ReservationStepper>
  >;
}

export function ReservationsUpgrade({
  reservationsPickerInformation,
  setReservationsPickerInformation,
  setReservationStepper,
}: ReservationsUpgradeProps) {
  const hour = reservationsPickerInformation.date?.toLocaleTimeString("es-ES", {
    hour: "numeric",
    minute: "2-digit",
  });
  const totalUpgradeGuests = cardElements.reduce(
    (accum, { id }) => accum + reservationsPickerInformation[id],
    0
  );
  const buttonPlusDisabled =
    totalUpgradeGuests >= reservationsPickerInformation.totalGuests;

  const navbarElements: {
    id: "date" | "totalGuests";
    icon: React.ReactNode;
    formatValue?: (value: Date) => string;
  }[] = [
    {
      id: "date",
      icon: <Calendar />,
      formatValue: (date: Date) =>
        date?.toLocaleDateString("es-ES", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
    },
    {
      id: "totalGuests",
      icon: <Guests />,
    },
  ];

  const handlePlus = (id: "naturalEssence" | "maalumRitual") =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] + 1,
    }));

  const handleMinus = (id: "naturalEssence" | "maalumRitual") =>
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      [id]: prevReservationsPickerInformation[id] - 1,
    }));

  return (
    <div className={styles["reservations-upgrade"]}>
      <nav
        className={`${styles["reservations-upgrade__navbar"]}`}
        onClick={() => setReservationStepper("reservationsPicker")}
      >
        {navbarElements.map(({ id, icon, formatValue }) => {
          const value = formatValue
            ? formatValue(reservationsPickerInformation[id] as Date)
            : reservationsPickerInformation[id];

          return (
            <div
              key={id}
              className={`${styles["reservations-upgrade__navbar-info"]}`}
            >
              {icon}
              <p className={"text-primary"}>{value?.toString()}</p>
            </div>
          );
        })}
      </nav>
      <ul className={`${styles["reservations-upgrade__cards"]}`}>
        {cardElements.map(({ id, title, price, description }) => {
          const hourSpa = getHour(hour ?? "");
          const disableHour = hourSpa === "SOLD OUT";

          return (
            <li key={id} className={`${styles["reservations-upgrade__card"]}`}>
              <div
                className={`${styles["reservations-upgrade__image-container"]}`}
              >
                <Image
                  src="/images/restaurant-main.jpg"
                  alt="fotos"
                  layout="fill"
                  objectFit="cover"
                  style={{
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                  }}
                />
              </div>
              <div className={`${styles["reservations-upgrade__info"]}`}>
                <div className={`${styles["reservations-upgrade__titles"]}`}>
                  <h4 className={`${styles["reservations-upgrade__title"]}`}>
                    {title}
                  </h4>
                  <div className={`${styles["reservations-upgrade__price"]}`}>
                    <p>
                      For{" "}
                      <span>
                        {` ${price}`}$ | {price * 2}
                        ,000tsh
                      </span>
                    </p>
                    <p>Includes cave and spa</p>
                  </div>
                </div>
                <p className={`${styles["reservations-upgrade__description"]}`}>
                  {description}
                </p>
                <div className={`${styles["reservations-upgrade__guests"]}`}>
                  <span
                    className={`${styles["reservations-upgrade__hour"]} ${
                      disableHour &&
                      styles["reservations-upgrade__hour--disabled"]
                    }`}
                  >
                    {hourSpa}
                  </span>
                  <div className={`${styles["reservations-upgrade__counter"]}`}>
                    <IconButton
                      onClick={() => handleMinus(id)}
                      disabled={
                        !reservationsPickerInformation[id] || disableHour
                      }
                      className={`${styles["reservations-upgrade__button"]}`}
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
                    <span
                      className={`${styles["reservations-upgrade__count"]}`}
                    >
                      {reservationsPickerInformation[id]}
                    </span>
                    <IconButton
                      onClick={() => handlePlus(id)}
                      disabled={buttonPlusDisabled || disableHour}
                      className={`${styles["reservations-upgrade__button"]}`}
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
