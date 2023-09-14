import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { DatePicker } from "./DatePicker/DatePicker";
import { Guests } from "./Guests/Guests";
import { Services } from "./Services/Services";

import styles from "./ReservationsChoice.module.scss";

interface ReservationsChoiceProps {
  isPhoneViewport: boolean;
}

export function ReservationsChoice({
  isPhoneViewport,
}: ReservationsChoiceProps) {
  const accordionElements: {
    id: string;
    title: string;
    component: JSX.Element;
    paddingBottom?: string;
  }[] = [
    { id: "services", title: "SERVICES", component: <Services /> },
    {
      id: "guests",
      title: "GUESTS",
      component: <Guests />,
    },
    {
      id: "dates",
      title: "DATES AND TIMES",
      component: <DatePicker />,
      paddingBottom: "2rem",
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
