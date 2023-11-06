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

export interface ReservationsPickerInformation {
  adults: number;
  children: number;
  residents: number;
  date: Date | null;
  service: string;
}

export interface ReservationsConfirmationInformation {
  firstName: string;
  secondName: string;
  phone: number | null;
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
