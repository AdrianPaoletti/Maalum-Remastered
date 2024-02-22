import {
  ADULTS_PRICE,
  CHILDREN_PRICE,
  RESIDENTS_PRICE,
} from "maalum/core/constants/constants";
import {
  FormattedReservationsPickerData,
  ReservationsConfirmationInformation,
  ReservationsGuestsCounter,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import { getHour } from "./reservationsUpgrade.util";

const reservationsConfirmationInputs: {
  id: keyof ReservationsConfirmationInformation;
  label: string;
  type?: string;
}[] = [
  {
    id: "firstName",
    label: "FIRST NAME",
  },
  {
    id: "lastName",
    label: "LAST NAME",
  },
  {
    id: "email",
    label: "EMAIL",
    type: "email",
  },
  {
    id: "phone",
    label: "PHONE NUMBER",
    type: "number",
  },
];

const reservationsPickerData: {
  id: keyof FormattedReservationsPickerData;
  title: string;
  fontWeight?: number;
}[] = [
  {
    id: "date",
    title: "DATE",
  },
  {
    id: "caveHour",
    title: "CAVE HOUR",
  },
  {
    id: "spaHour",
    title: "SPA HOUR",
  },
  {
    id: "guests",
    title: "GUESTS",
  },
  {
    id: "amount",
    title: "AMOUNT",
    fontWeight: 600,
  },
];

const formatReservationsPickerData = ({
  date,
  adults,
  children,
  residents,
  spaPrice,
}: ReservationsGuestsCounter & {
  date: Date | null;
  spaPrice?: number;
}): FormattedReservationsPickerData => {
  const adultsText = `${
    !!adults ? `${adults} ${adults === 1 ? "adult" : "adults"}` : ""
  }`;
  const childrenText = `${
    !!children
      ? `${!!adults ? "," : ""} ${children} ${
          children === 1 ? "child" : "children"
        }`
      : ""
  }`;
  const residentsText = `${
    !!residents
      ? `${!!adults || !!children ? "," : ""} ${residents} ${
          residents === 1 ? "resident" : "residents"
        }`
      : ""
  }`;
  const totalGuests = adults + children + residents;
  const hour = date?.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const hourSpa = getHour(hour as string);

  return {
    date: date?.toLocaleString().split(",")[0] || "",
    caveHour: hour || "",
    ...(spaPrice && { spaHour: hourSpa || "" }),
    guests: `${adultsText}${childrenText}
  ${!!adults && !!children && !!residents ? "..." : `${residentsText}`}`,
    amount: spaPrice
      ? `${(spaPrice as number) * totalGuests}$`
      : `${
          adults * ADULTS_PRICE +
          children * CHILDREN_PRICE +
          residents * RESIDENTS_PRICE
        }$`,
  };
};

const includeInBookingData = (guests: ReservationsGuestsCounter) =>
  Object.values(guests).some((value) => value);

export {
  reservationsConfirmationInputs,
  reservationsPickerData,
  formatReservationsPickerData,
  includeInBookingData,
};
