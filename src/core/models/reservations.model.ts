export interface ReservationsGuestsInformation {
  id: keyof ReservationsGuestsCounter;
  singleTitle: string;
  pluralTitle: string;
  subtitle: string;
  dollarsPrice: number;
  shillingPrice: string;
}

export interface ReservationsGuestsCounter {
  adults: number;
  children: number;
  residents: number;
}

export interface ReservationsSpaCounter {
  naturalEssence: number;
  traditionOfBeauty: number;
  maalumRitual: number;
}

export interface GetBlockedDaysMonthlyRequestBody {
  month: number | undefined;
  year: number | undefined;
}

export interface BlockedDaysHours {
  startDate: Date;
  endDate: Date;
  dates: Date[];
  hours: string[];
  observations: string;
  id: string;
}

export type GetReservationsMonthlyRequestBody =
  GetBlockedDaysMonthlyRequestBody;

export interface Reservation {
  date: Date;
  totalGuests: number;
  service: string;
}

export interface ReservationsPickerInformation
  extends ReservationsGuestsCounter,
    ReservationsSpaCounter {
  totalGuests: number;
  date: Date | null;
}

export interface ReservationsConfirmationInformation {
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string;
}

export interface FormattedReservationsPickerData {
  date: string;
  hour: string;
  guests: string;
  amount: string;
}

export type ReservationStepper =
  | "reservationsPicker"
  | "reservationsUpgrade"
  | "reservationsConfirmation"
  | "reservationsPayment";

export type ConfirmationState = "loading" | "resolved" | "rejected";

export type PostReservationRequestBody = ReservationsPickerInformation &
  ReservationsConfirmationInformation & { client: boolean };
