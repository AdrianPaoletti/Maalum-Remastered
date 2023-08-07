import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Head from "next/head";

import { Footer } from "maalum/components/Footer/Footer";
import { Header } from "maalum/components/Header/Header";

import "maalum/styles/main.scss";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maalum",
  description: "Best natural swimming cave in zanzibar",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
