import { ChangeEvent, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Image from "next/image";

import { Alert, TextField, useMediaQuery } from "@mui/material";
import {
  formatIncompletePhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

import {
  NATURAL_ESSENCE_PRICE,
  NATURAL_ESSENCE_PRICE_PROMO,
  RITUAL_PRICE,
  RITUAL_PRICE_PROMO,
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

import "react-phone-input-2/lib/material.css";
import styles from "./ReservationsConfirmation.module.scss";

interface ReservationConfirmationProps {
  isError: boolean;
  isValidPhone: boolean;
  setIsValidPhone: React.Dispatch<React.SetStateAction<boolean>>;
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
  isValidPhone,
  setIsValidPhone,
  reservationsPickerInformation,
  formattedUpgradeGuests,
  reservationsConfirmationInformation,
  setReservationsConfirmationInformation,
  caveGuests,
}: ReservationConfirmationProps) {
  const isSmallPhoneViewport = useMediaQuery("(max-width:27.2em)");
  const [isPhoneBlur, setIsPhoneBlur] = useState<boolean>(false);
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
            image: "/images/confirmation-cave.jpg",
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
              spaPricePromo: NATURAL_ESSENCE_PRICE_PROMO,
            }),
            title: "Natural Essence",
            image: "/images/confirmation-natural.jpg",
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
              spaPricePromo: RITUAL_PRICE_PROMO,
            }),
            title: "Maalum Ritual",
            image: "/images/confirmation-ritual.jpg",
          },
        ]
      : []),
  ];

  const isValidPhoneNumber = (
    value: string,
    country: { [key: string]: any }
  ): boolean => {
    try {
      const phoneNumber = parsePhoneNumberFromString(
        value,
        country.iso2.toUpperCase()
      );
      return !!phoneNumber?.isValid();
    } catch (error) {
      return false;
    }
  };

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
          {bookingData.map(({ id, data, title, image }) => (
            <li
              key={id}
              className={`${styles["your-booking__booking-information"]}`}
            >
              <div className={`${styles["your-booking__image-container"]}`}>
                <Image
                  src={image}
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
          {reservationsConfirmationInputs.map(({ id, label, type }) =>
            id === "phone" ? (
              <PhoneInput
                key={id}
                country={"tz"}
                value={reservationsConfirmationInformation[id]}
                onChange={(event) =>
                  setReservationsConfirmationInformation(
                    (prevReservationsConfirmationInformation) => ({
                      ...prevReservationsConfirmationInformation,
                      [id]: event,
                    })
                  )
                }
                onBlur={() => setIsPhoneBlur(true)}
                specialLabel=""
                isValid={
                  isPhoneBlur
                    ? (value, country) => {
                        const isValidNumber = isValidPhoneNumber(
                          value,
                          country
                        );
                        setIsValidPhone(isValidNumber);

                        return isValidNumber;
                      }
                    : true
                }
                inputProps={{
                  name: id,
                  required: true,
                }}
                inputStyle={{
                  fontSize: "14px",
                  border: "1px solid transparent",
                  backgroundColor: defaultTheme.palette.gray.lightMain,
                  borderRadius: ".4rem",
                  width: "100%",
                }}
                enableTerritories
              />
            ) : (
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
                    border:
                      isError && id === "email"
                        ? "1px solid red"
                        : "1px solid transparent",
                    backgroundColor: defaultTheme.palette.gray.lightMain,
                    borderRadius: ".4rem",
                    "&.Mui-focused": {
                      border:
                        isError && id === "email"
                          ? "1px solid red"
                          : `1px solid ${defaultTheme.palette.gray.main}`,
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
            )
          )}
        </div>
        {(isError || !isValidPhone) && (
          <Alert
            sx={{
              marginTop: "2rem",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
            severity="error"
          >
            {!isValidPhone
              ? "Incorrect phone format"
              : "Incorrect email format"}
          </Alert>
        )}
      </div>
    </article>
  );
}
