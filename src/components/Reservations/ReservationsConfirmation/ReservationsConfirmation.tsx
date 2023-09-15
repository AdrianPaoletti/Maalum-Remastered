import Image from "next/image";

import { TextField, useMediaQuery } from "@mui/material";

import styles from "./ReservationsConfirmation.module.scss";

interface ReservationConfirmationProps {
  isPhoneViewport: boolean;
}

export function ReservationConfirmation({
  isPhoneViewport,
}: ReservationConfirmationProps) {
  const isSmallPhoneViewport = useMediaQuery("(max-width:27.2em)");
  const bookingData = [
    {
      id: "date",
      title: "DATE",
      value: "22/11/2023",
    },
    {
      id: "hour",
      title: "HOUR",
      value: "15:00",
    },
    {
      id: "guests",
      title: "GUESTS",
      value: "2 adults, 1 child",
    },
    {
      id: "amount",
      title: "AMOUNT",
      value: "$40",
      fontWeight: 600,
    },
  ];

  const bookingConfirmationInputs = [
    {
      id: "firstName",
      label: "FIRST NAME",
    },
    {
      id: "secondName",
      label: "SECOND NAME",
    },
    {
      id: "email",
      label: "EMAIL",
    },
    {
      id: "phoneNumber",
      label: "PHONE NUMBER",
    },
  ];

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
              src={"/images/instagram-1.jpg"}
              alt="booking-swimming-cave"
              width={isSmallPhoneViewport ? 180 / 1.25 : 180}
              height={isSmallPhoneViewport ? 120 / 1.25 : 120}
              sizes="50vw"
            />
          </div>
          <div className={`${styles["your-booking__booking-data"]}`}>
            <h5
              className={`${styles["your-booking__booking-data-title"]} heading-cuaternary`}
              style={{ fontWeight: 600 }}
            >
              Maalum Cave
            </h5>
            <div
              className={`${styles["your-booking__booking-data-block-container"]}`}
            >
              <div className={`${styles["your-booking__booking-data-block"]}`}>
                {bookingData.map(({ id, title }) => (
                  <span key={id}>{title}:</span>
                ))}
              </div>
              <div className={`${styles["your-booking__booking-data-block"]}`}>
                {bookingData.map(({ id, value, fontWeight }) => (
                  <p key={id} style={{ fontWeight }}>
                    {value}
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
          {bookingConfirmationInputs.map(({ id, label }) => (
            <TextField
              key={id}
              label={label}
              variant="filled"
              sx={{
                ".Mui-focused": {
                  border: "1px solid #737373",
                },
              }}
              InputProps={{
                disableUnderline: true,
                style: {
                  fontSize: "13px",
                  backgroundColor: "#f0f2f4",
                  borderRadius: ".4rem",
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#737373",
                  letterSpacing: "1.5px",
                  paddingTop: "4px",
                  border: "none",
                },
              }}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
