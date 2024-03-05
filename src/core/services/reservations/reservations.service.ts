import axios from "axios";

import {
  BlockedDaysHours,
  GetBlockedDaysMonthlyRequestBody,
  GetReservationsMonthlyRequestBody,
  PostReservationRequestBody,
  Reservation,
} from "maalum/core/models/reservations.model";

const getBlockedDaysMonthly = async (
  requestBody: GetBlockedDaysMonthlyRequestBody
): Promise<BlockedDaysHours[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_RAILWAY_REMASTERED}/days/blocked-monthly`,
      {
        params: requestBody,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const getReservationsMonthly = async (
  requestBody: GetReservationsMonthlyRequestBody
): Promise<Reservation[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_RAILWAY_REMASTERED}/reservations`,
      {
        params: requestBody,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const postReservation = async (
  requestBody: PostReservationRequestBody
): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_RAILWAY_REMASTERED}/reservations`,
      requestBody
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { getBlockedDaysMonthly, getReservationsMonthly, postReservation };
