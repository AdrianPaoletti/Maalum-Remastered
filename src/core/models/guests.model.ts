export interface GuestsInformation {
  id: keyof GuestsCounter;
  singleTitle: string;
  pluralTitle: string;
  subtitle: string;
  dollarsPrice: number;
  shillingPrice: string;
}

export interface GuestsCounter {
  adults: number;
  children: number;
  residents: number;
}
