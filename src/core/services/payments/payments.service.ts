import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const getURLPesapalPayment = async (): Promise<string> => {
  try {
    const token = await authPesapalPayment();
    const ipnId = await registerIPNPesapalPayment(token);
    const url = await submitOrderPesapalPayment(token, ipnId);
    return url;
  } catch (error) {
    console.log(error);
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
        ipn_notification_type: "POST",
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
  ipnId: string
): Promise<string> => {
  try {
    const {
      data: { redirect_url: redirectUrl },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_PESAPAL_API_TEST}/Transactions/SubmitOrderRequest`,
      temporalBody(ipnId),
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

const temporalBody = (ipnId: string) => ({
  id: uuidv4(),
  currency: "EUR",
  amount: 0.01,
  description: "Hello hello",
  callback_url: "http://localhost:3000/",
  notification_id: ipnId,
  billing_address: {
    email_address: "john.doe@example.com",
    phone_number: "",
    country_code: "KE",
    first_name: "John",
    middle_name: "Example",
    last_name: "Doe",
    line_1: "",
    line_2: "",
    city: "",
    state: "",
    postal_code: "",
    zip_code: "",
  },
});

export { getURLPesapalPayment };
