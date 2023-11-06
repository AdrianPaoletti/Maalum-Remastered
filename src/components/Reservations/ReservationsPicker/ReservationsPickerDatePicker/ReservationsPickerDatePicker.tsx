import { useEffect, useState } from "react";
import DatePickerReact from "react-datepicker";

import { MIN_DAY_HOUR } from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import {
  addDaysToDate,
  getExcludedHours,
  getMinimumHour,
} from "maalum/utils/reservations/reservationsPicker.utils";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./ReservationsPickerDatePicker.module.scss";

interface ReservationsPickerDatePickerProps {
  getBlockedDaysMonthly: (date?: Date | null) => void;
  excludedDays: Date[];
  excludedHours: Date[];
  selectedDate: Date | null;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  setExcludedHours: React.Dispatch<React.SetStateAction<Date[]>>;
  blockedDaysHours: BlockedDaysHours[];
  handleSubmit: () => void;
}

export function ReservationsPickerDatePicker({
  getBlockedDaysMonthly,
  excludedDays,
  excludedHours,
  selectedDate,
  setReservationsPickerInformation,
  setExcludedHours,
  blockedDaysHours,
  handleSubmit,
}: ReservationsPickerDatePickerProps) {
  const [minimumDate, setMinimumDate] = useState<Date | null>(null);
  const [minimumHour, setMinimumHour] = useState<Date>(new Date());
  const isButtonDisabled = !(selectedDate && selectedDate.getHours());

  useEffect(() => {
    if (blockedDaysHours.length) {
      const minimumDate =
        new Date().getHours() > MIN_DAY_HOUR
          ? addDaysToDate(new Date(), 1)
          : selectedDate;

      setMinimumDate(minimumDate);
    }
  }, [blockedDaysHours, selectedDate]);

  const handleChange = (date: Date): void => {
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      date:
        prevReservationsPickerInformation.date?.getDate() === date.getDate()
          ? date
          : new Date(date.setHours(0, 0, 0)),
      service: "",
    }));
    setMinimumHour(getMinimumHour(date));
    setExcludedHours(getExcludedHours(blockedDaysHours, date));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <DatePickerReact
        showTimeSelect
        inline
        minDate={minimumDate}
        minTime={minimumHour}
        maxTime={new Date(new Date().setHours(17, 0, 0))}
        selected={selectedDate}
        excludeTimes={excludedHours}
        excludeDates={excludedDays}
        onChange={handleChange}
        onMonthChange={getBlockedDaysMonthly}
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
    </form>
  );
}
