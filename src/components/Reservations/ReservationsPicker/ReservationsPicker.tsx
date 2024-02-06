import { useCallback, useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import {
  BlockedDaysHours,
  GetBlockedDaysMonthlyRequestBody,
  GetReservationsMonthlyRequestBody,
  Reservation,
  ReservationsPickerInformation,
  ReservationsPickerSubmited,
  ReservationsServiceInformation,
} from "maalum/core/models/reservations.model";
import {
  getBlockedDaysMonthly as getBlockedDaysMonthlyFetch,
  getReservationsMonthly,
} from "maalum/core/services/reservations/reservations.service";
import { ReservationsPickerDatePicker } from "./ReservationsPickerDatePicker/ReservationsPickerDatePicker";
import { ReservationsPickerServicesGuests } from "./ReservationsPickerServicesGuests/ReservationsPickerServicesGuests";

import styles from "./ReservationsPicker.module.scss";

interface ReservationsPickerProps {
  reservationsPickerInformation: ReservationsPickerInformation;
  setReservationsPickerInformation: React.Dispatch<
    React.SetStateAction<ReservationsPickerInformation>
  >;
  // reservationsPickerSubmited: ReservationsPickerSubmited;
  // setReservationsPickerSubmited: React.Dispatch<
  //   React.SetStateAction<ReservationsPickerSubmited>
  // >;
  accordionExpanded: string;
  setAccordionExpanded: React.Dispatch<React.SetStateAction<string>>;
}

export function ReservationsPicker({
  reservationsPickerInformation,
  setReservationsPickerInformation,
  // reservationsPickerSubmited,
  // setReservationsPickerSubmited,
  accordionExpanded,
  setAccordionExpanded,
}: ReservationsPickerProps) {
  const [excludedDays, setExcludedDays] = useState<Date[]>([]);
  const [excludedHours, setExcludedHours] = useState<Date[]>([]);
  const [blockedDaysHours, setBlockedDaysHours] = useState<BlockedDaysHours[]>(
    []
  );
  const [serviceReservationPicker, setServiceReservationPicker] =
    useState<ReservationsServiceInformation[]>(
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
        console.log("An error had occurred", error);
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setIsLoading(true);
    getBlockedDaysReservationsMonthly();
  }, [getBlockedDaysReservationsMonthly]);

  const handleSubmitDatePicker = () => {
    setAccordionExpanded("services");
    setReservationsPickerInformation((prevReservationsPickerInformation) => ({
      ...prevReservationsPickerInformation,
      service: [],
    }));
    // setReservationsPickerSubmited((prevReservationsPickerSubmited) => ({
    //   ...prevReservationsPickerSubmited,
    //   dates: true,
    // }));
  };

  // const isReservationsPickerButtonDisabled = (
  //   reservationsPickerInformation: ReservationsPickerInformation
  // ): boolean => {
  //   const dateServiceValue = Object.values(reservationsPickerInformation).slice(
  //     4,
  //     6
  //   );

  //   return (
  //     !reservationsPickerInformation.totalGuests ||
  //     dateServiceValue.some((value) => !value)
  //   );
  // };

  // const canExpandAccordion = (id: string, indexNumber: number): boolean => {
  //   const indexAccordionExpanded = accordionElements.findIndex(
  //     ({ id }) => id === accordionExpanded
  //   );

  //   return (
  //     (indexAccordionExpanded > indexNumber && id !== accordionExpanded) ||
  //     (!Object.values(reservationsPickerSubmited).some(
  //       (value) => value === false
  //     ) &&
  //       !isReservationsPickerButtonDisabled) ||
  //     !accordionExpanded.length
  //   );
  // };

  const accordionElements: {
    id: keyof ReservationsPickerSubmited;
    title: string;
    component: JSX.Element;
    paddingBottom?: string;
  }[] = [
    {
      id: "dates",
      title: "DATES AND TIMES",
      component: (
        <ReservationsPickerDatePicker
          getBlockedDaysReservationsMonthly={getBlockedDaysReservationsMonthly}
          excludedDays={excludedDays}
          excludedHours={excludedHours}
          setExcludedHours={setExcludedHours}
          selectedDate={reservationsPickerInformation.date}
          reservationsPickerInformation={reservationsPickerInformation}
          setReservationsPickerInformation={setReservationsPickerInformation}
          blockedDaysHours={blockedDaysHours}
          reservations={reservations}
          handleSubmit={handleSubmitDatePicker}
          isLoading={isLoading}
        />
      ),
      paddingBottom: "2rem",
    },
    {
      id: "services",
      title: "SERVICES",
      component: (
        <ReservationsPickerServicesGuests
          reservations={reservations}
          reservationsPickerInformation={reservationsPickerInformation}
          setReservationsPickerInformation={setReservationsPickerInformation}
        />
      ),
    },
  ];

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
                // canExpandAccordion(id, indexNumber) &&
                setAccordionExpanded(id)
              }
              expandIcon={<ExpandMoreIcon fontSize="large" />}
            >
              <h5 className={`heading-cuaternary`}>{title}</h5>
              {/* {reservationsPickerSubmited[id] && ( */}
              <h5
                className={`${styles["reservations-picker__sub-title--update"]}`}
              >
                Update
              </h5>
              {/* )} */}
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
