import { useState } from "react";

import { Radio } from "@mui/material";

import { servicesInformation } from "maalum/utils/reservations/reservations.utils";

import styles from "./Services.module.scss";

export function Services() {
  const [selected, setSelected] = useState<string>("");

  const handleClick = (id: string) => {
    if (selected === id) {
      setSelected("");
      return;
    }
    setSelected(id);
  };

  return (
    <div className={styles.services}>
      {servicesInformation.map(({ id, title, text, disclaimer }) => (
        <div
          key={id}
          className={`${styles.services__card} u-padding-horizontal-small-medium u-padding-vertical-small-extra`}
          onClick={() => handleClick(id)}
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
            <Radio
              disableRipple
              sx={{
                color: "#c3b288",
                padding: 0,
                "& .MuiSvgIcon-root": { fontSize: 24 },
                "&.Mui-checked": {
                  color: "#c3b288",
                },
              }}
              checked={selected === id}
            />
          </div>
        </div>
      ))}
      <div className={`${styles["services__button-submit"]}`}>
        <button type="button">NEXT</button>
      </div>
    </div>
  );
}
