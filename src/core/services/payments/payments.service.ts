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
  ipnId: string;
}> => {
  try {
    const token = await authPesapalPayment();
    const ipnId = await registerIPNPesapalPayment(token);
    const url = await submitOrderPesapalPayment(token, body, ipnId);
    return { url, ipnId };
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
      {
        url: "http://localhost:8000/reservations/prueba",
        ipn_notification_type: "GET",
      },
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
): Promise<string> => {
  try {
    const {
      data: { redirect_url: redirectUrl },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/Transactions/SubmitOrderRequest`,
      requestBody(body, ipnId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return redirectUrl;
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
) => ({
  id: uuidv4(),
  currency: "USD",
  amount: totalPrice,
  description: "Maalum reservation",
  callback_url: "http://localhost:3000/",
  cancellation_url: "http://localhost:3000/",
  notification_id: ipnId,
  billing_address: {
    email_address: email,
    phone_number: phone,
    first_name: firstName,
    last_name: lastName,
  },
});

export { getURLPesapalPayment };
