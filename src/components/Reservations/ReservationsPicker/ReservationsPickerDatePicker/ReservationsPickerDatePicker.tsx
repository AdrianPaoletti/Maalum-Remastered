import { useEffect, useState } from "react";
import DatePickerReact from "react-datepicker";

import { ADD_HOURS, MIN_DAY_HOUR } from "maalum/core/constants/constants";
import { BlockedDaysHours } from "maalum/core/models/reservations.model";
import {
  addDaysToDate,
  addHoursToTime,
  getExcludedHours,
} from "maalum/utils/reservations/reservations.utils";

import "react-datepicker/dist/react-datepicker.css";

interface ReservationsPickerDatePickerProps {
  getBlockedDaysMonthly: (date?: Date | null) => void;
  excludedDays: Date[];
  excludedHours: Date[];
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setExcludedHours: React.Dispatch<React.SetStateAction<Date[]>>;
  blockedDaysHours: BlockedDaysHours[];
}

export function ReservationsPickerDatePicker({
  getBlockedDaysMonthly,
  excludedDays,
  excludedHours,
  selectedDate,
  setSelectedDate,
  setExcludedHours,
  blockedDaysHours,
}: ReservationsPickerDatePickerProps) {
  const [minDate, setMinDate] = useState<Date | null>(null);

  useEffect(() => {
    if (blockedDaysHours.length) {
      const minDate =
        new Date().getHours() > MIN_DAY_HOUR
          ? addDaysToDate(new Date(), 1)
          : new Date();
      setExcludedHours(getExcludedHours(blockedDaysHours, minDate));
      setMinDate(minDate);
    }
  }, [blockedDaysHours, setExcludedHours]);

  const handleChange = (date: Date) => {
    setSelectedDate((prevSelectedDate) =>
      prevSelectedDate?.getDate() === date.getDate()
        ? date
        : new Date(date.setHours(0, 0, 0))
    );
    setExcludedHours(getExcludedHours(blockedDaysHours, date));
  };

  return (
    <DatePickerReact
      showTimeSelect
      inline
      minDate={minDate}
      minTime={addHoursToTime(new Date(), ADD_HOURS)}
      maxTime={new Date(new Date().setHours(17, 0, 0))}
      selected={selectedDate}
      excludeTimes={excludedHours}
      excludeDates={excludedDays}
      onChange={handleChange}
      onMonthChange={getBlockedDaysMonthly}
    />
  );
}
