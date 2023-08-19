import DatePickerReact from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DatePicker() {
  return (
    <DatePickerReact
      showTimeSelect
      inline
      selected={new Date()}
      onChange={() => {}}
    />
  );
}
