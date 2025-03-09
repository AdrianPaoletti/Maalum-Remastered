"use client";
import { createTheme, Theme } from "@mui/material/styles";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    beige: { bold: string; light: string; disabled: string; main: string };
    gray: { light: string; lightMain: string; main: string };
    white: string;
  }

  interface PaletteOptions {
    beige: { bold: string; light: string; disabled: string; main: string };
    gray: { light: string; lightMain: string; main: string };
    white: string;
  }
}

export const defaultTheme: Theme = createTheme({
  palette: {
    beige: {
      bold: "#957940",
      light: "#c3b288",
      disabled: "#c3b28878",
      main: "#bda065",
    },
    gray: { light: "", lightMain: "#f0f2f4", main: "#737373" },
    white: "#fff",
  },
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderTop: "none",
          borderBottom: "none",

          "&.Mui-expanded": {
            marginTop: 0,
          },

          "&:before": {
            backgroundColor: "#fff",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "1.75rem 0 0",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontSize: 14,
          padding: 0,
          minHeight: 0,
          "&.Mui-expanded": {
            minHeight: 0,
          },
        },
        content: {
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "1rem",

          "&.Mui-expanded": {
            margin: 0,
          },
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
