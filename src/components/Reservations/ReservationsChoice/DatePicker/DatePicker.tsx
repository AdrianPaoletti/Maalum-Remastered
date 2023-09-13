import { useState } from "react";
import DatePickerReact from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const temporaryBlockedDate = new Date(
    new Date().setDate(new Date().getDate() + 1)
  );
  const temporaryBlockedTime = new Date(
    new Date(temporaryBlockedDate.setHours(15)).setMinutes(30)
  );
  return (
    <DatePickerReact
      showTimeSelect
      inline
      minDate={new Date()}
      selected={selectedDate}
      excludeTimes={[temporaryBlockedTime]}
      onChange={(date: Date) => {
        setSelectedDate(date);
      }}
    />
  );
}
