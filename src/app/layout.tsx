import type { Metadata } from "next";

import { ThemeProvider } from "@mui/material/styles";

import { Footer } from "maalum/components/Footer/Footer";
import { Header } from "maalum/components/Header/Header";
import MaalumContextProvider from "maalum/core/store/context/MaalumContextProvider";
import { defaultTheme } from "maalum/styles/themes";

import "maalum/styles/main.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const metadata: Metadata = {
    title: "Maalum",
    description: "Best natural swimming cave in zanzibar",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    icons: "/favicon.ico",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider theme={defaultTheme}>
                    <MaalumContextProvider>
                        <>
                            <Header />
                            {children}
                            <Footer />
                        </>
                    </MaalumContextProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
