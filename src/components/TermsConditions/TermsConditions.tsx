import { textTermsConditions } from "maalum/utils/termsAndConditions/termsAndConditions.utils";
import { Modal } from "../ui/Modal/Modal";

import styles from "./TermsConditions.module.scss";

interface TermsConditionsProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function TermsConditions({ isOpen, handleClose }: TermsConditionsProps) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <section className={`${styles.terms}`}>
        <h2 className={`${styles.terms__title} heading-secundary`}>
          TERMS AND CONDITIONS
        </h2>
        <article className={`${styles["terms__text-container"]}`}>
          <div className={`${styles["terms__condition-block"]}`}>
            <h3 className="heading-terciary">GENERAL</h3>
            <div className={`${styles["terms__text-block"]}`}>
              {textTermsConditions.map(({ id, text }, indexNumber) => (
                <p
                  key={id}
                  className={`text-primary ${
                    indexNumber && "u-padding-top-small"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </article>
      </section>
    </Modal>
  );
}
