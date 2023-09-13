"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { AreModalOpen } from "maalum/core/models/footer.model";
import { PrivacyPolicy } from "../PrivacyPolicy/PrivacyPolicy";
import { TermsConditions } from "../TermsConditions/TermsConditions";

import styles from "./Footer.module.scss";

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [areModalOpen, setAreModalOpen] = useState<AreModalOpen>({
    termsAndConditions: false,
    privacyPolicy: false,
  });

  const listItems: {
    id: keyof AreModalOpen;
    label: string;
    queryParam: string;
  }[] = useMemo(
    () => [
      {
        id: "termsAndConditions",
        label: "TERMS & CONDITIONS",
        queryParam: "terms-conditions",
      },
      {
        id: "privacyPolicy",
        label: "PRIVACY POLICY",
        queryParam: "privacy-policy",
      },
    ],
    []
  );

  useEffect(() => {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    if (currentParams.size) {
      const currentQueryParam = currentParams.toString().split("=")[0];
      const listItem = listItems.find(
        ({ queryParam }) => queryParam === currentQueryParam
      );

      if (listItem) {
        setAreModalOpen((prevAreModalOpen) => ({
          ...prevAreModalOpen,
          [listItem.id]: true,
        }));
      }
      return;
    }
  }, [listItems, searchParams]);

  const handleClick = (id: keyof AreModalOpen, queryParam: string) => {
    router.push(`${pathname}?${queryParam}=true`, { scroll: false });
    setAreModalOpen((prevAreModalOpen) => ({
      ...prevAreModalOpen,
      [id]: true,
    }));
  };

  const handleClose = (id: keyof AreModalOpen) => {
    router.push(`${pathname}`, { scroll: false });
    setAreModalOpen((prevAreModalOpen) => ({
      ...prevAreModalOpen,
      [id]: false,
    }));
  };

  return (
    <footer
      className={`${styles["footer"]} u-padding-vertical-large u-padding-horizontal-huge`}
    >
      <ul className={`${styles["footer__list"]}`}>
        {listItems.map(({ id, label, queryParam }) => (
          <li
            key={id}
            className={`${styles["footer__list-item"]}`}
            onClick={() => handleClick(id, queryParam)}
          >
            {label}
          </li>
        ))}
      </ul>
      <TermsConditions
        isOpen={areModalOpen.termsAndConditions}
        handleClose={() => handleClose("termsAndConditions")}
      />
      <PrivacyPolicy
        isOpen={areModalOpen.privacyPolicy}
        handleClose={() => handleClose("privacyPolicy")}
      />
    </footer>
  );
}
