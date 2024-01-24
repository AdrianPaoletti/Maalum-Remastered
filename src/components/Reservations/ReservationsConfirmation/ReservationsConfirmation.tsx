import { ChangeEvent } from "react";
import Image from "next/image";

import { Alert, TextField, useMediaQuery } from "@mui/material";

import {
  ReservationsConfirmationInformation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import {
  formatReservationsPickerData,
  reservationsConfirmationInputs,
  reservationsPickerData,
} from "maalum/utils/reservations/reservationsConfirmation.utils";

import styles from "./ReservationsConfirmation.module.scss";

interface ReservationConfirmationProps {
  isError: boolean;
  reservationsPickerInformation: ReservationsPickerInformation;
  reservationsConfirmationInformation: ReservationsConfirmationInformation;
  setReservationsConfirmationInformation: React.Dispatch<
    React.SetStateAction<ReservationsConfirmationInformation>
  >;
}

export function ReservationConfirmation({
  isError,
  reservationsPickerInformation,
  reservationsConfirmationInformation,
  setReservationsConfirmationInformation,
}: ReservationConfirmationProps) {
  const isSmallPhoneViewport = useMediaQuery("(max-width:27.2em)");
  const formattedReservationsPickerData = formatReservationsPickerData(
    reservationsPickerInformation
  );
  const { service } = reservationsPickerInformation;

  const handleChange = (
    { target: { value } }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: keyof ReservationsConfirmationInformation
  ) =>
    setReservationsConfirmationInformation(
      (prevReservationsConfirmationInformation) => ({
        ...prevReservationsConfirmationInformation,
        [id]: value,
      })
    );

  return (
    <article className={`${styles["reservations-confirmation"]}`}>
      <div className={`${styles["your-booking"]}`}>
        <h5
          className={`${styles["reservations-confirmation__sub-title"]} heading-cuaternary`}
        >
          YOUR BOOKING
        </h5>
        <div className={`${styles["your-booking__booking-information"]}`}>
          <div className={`${styles["your-booking__image-container"]}`}>
            <Image
              src={
                service === "cave"
                  ? "/images/instagram-1.jpg"
                  : "/images/instagram-2.jpg"
              }
              alt="booking-swimming-cave"
              width={isSmallPhoneViewport ? 180 / 1.35 : 180}
              height={isSmallPhoneViewport ? 120 / 1.35 : 120}
              sizes="50vw"
            />
          </div>
          <div className={`${styles["your-booking__booking-data"]}`}>
            <h5
              className={`${styles["your-booking__booking-data-title"]} heading-cuaternary`}
              style={{ fontWeight: 600 }}
            >
              {`Maalum ${"Cave"}`}
            </h5>
            <div
              className={`${styles["your-booking__booking-data-block-container"]}`}
            >
              <div className={`${styles["your-booking__booking-data-block"]}`}>
                {reservationsPickerData.map(({ id, title }) => (
                  <span key={id}>{title}:</span>
                ))}
              </div>
              <div className={`${styles["your-booking__booking-data-block"]}`}>
                {reservationsPickerData.map(({ id, fontWeight }) => (
                  <p
                    key={id}
                    style={{
                      fontWeight,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formattedReservationsPickerData[id]}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles["contact-information"]}`}>
        <h5
          className={`${styles["reservations-confirmation__sub-title"]} u-padding-top-large heading-cuaternary`}
        >
          CONTACT INFORMATION
        </h5>
        <div className={`${styles["contact-information__inputs-container"]}`}>
          {reservationsConfirmationInputs.map(({ id, label, type }) => (
            <TextField
              key={id}
              label={label}
              type={type || "text"}
              variant="filled"
              value={reservationsConfirmationInformation[id] || ""}
              onChange={(event) => handleChange(event, id)}
              required
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: "14px",
                  border: "1px solid transparent",
                  backgroundColor: defaultTheme.palette.gray.lightMain,
                  borderRadius: ".4rem",
                  "&.Mui-focused": {
                    border: `1px solid ${defaultTheme.palette.gray.main}`,
                  },
                },
              }}
              InputLabelProps={{
                style: {
                  color: defaultTheme.palette.gray.main,
                  letterSpacing: "1.5px",
                  fontSize: "11px",
                  paddingTop: "4px",
                  border: "none",
                },
              }}
            />
          ))}
        </div>
        {isError && (
          <Alert
            sx={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
            severity="error"
          >
            Incorrect email format
          </Alert>
        )}
      </div>
    </article>
  );
}
