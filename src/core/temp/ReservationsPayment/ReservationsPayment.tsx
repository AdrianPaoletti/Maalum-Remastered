// import { SyntheticEvent } from "react";

// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import Loading from "maalum/components/ui/Loading/Loading";

// import styles from "./ReservationsPayment.module.scss";

// interface ReservationsPaymentProps {
//   URLPayment?: string;
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   text: string;
// }

// const ReservationsPayment = ({
//   URLPayment,
//   isLoading,
//   setIsLoading,
//   text,
// }: ReservationsPaymentProps) => {
//   return (
//     <div
//       className={`${styles["reservations-payment"]} ${
//         !URLPayment && styles["reservations-payment--success"]
//       }`}
//     >
//       {isLoading && <Loading isLoading={isLoading} opacity={0.6} />}
//       {!URLPayment && !isLoading && (
//         <>
//           <CheckCircleIcon fontSize="inherit" />
//           <h4 className={`heading-cuaternary`}>
//             {text.length
//               ? text
//               : "A PAYMENT CONFIRMATION EMAIL HAS BEEN SENT TO YOU"}
//           </h4>
//         </>
//       )}
//       {URLPayment && (
//         <iframe
//           width={"100%"}
//           allow="fullscreen"
//           onLoadCapture={({
//             target,
//           }: SyntheticEvent<HTMLIFrameElement, Event>) => {
//             target as HTMLIFrameElement;
//             setIsLoading(false);
//           }}
//           src={URLPayment}
//         />
//       )}
//     </div>
//   );
// };

// export default ReservationsPayment;
