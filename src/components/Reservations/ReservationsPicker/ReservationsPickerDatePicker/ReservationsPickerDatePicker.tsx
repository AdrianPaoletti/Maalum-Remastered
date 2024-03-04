import { useEffect, useMemo, useState } from "react";
import DatePickerReact from "react-datepicker";

import Loading from "maalum/components/ui/Loading/Loading";
import { MIN_DAY_HOUR } from "maalum/core/constants/constants";
import {
  BlockedDaysHours,
  Reservation,
  ReservationsPickerInformation,
  UpgradeGuests,
} from "maalum/core/models/reservations.model";
import {
  addDaysToDate,
  getBlockedDaysExcludedHours,
  getLastDayMonth,
  getMinimumHour,
  getReservationsExcludedHours,
} from "maalum/utils/reservations/reservationsPicker.utils";

import "react-datepicker/dist/react-datepicker.css";

interface ReservationsPickerDatePickerProps {
  getBlockedDaysReservationsMonthly: (date?: Date | null) => Promise<void>;
  excludedDays: Date[];
  setExcludedDays: React.Dispatch<React.SetStateAction<Date[]>>;
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
  upgradeGuests: UpgradeGuests;
}

export function ReservationsPickerDatePicker({
  getBlockedDaysReservationsMonthly,
  excludedDays,
  setExcludedDays,
  excludedHours,
  selectedDate,
  reservationsPickerInformation,
  setReservationsPickerInformation,
  setExcludedHours,
  blockedDaysHours,
  reservations,
  isLoading,
  upgradeGuests,
}: ReservationsPickerDatePickerProps) {
  const [minimumDate, setMinimumDate] = useState<Date | null>(new Date());
  const [minimumHour, setMinimumHour] = useState<Date>(
    new Date(new Date().setHours(17))
  );
  const [isLastDay, setIsLastDay] = useState<boolean>(false);
  const [timeLisDatePickerHours, setTimeLisDatePickerHours] =
    useState<Element | null>(null);
  const maxDate = !reservationsPickerInformation.totalGuests
    ? getLastDayMonth()
    : null;

  useEffect(() => {
    const minimumDate =
      new Date().getHours() >= MIN_DAY_HOUR
        ? addDaysToDate(new Date(), 1)
        : new Date();
    setMinimumHour(new Date(new Date().setHours(17)));

    if (!reservationsPickerInformation.totalGuests && !isLastDay) {
      setExcludedDays((prevExcludedDays) => [
        ...prevExcludedDays,
        getLastDayMonth(),
      ]);
      setIsLastDay(true);
      new Date().getDay() !== getLastDayMonth().getDay()
        ? setMinimumDate(getLastDayMonth())
        : setMinimumDate(minimumDate);
      return;
    }

    if (reservationsPickerInformation.totalGuests && isLastDay) {
      setExcludedDays((prevExcludedDays) => prevExcludedDays.slice(0, -1));
      setIsLastDay(false);
      return;
    }

    if (!isLastDay) {
      setMinimumDate(minimumDate);
      setTimeLisDatePickerHours(
        document.querySelector(".react-datepicker__time-list")
      );
    }
  }, [isLastDay, reservationsPickerInformation.totalGuests, setExcludedDays]);

  useEffect(() => {
    if (reservationsPickerInformation.date?.getHours()) {
      setMinimumHour(getMinimumHour(reservationsPickerInformation.date));
    }
  }, [reservationsPickerInformation.date]);
  const handleChange = (date: Date): void => {
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      date:
        prevReservationsPickerInformation.date?.getDate() === date.getDate()
          ? date
          : new Date(date.setHours(0)),
    }));
    setMinimumHour(getMinimumHour(date));
    setExcludedHours([
      ...getBlockedDaysExcludedHours(blockedDaysHours, date),
      ...getReservationsExcludedHours(
        reservations,
        reservationsPickerInformation.totalGuests,
        date
      ),
    ]);
    Object.keys(upgradeGuests).forEach((key) =>
      upgradeGuests[key as keyof UpgradeGuests].clear()
    );
    timeLisDatePickerHours?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form className={`u-padding-vertical-small-medium`}>
      <DatePickerReact
        showTimeSelect
        inline
        minDate={minimumDate}
        maxDate={maxDate}
        minTime={minimumHour}
        maxTime={new Date(new Date().setHours(18))}
        selected={selectedDate}
        excludeTimes={excludedHours}
        excludeDates={excludedDays}
        onChange={handleChange}
        onMonthChange={getBlockedDaysReservationsMonthly}
      />
      {isLoading && <Loading isLoading={isLoading} opacity={0.6} />}
    </form>
  );
}
