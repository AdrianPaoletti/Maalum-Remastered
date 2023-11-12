"use client";
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    beige: { bold: string; light: string; disabled: string };
    gray: { light: string; lightMain: string; main: string };
    white: string;
  }

  interface PaletteOptions {
    beige: { bold: string; light: string; disabled: string };
    gray: { light: string; lightMain: string; main: string };
    white: string;
  }
}

export const defaultTheme: Theme = createTheme({
  palette: {
    beige: { bold: "#957940", light: "#c3b288", disabled: "#c3b28878" },
    gray: { light: "", lightMain: "#f0f2f4", main: "#737373" },
    white: "#fff",
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderTop: "none",
          borderBottom: "1px solid #c7c7c7",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "1rem 0 3rem 0",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontSize: 14,
          padding: 0,
        },
        content: {
          margin: "2rem 0",
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input::": {
            "&-webkit-outer-spin-button, &-webkit-inner-spin-button": {
              display: "none",
            },
          },
        },
      },
    },
  },
});
