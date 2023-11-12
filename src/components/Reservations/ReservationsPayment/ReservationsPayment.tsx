import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Loading from "maalum/components/ui/Loading/Loading";

import styles from "./ReservationsPayment.module.scss";

interface ReservationsPaymentProps {
  isLoading: boolean;
}

const ReservationsPayment = ({ isLoading }: ReservationsPaymentProps) => {
  return (
    <div className={styles["reservations-payment"]}>
      {isLoading ? (
        <Loading isLoading={isLoading} position="relative" height={"4rem"} />
      ) : (
        <CheckCircleIcon fontSize="inherit" />
      )}
      <h4 className={`heading-cuaternary`}>
        {isLoading
          ? "PROCEEDING WITH THE PAYMENT"
          : "A CONFIRMATION EMAIL HAS BEEN SENT TO YOU"}
      </h4>
    </div>
  );
};

export default ReservationsPayment;
