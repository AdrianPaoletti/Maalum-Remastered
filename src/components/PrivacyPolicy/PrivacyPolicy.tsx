import { privacyPolicyText } from "maalum/utils/privacyPolicy/privacyPolicy.utils";
import { Modal } from "../ui/Modal/Modal";

import styles from "./PrivacyPolicy.module.scss";

interface PrivacyPolicyProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function PrivacyPolicy({ isOpen, handleClose }: PrivacyPolicyProps) {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <section className={`${styles.privacy}`}>
        <h2 className={`${styles.privacy__title} heading-secundary`}>
          PRIVACY POLICY
        </h2>
        <article
          className={`${styles["privacy__text-container"]} u-padding-top-large`}
        >
          {privacyPolicyText.map(({ id, title, textBlock }, indexNumber) => (
            <div key={id}>
              <h3
                className={`heading-terciary ${
                  indexNumber && "u-padding-top-large"
                }`}
              >
                {title}
              </h3>
              {textBlock.map(({ id, text, subtitle }) => (
                <div key={id}>
                  {!!subtitle.length && (
                    <h4 className={`heading-terciary u-padding-top-medium`}>
                      {subtitle}
                    </h4>
                  )}
                  <p className="text-primary u-padding-top-small">{text}</p>
                </div>
              ))}
            </div>
          ))}
        </article>
      </section>
    </Modal>
  );
}
