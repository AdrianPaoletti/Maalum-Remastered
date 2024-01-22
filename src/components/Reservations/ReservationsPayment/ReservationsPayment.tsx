import { SyntheticEvent, useEffect, useRef } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Loading from "maalum/components/ui/Loading/Loading";
import { Modal } from "maalum/components/ui/Modal/Modal";
import { ConfirmationState } from "maalum/core/models/reservations.model";

import styles from "./ReservationsPayment.module.scss";

interface ReservationsPaymentProps {
  confirmationState: ConfirmationState;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  URLPayment: string;
}

const ReservationsPayment = ({
  confirmationState,
  isPaymentModalOpen,
  setIsPaymentModalOpen,
  URLPayment,
}: ReservationsPaymentProps) => {
  const getReservationsPaymentData = (
    confirmationState: ConfirmationState
  ): { icon: JSX.Element; title: string } => {
    switch (confirmationState) {
      case "loading":
        return {
          icon: (
            <Loading isLoading={true} position="relative" height={"4rem"} />
          ),
          title: "PROCEEDING WITH THE PAYMENT",
        };
      case "resolved":
        return {
          icon: <CheckCircleIcon fontSize="inherit" />,
          title: "A PAYMENT CONFIRMATION EMAIL HAS BEEN SENT TO YOU",
        };
      case "rejected":
        return {
          icon: <CancelIcon fontSize="inherit" />,
          title: "AN ERROR HAD OCURRED",
        };
      default:
        return {
          icon: <></>,
          title: "",
        };
    }
  };

  const { icon, title } = getReservationsPaymentData(confirmationState);
  return (
    <div className={styles["reservations-payment"]}>
      {confirmationState !== "loading" ? (
        <>
          {icon}
          <h4 className={`heading-cuaternary`}>{title}</h4>
        </>
      ) : (
        <iframe
          width={"100%"}
          height={"100%"}
          allow="fullscreen"
          onLoadCapture={({
            target,
          }: SyntheticEvent<HTMLIFrameElement, Event>) => {
            target as HTMLIFrameElement;
          }}
          // sandbox="allow-forms allow-scripts allow-same-origin"
          src={URLPayment}
        />
      )}
    </div>
  );
};

export default ReservationsPayment;
