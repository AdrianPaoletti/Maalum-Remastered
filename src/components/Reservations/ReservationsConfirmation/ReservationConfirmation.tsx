import { ChangeEvent, useRef } from "react";
import Image from "next/image";

import { Alert, TextField, useMediaQuery } from "@mui/material";

import {
  NATURAL_ESSENCE_PRICE,
  RITUAL_PRICE,
} from "maalum/core/constants/constants";
import {
  ReservationsConfirmationInformation,
  ReservationsGuestsCounter,
  ReservationsPickerInformation,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import { defaultTheme } from "maalum/styles/themes";
import {
  formatReservationsPickerData,
  includeInBookingData,
  reservationsConfirmationInputs,
  reservationsPickerData,
  totalPrice,
} from "maalum/utils/reservations/reservationsConfirmation.utils";
import { sumUpgradeGuests } from "maalum/utils/reservations/reservationsUpgrade.util";

import styles from "./ReservationsConfirmation.module.scss";

interface ReservationConfirmationProps {
  isError: boolean;
  reservationsPickerInformation: ReservationsPickerInformation;
  formattedUpgradeGuests: {
    [key in keyof UpgradeGuests]: ReservationsGuestsCounter;
  };
  reservationsConfirmationInformation: ReservationsConfirmationInformation;
  setReservationsConfirmationInformation: React.Dispatch<
    React.SetStateAction<ReservationsConfirmationInformation>
  >;
  caveGuests: ReservationsGuestsCounter;
}

export function ReservationConfirmation({
  isError,
  reservationsPickerInformation,
  formattedUpgradeGuests,
  reservationsConfirmationInformation,
  setReservationsConfirmationInformation,
  caveGuests,
}: ReservationConfirmationProps) {
  const isSmallPhoneViewport = useMediaQuery("(max-width:27.2em)");
  const bookingData = [
    ...(Object.values(caveGuests).some((guests) => guests)
      ? [
          {
            id: "cave",
            data: formatReservationsPickerData({
              ...reservationsPickerInformation,
              ...caveGuests,
            }),
            title: "Maalum cave",
          },
        ]
      : []),
    ...(includeInBookingData(formattedUpgradeGuests.naturalEssence)
      ? [
          {
            id: "naturalEssence",
            data: formatReservationsPickerData({
              ...formattedUpgradeGuests.naturalEssence,
              date: reservationsPickerInformation.date,
              spaPrice: NATURAL_ESSENCE_PRICE,
            }),
            title: "Natural Essence",
          },
        ]
      : []),
    ...(includeInBookingData(formattedUpgradeGuests.maalumRitual)
      ? [
          {
            id: "maalumRitual",
            data: formatReservationsPickerData({
              ...formattedUpgradeGuests.maalumRitual,
              date: reservationsPickerInformation.date,
              spaPrice: RITUAL_PRICE,
            }),
            title: "Maalum Ritual",
          },
        ]
      : []),
  ];

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
        <ul>
          {bookingData.map(({ id, data, title }) => (
            <li
              key={id}
              className={`${styles["your-booking__booking-information"]}`}
            >
              <div className={`${styles["your-booking__image-container"]}`}>
                <Image
                  src={"/images/instagram-1.jpg"}
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
                  {title}
                </h5>
                <div
                  className={`${styles["your-booking__booking-data-block-container"]}`}
                >
                  <div
                    className={`${styles["your-booking__booking-data-block"]}`}
                  >
                    {reservationsPickerData.map(
                      ({ id, title }) =>
                        data[id] && <span key={id}>{title}:</span>
                    )}
                  </div>
                  <div
                    className={`${styles["your-booking__booking-data-block"]}`}
                  >
                    {reservationsPickerData.map(
                      ({ id, fontWeight }) =>
                        data[id] && (
                          <p
                            key={id}
                            style={{
                              fontWeight,
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              overflow: "clip",
                              maxWidth:
                                id === "guests" && isSmallPhoneViewport
                                  ? "80px"
                                  : "auto",
                            }}
                          >
                            {data[id]}
                          </p>
                        )
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
          <li className={`${styles["your-booking__booking-information"]}`}>
            <h5
              className={`${styles["your-booking__booking-data-title"]} heading-cuaternary`}
              style={{
                fontWeight: 600,
                width: "100%",
                textAlign: "right",
                marginTop: ".5rem",
              }}
            >
              Total <span>{reservationsPickerInformation.totalPrice}$</span>
            </h5>
          </li>
        </ul>
      </div>
      <span className={`${styles["reservations-confirmation__space"]}`} />
      <div className={`${styles["contact-information"]}`}>
        <h5
          className={`${styles["reservations-confirmation__sub-title"]} u-padding-top-medium heading-cuaternary`}
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
