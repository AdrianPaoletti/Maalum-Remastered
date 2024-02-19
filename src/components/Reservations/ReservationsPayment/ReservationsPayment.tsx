import { SyntheticEvent, useState } from "react";

import Loading from "maalum/components/ui/Loading/Loading";

import styles from "./ReservationsPayment.module.scss";

interface ReservationsPaymentProps {
  URLPayment: string;
}

const ReservationsPayment = ({ URLPayment }: ReservationsPaymentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className={styles["reservations-payment"]}>
      {isLoading && <Loading isLoading={isLoading} opacity={0.6} />}
      <iframe
        width={"100%"}
        allow="fullscreen"
        onLoadCapture={({
          target,
        }: SyntheticEvent<HTMLIFrameElement, Event>) => {
          target as HTMLIFrameElement;
          setIsLoading(false);
        }}
        src={URLPayment}
      />
    </div>
  );
};

export default ReservationsPayment;
