"use client";

import Link from "next/link";

import styles from "./Footer.module.scss";

export function Footer() {
  const listItems: { id: string; label: string; href: string }[] = [
    {
      id: "termsAndConditions",
      label: "TERMS & CONDITIONS",
      href: "/terms-conditions",
    },
    {
      id: "privacyPolicy",
      label: "PRIVACY POLICY",
      href: "/privacy-policy",
    },
  ];
  return (
    <footer
      className={`${styles["footer"]} u-padding-vertical-large u-padding-horizontal-mega-large`}
    >
      <ul className={`${styles["footer__list"]}`}>
        {listItems.map(({ id, label, href }) => (
          <Link
            key={id}
            href={href}
            className={`${styles["footer__list-item-link"]}`}
          >
            <li className={`${styles["footer__list-item"]}`}>{label}</li>
          </Link>
        ))}
      </ul>
    </footer>
  );
}
