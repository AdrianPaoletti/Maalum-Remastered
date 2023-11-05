import { useCallback, useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import {
  BlockedDaysHours,
  GetBlockedDaysMonthlyRequestBody,
  ReservationsPickerInformation,
} from "maalum/core/models/reservations.model";
import { getBlockedDaysMonthly as getBlockedDaysMonthlyFetch } from "maalum/core/services/reservations/reservations.service";
import { initialReservationsPickerInformation } from "maalum/utils/reservations/reservations.utils";
import { ReservationsPickerDatePicker } from "./ReservationsPickerDatePicker/ReservationsPickerDatePicker";
import { ReservationsPickerGuests } from "./ReservationsPickerGuests/ReservationsPickerGuests";
import { ReservationsPickerServices } from "./ReservationsPickerServices/ReservationsPickerServices";

import styles from "./ReservationsPicker.module.scss";

interface ReservationsPickerProps {
  isPhoneViewport: boolean;
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
}

export function ReservationsPicker({
  isPhoneViewport,
  reservationsPickerInformation,
  setReservationsPickerInformation,
}: ReservationsPickerProps) {
  const [excludedDays, setExcludedDays] = useState<Date[]>([]);
  const [excludedHours, setExcludedHours] = useState<Date[]>([]);
  const [accordionExpanded, setAccordionExpanded] = useState<string>("guests");
  const [blockedDaysHours, setBlockedDaysHours] = useState<BlockedDaysHours[]>(
    []
  );

  const getBlockedDaysMonthly = useCallback(
    async (date: Date | null = null) => {
      const requestBody: GetBlockedDaysMonthlyRequestBody = {
        month: date?.getMonth(),
        year: date?.getFullYear(),
      };

      try {
        const blockedDaysHours = await getBlockedDaysMonthlyFetch(requestBody);
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

  const handleSubmitPickerGuests = () => {
    const { adults, children, residents } = reservationsPickerInformation;
    setReservationsPickerInformation({
      ...initialReservationsPickerInformation,
      ...{ adults, children, residents },
    });
    setAccordionExpanded("dates");
  };

  const handleSubmitDatePicker = () => {
    setAccordionExpanded("services");
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      service: "",
    }));
  };

  const accordionElements: {
    id: string;
    title: string;
    component: JSX.Element;
    paddingBottom?: string;
  }[] = [
    {
      id: "guests",
      title: "GUESTS",
      component: (
        <ReservationsPickerGuests
          handleSubmit={handleSubmitPickerGuests}
          reservationsPickerInformation={reservationsPickerInformation}
          setReservationsPickerInformation={setReservationsPickerInformation}
        />
      ),
    },
    {
      id: "dates",
      title: "DATES AND TIMES",
      component: (
        <ReservationsPickerDatePicker
          getBlockedDaysMonthly={getBlockedDaysMonthly}
          excludedDays={excludedDays}
          excludedHours={excludedHours}
          setExcludedHours={setExcludedHours}
          selectedDate={reservationsPickerInformation.date}
          setReservationsPickerInformation={setReservationsPickerInformation}
          blockedDaysHours={blockedDaysHours}
          handleSubmit={handleSubmitDatePicker}
        />
      ),
      paddingBottom: "2rem",
    },
    {
      id: "services",
      title: "SERVICES",
      component: (
        <ReservationsPickerServices
          selectedService={reservationsPickerInformation.service}
          setReservationsPickerInformation={setReservationsPickerInformation}
        />
      ),
    },
  ];

  const canExpandAccordion = (id: string, indexNumber: number): boolean => {
    const indexAccordionExpanded = accordionElements.findIndex(
      ({ id }) => id === accordionExpanded
    );

    return indexAccordionExpanded > indexNumber && id !== accordionExpanded;
  };

  return (
    <>
      {accordionElements.map(
        ({ id, title, component, paddingBottom }, indexNumber) => (
          <Accordion
            key={id}
            expanded={id === accordionExpanded}
            disableGutters
            square
          >
            <AccordionSummary
              onClick={() =>
                canExpandAccordion(id, indexNumber) && setAccordionExpanded(id)
              }
              expandIcon={<ExpandMoreIcon fontSize="large" />}
            >
              <h5 className={`heading-cuaternary`}>{title}</h5>
              <h5
                className={`heading-cuaternary ${styles["reservations-picker__sub-title--update"]}`}
              >
                Update
              </h5>
            </AccordionSummary>
            <AccordionDetails sx={{ paddingBottom }}>
              {component}
            </AccordionDetails>
          </Accordion>
        )
      )}
    </>
  );
}
