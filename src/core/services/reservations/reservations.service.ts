import axios from "axios";

import {
  BlockedDaysHours,
  ReservationsMonthlyBlockedDaysQuery,
} from "maalum/core/models/reservations.model";

const getBlockedDaysMonthly = async (
  bodyParams: ReservationsMonthlyBlockedDaysQuery
): Promise<BlockedDaysHours[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_RAILWAY}/days/blocked-monthly`,
      {
        params: bodyParams,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { getBlockedDaysMonthly };
