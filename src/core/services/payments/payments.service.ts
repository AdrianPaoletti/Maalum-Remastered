import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import {
  ReservationsConfirmationInformation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";

const getURLPesapalPayment = async (
  body: ReservationsPickerInformation & ReservationsConfirmationInformation
): Promise<{
  url: string;
  orderTrackingId: string;
  token: string;
}> => {
  try {
    const token = await authPesapalPayment();
    const ipnId = await registerIPNPesapalPayment(token);
    const { url, orderTrackingId } = await submitOrderPesapalPayment(
      token,
      body,
      ipnId
    );
    return { url, orderTrackingId, token };
  } catch (error) {
    throw error;
  }
};

const authPesapalPayment = async (): Promise<string> => {
  try {
    const {
      data: { token },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/Auth/RequestToken`,
      {
        consumer_key: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_KEY_TEST,
        consumer_secret: process.env.NEXT_PUBLIC_PESAPAL_CONSUMER_SECRET_TEST,
      }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

const registerIPNPesapalPayment = async (token: string): Promise<string> => {
  try {
    const {
      data: { ipn_id: ipnId },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/URLSetup/RegisterIPN`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return ipnId;
  } catch (error) {
    throw error;
  }
};

const submitOrderPesapalPayment = async (
  token: string,
  body: ReservationsPickerInformation & ReservationsConfirmationInformation,
  ipnId: string
): Promise<{ url: string; orderTrackingId: string }> => {
  try {
    const {
      data: { redirect_url: url, order_tracking_id: orderTrackingId },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/Transactions/SubmitOrderRequest`,
      requestBody(body, ipnId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { url, orderTrackingId };
  } catch (error) {
    throw error;
  }
};

const getTransactionStatus = async (orderTrackingId: string, token: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/Transactions/GetTransactionStatus`,
      {
        params: { orderTrackingId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

const requestBody = (
  {
    totalPrice,
    email,
    phone,
    firstName,
    lastName,
  }: ReservationsPickerInformation & ReservationsConfirmationInformation,
  ipnId: string
) => {
  return {
    id: uuidv4(),
    currency: "USD",
    amount: totalPrice,
    description: "Maalum reservation",
    callback_url: "https://maalum-remastered.vercel.app/",
    cancellation_url: "https://maalum-remastered.vercel.app/",
    notification_id: ipnId,
    billing_address: {
      email_address: email,
      phone_number: phone,
      first_name: firstName,
      last_name: lastName,
    },
  };
};

export { getURLPesapalPayment, getTransactionStatus };
