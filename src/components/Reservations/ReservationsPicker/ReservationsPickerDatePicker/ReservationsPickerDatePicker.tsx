import { useEffect, useState } from "react";
import DatePickerReact from "react-datepicker";

import Loading from "maalum/components/ui/Loading/Loading";
import { MIN_DAY_HOUR } from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  Reservation,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import {
  addDaysToDate,
  getBlockedDaysExcludedHours,
  getMinimumHour,
  getReservationsExcludedHours,
} from "maalum/utils/reservations/reservationsPicker.utils";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./ReservationsPickerDatePicker.module.scss";

interface ReservationsPickerDatePickerProps {
  getBlockedDaysReservationsMonthly: (date?: Date | null) => Promise<void>;
  excludedDays: Date[];
  excludedHours: Date[];
  selectedDate: Date | null;
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  setExcludedHours: React.Dispatch<React.SetStateAction<Date[]>>;
  blockedDaysHours: BlockedDaysHours[];
  reservations: Reservation[];
  isLoading: boolean;
  handleSubmit: () => void;
}

export function ReservationsPickerDatePicker({
  getBlockedDaysReservationsMonthly,
  excludedDays,
  excludedHours,
  selectedDate,
  reservationsPickerInformation,
  setReservationsPickerInformation,
  setExcludedHours,
  blockedDaysHours,
  reservations,
  isLoading,
  handleSubmit,
}: ReservationsPickerDatePickerProps) {
  const [minimumDate, setMinimumDate] = useState<Date | null>(new Date());
  const [minimumHour, setMinimumHour] = useState<Date>(
    new Date(new Date().setHours(17))
  );
  const [timeLisDatePickerHours, setTimeLisDatePickerHours] =
    useState<Element | null>(null);
  const isButtonDisabled = !(selectedDate && selectedDate.getHours());

  useEffect(() => {
    const minimumDate =
      new Date().getHours() >= MIN_DAY_HOUR
        ? addDaysToDate(new Date(), 1)
        : new Date();

    setMinimumDate(minimumDate);
    setTimeLisDatePickerHours(
      document.querySelector(".react-datepicker__time-list")
    );
  }, [blockedDaysHours]);

  const handleChange = (date: Date): void => {
    // setReservationsPickerInformation((prevReservationsPickerInformation) => ({
    //   ...prevReservationsPickerInformation,
    //   date:
    //     prevReservationsPickerInformation.date?.getDate() === date.getDate()
    //       ? date
    //       : new Date(date.setHours(0)),
    //   service: "",
    // }));
    setMinimumHour(getMinimumHour(date));
    setExcludedHours([
      ...getBlockedDaysExcludedHours(blockedDaysHours, date),
      ...getReservationsExcludedHours(
        reservations,
        reservationsPickerInformation.totalGuests,
        date
      ),
    ]);

    timeLisDatePickerHours?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      className={`${styles["date-picker"]}`}
    >
      <DatePickerReact
        showTimeSelect
        inline
        minDate={minimumDate}
        minTime={minimumHour}
        maxTime={new Date(new Date().setHours(18))}
        selected={selectedDate}
        excludeTimes={excludedHours}
        excludeDates={excludedDays}
        onChange={handleChange}
        onMonthChange={getBlockedDaysReservationsMonthly}
      />
      <div className={`${styles["date-picker__button-submit-container"]}`}>
        <button
          className={`${styles["date-picker__button-submit"]} ${
            isButtonDisabled && styles["date-picker__button-submit--disabled"]
          }`}
          disabled={isButtonDisabled}
          type="submit"
        >
          CONTINUE
        </button>
      </div>
      {isLoading && <Loading isLoading={isLoading} opacity={0.6} />}
    </form>
  );
}
