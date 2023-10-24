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

export interface ReservationsMonthlyBlockedDaysQuery {
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
