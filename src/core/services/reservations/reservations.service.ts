import axios from "axios";

import {
  BlockedDaysHours,
  GetBlockedDaysMonthlyRequestBody,
} from "maalum/core/models/reservations.model";

const getBlockedDaysMonthly = async (
  requestBody: GetBlockedDaysMonthlyRequestBody
): Promise<BlockedDaysHours[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_RAILWAY}/days/blocked-monthly`,
      {
        params: requestBody,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { getBlockedDaysMonthly };
