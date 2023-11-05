import {
  ADULTS_PRICE,
  CHILDREN_PRICE,
  RESIDENTS_PRICE,
} from "maalum/core/constants/constants";
import {
  FormattedReservationsPickerData,
  ReservationsConfirmationInformation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";

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
    id: "secondName",
    label: "SECOND NAME",
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
    id: "hour",
    title: "HOUR",
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
}: ReservationsPickerInformation): FormattedReservationsPickerData => ({
  date: date?.toLocaleString().split(",")[0] || "",
  hour:
    date?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "",
  guests: `${!!adults ? `${adults} ${adults === 1 ? "adult" : "adults"}` : ""}${
    !!children
      ? `${!!adults ? "," : ""} ${children} ${
          children === 1 ? "child" : "children"
        }`
      : ""
  }${
    !!residents
      ? `${!!adults || !!children ? "," : ""} ${residents} ${
          residents === 1 ? "resident" : "residents"
        }`
      : ""
  }`,
  amount: `${
    adults * ADULTS_PRICE +
    children * CHILDREN_PRICE +
    residents * RESIDENTS_PRICE
  }$`,
});

export {
  reservationsConfirmationInputs,
  reservationsPickerData,
  formatReservationsPickerData,
};
