import Image from "next/image";

import { Navbar } from "maalum/components/Navbar/Navbar";

import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <header className={styles["header"]}>
        <Navbar />
        <Image
          src="/images/header-cave.jpg"
          alt="maalum-swimming-cave"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <h1 className={`${styles["header__title"]} heading-primary`}>
          WELCOME TO PARADISE
        </h1>
      </header>
      <section className="main-content">
        <article
          className={`${styles.description} u-padding-vertical-45 u-padding-horizontal-30`}
        >
          <h2 className={`${styles["description__title"]} heading-secundary`}>
            TAKE A BREATH <span>LOVE NATURE</span>
          </h2>
        </article>
      </section>
    </main>
  );
}
