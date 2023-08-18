import { Checkbox } from "@mui/material";

import styles from "./Services.module.scss";

export function Services() {
  const servicesInformation: {
    id: string;
    title: string;
    text: string;
    disclaimer?: string;
  }[] = [
    {
      id: "cave",
      title: "Maalum Cave",
      text: "Lorem ipsum ergo ipsum",
      disclaimer: "",
    },
    {
      id: "caveAndSpa",
      title: "Maalum Cave + Spa",
      text: "Lorem ipsum ergo ipsum",
      disclaimer: "Maximum 4 persons per day",
    },
  ];

  return servicesInformation.map(({ id, title, text, disclaimer }) => (
    <div
      key={id}
      className={`${styles.services__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
    >
      <div className={`${styles["services__text-container"]}`}>
        <p className={`${styles["services__text-title"]} text-secondary`}>
          {title}
        </p>
        <p className={`${styles["services__text-subtitle"]} text-primary`}>
          {text}
        </p>
      </div>
      <div className={`${styles["services__checkbox"]}`}>
        <Checkbox
          disableRipple
          sx={{
            color: "#c3b288",
            padding: 0,
            "& .MuiSvgIcon-root": { fontSize: 23 },
            "&.Mui-checked": {
              color: "#c3b288",
            },
          }}
        />
      </div>
    </div>
  ));
}
