import { useCallback, useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import {
  BlockedDaysHours,
  ReservationsMonthlyBlockedDaysQuery,
} from "maalum/core/models/reservations.model";
import { getBlockedDaysMonthly as getBlockedDaysMonthlyFetch } from "maalum/core/services/reservations/reservations.service";
import { getExcludedHours } from "maalum/utils/reservations/reservations.utils";
import { ReservationsPickerDatePicker } from "./ReservationsPickerDatePicker/ReservationsPickerDatePicker";
import { ReservationsPickerGuests } from "./ReservationsPickerGuests/ReservationsPickerGuests";
import { ReservationsPickerServices } from "./ReservationsPickerServices/ReservationsPickerServices";

import styles from "./ReservationsPicker.module.scss";

interface ReservationsChoiceProps {
  isPhoneViewport: boolean;
}

export function ReservationsPicker({
  isPhoneViewport,
}: ReservationsChoiceProps) {
  const [excludedDays, setExcludedDays] = useState<Date[]>([]);
  const [excludedHours, setExcludedHours] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [blockedDaysHours, setBlockedDaysHours] = useState<BlockedDaysHours[]>(
    []
  );

  const getBlockedDaysMonthly = useCallback(
    async (date: Date | null = null) => {
      const queryParams: ReservationsMonthlyBlockedDaysQuery = {
        month: date?.getMonth(),
        year: date?.getFullYear(),
      };

      try {
        const blockedDaysHours = await getBlockedDaysMonthlyFetch(queryParams);
        setBlockedDaysHours(blockedDaysHours);
        blockedDaysHours.forEach(
          ({ dates, hours }) =>
            hours.length === 7 &&
            setExcludedDays((prevExcludedDays) =>
              prevExcludedDays.concat(...dates.map((date) => new Date(date)))
            )
        );
      } catch (error) {
        console.log("An error had occurred");
      }
    },
    []
  );

  useEffect(() => {
    getBlockedDaysMonthly();
  }, [getBlockedDaysMonthly]);

  const accordionElements: {
    id: string;
    title: string;
    component: JSX.Element;
    paddingBottom?: string;
  }[] = [
    {
      id: "guests",
      title: "GUESTS",
      component: <ReservationsPickerGuests />,
    },
    {
      id: "dates",
      title: "DATES AND TIMES",
      component: (
        <ReservationsPickerDatePicker
          getBlockedDaysMonthly={getBlockedDaysMonthly}
          excludedDays={excludedDays}
          excludedHours={excludedHours}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          blockedDaysHours={blockedDaysHours}
          setExcludedHours={setExcludedHours}
        />
      ),
      paddingBottom: "2rem",
    },
    {
      id: "services",
      title: "SERVICES",
      component: <ReservationsPickerServices />,
    },
  ];

  return (
    <>
      {accordionElements.map(({ id, title, component, paddingBottom }) => (
        <Accordion key={id} disableGutters square>
          <AccordionSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
            <h5
              className={`${styles["reservations__sub-title"]} heading-cuaternary`}
            >
              {title}
            </h5>
          </AccordionSummary>
          <AccordionDetails sx={{ paddingBottom }}>
            {component}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
