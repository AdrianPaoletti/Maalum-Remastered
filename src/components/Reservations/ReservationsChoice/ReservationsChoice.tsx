import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

import { DatePicker } from "./DatePicker/DatePicker";
import { Guests } from "./Guests/Guests";
import { Services } from "./Services/Services";

import styles from "./ReservationsChoice.module.scss";

interface ReservationsChoiceProps {
  isPhoneViewport: boolean;
}

const ReservationsChoice = ({ isPhoneViewport }: ReservationsChoiceProps) => {
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
      component: <Guests isPhoneViewport={isPhoneViewport} />,
    },
    {
      id: "dates",
      title: "DATES AND TIMES",
      component: <DatePicker />,
      paddingBottom: "2rem",
    },
  ];

  return (
    <article className={`${styles["reservations-choice__body"]}`}>
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
    </article>
  );
};

export default ReservationsChoice;
