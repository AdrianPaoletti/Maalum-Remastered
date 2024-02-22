import { useCallback, useEffect, useState } from "react";

import {
  BlockedDaysHours,
  GetBlockedDaysMonthlyRequestBody,
  GetReservationsMonthlyRequestBody,
  Reservation,
  ReservationsPickerInformation,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import {
  getBlockedDaysMonthly as getBlockedDaysMonthlyFetch,
  getReservationsMonthly,
} from "maalum/core/services/reservations/reservations.service";
import { ReservationsPickerDatePicker } from "./ReservationsPickerDatePicker/ReservationsPickerDatePicker";
import { ReservationsPickerGuests } from "./ReservationsPickerGuests/ReservationsPickerGuests";

import styles from "./ReservationsPicker.module.scss";

interface ReservationsPickerProps {
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  upgradeGuests: UpgradeGuests;
}

export function ReservationsPicker({
  reservationsPickerInformation,
  setReservationsPickerInformation,
  upgradeGuests,
}: ReservationsPickerProps) {
  const [excludedDays, setExcludedDays] = useState<Date[]>([]);
  const [excludedHours, setExcludedHours] = useState<Date[]>([]);
  const [blockedDaysHours, setBlockedDaysHours] = useState<BlockedDaysHours[]>(
    []
  );
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getBlockedDaysReservationsMonthly = useCallback(
    async (date: Date | null = null) => {
      const requestBody:
        | GetBlockedDaysMonthlyRequestBody
        | GetReservationsMonthlyRequestBody = {
        month: date?.getMonth(),
        year: date?.getFullYear(),
      };

      try {
        const [blockedDaysHours, reservations] = await Promise.all([
          getBlockedDaysMonthlyFetch(requestBody),
          getReservationsMonthly(requestBody),
        ]);
        setIsLoading(false);
        setReservations(reservations);
        setBlockedDaysHours(blockedDaysHours);
        blockedDaysHours.forEach(
          ({ dates, hours }) =>
            hours.length === 7 &&
            setExcludedDays((prevExcludedDays) =>
              prevExcludedDays.concat(...dates.map((date) => new Date(date)))
            )
        );
      } catch (error) {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
    getBlockedDaysReservationsMonthly();
  }, [getBlockedDaysReservationsMonthly]);

  return (
    <div className={`${styles["reservations-picker"]}`}>
      <h5
        className={`${styles["reservations-picker__title"]} heading-cuaternary u-padding-top-small`}
      >
        {"GUESTS"}
      </h5>
      <ReservationsPickerGuests
        reservationsPickerInformation={reservationsPickerInformation}
        setReservationsPickerInformation={setReservationsPickerInformation}
        upgradeGuests={upgradeGuests}
      />
      <span className={`${styles["reservations-picker__space"]}`} />
      <div className={`${styles["reservations-picker__dates"]}`}>
        <h5
          className={`${styles["reservations-picker__title"]} heading-cuaternary`}
        >
          {"DATES / TIMES"}
        </h5>
        <ReservationsPickerDatePicker
          getBlockedDaysReservationsMonthly={getBlockedDaysReservationsMonthly}
          excludedDays={excludedDays}
          setExcludedDays={setExcludedDays}
          excludedHours={excludedHours}
          setExcludedHours={setExcludedHours}
          selectedDate={reservationsPickerInformation.date}
          reservationsPickerInformation={reservationsPickerInformation}
          setReservationsPickerInformation={setReservationsPickerInformation}
          blockedDaysHours={blockedDaysHours}
          reservations={reservations}
          isLoading={isLoading}
          upgradeGuests={upgradeGuests}
        />
      </div>
    </div>
  );
}
