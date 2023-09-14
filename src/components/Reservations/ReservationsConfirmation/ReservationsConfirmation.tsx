import Image from "next/image";

import { TextField } from "@mui/material";

import styles from "./ReservationsConfirmation.module.scss";

interface ReservationConfirmationProps {
  isPhoneViewport: boolean;
}

export function ReservationConfirmation({
  isPhoneViewport,
}: ReservationConfirmationProps) {
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

  return (
    <article className={`${styles["reservations-confirmation"]}`}>
      <div className={`${styles["reservations-confirmation__your-booking"]}`}>
        <h5
          className={`${styles["reservations-confirmation__sub-title"]} heading-cuaternary`}
        >
          YOUR BOOKING
        </h5>
        <div
          className={`${styles["reservations-confirmation__booking-information"]}`}
        >
          <div
            className={`${styles["reservations-confirmation__image-container"]}`}
          >
            <Image
              src={"/images/instagram-1.jpg"}
              alt="booking-swimming-cave"
              width={180}
              height={120}
              sizes="50vw"
            />
          </div>
          <div
            className={`${styles["reservations-confirmation__booking-data"]}`}
          >
            <h5
              className={`${styles["reservations-confirmation__booking-data-title"]} heading-cuaternary`}
              style={{ fontWeight: 600 }}
            >
              Maalum Cave
            </h5>
            <div
              className={`${styles["reservations-confirmation__booking-data-block-container"]}`}
            >
              <div
                className={`${styles["reservations-confirmation__booking-data-block"]}`}
              >
                {bookingData.map(({ id, title }) => (
                  <span key={id}>{title}:</span>
                ))}
              </div>
              <div
                className={`${styles["reservations-confirmation__booking-data-block"]}`}
              >
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
      <div>
        <h5
          className={`${styles["reservations-confirmation__sub-title"]} u-padding-top-large heading-cuaternary`}
        >
          CONTACT INFORMATION
        </h5>
        <div>
          <TextField label="FIRST NAME" variant="filled" />
        </div>
      </div>
    </article>
  );
}
