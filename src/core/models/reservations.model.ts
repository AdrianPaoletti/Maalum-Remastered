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

export interface ReservationsPickerInformation {
  totalGuests: number;
  date: Date | null;
  service: string[];
}

export interface ReservationsServiceInformation
  extends ReservationsGuestsCounter {
  id: string;
  type: string;
  totalGuests: number;
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

export interface ReservationsPickerSubmited {
  guests: boolean;
  dates: boolean;
  services: boolean;
}

export type ConfirmationState = "loading" | "resolved" | "rejected";

export type PostReservationRequestBody = ReservationsPickerInformation &
  ReservationsConfirmationInformation & { client: boolean };
