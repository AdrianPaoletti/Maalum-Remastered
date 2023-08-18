"use client";
import { createTheme, Theme } from "@mui/material/styles";

export const defaultTheme: Theme = createTheme({
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
        content: { margin: "2rem 0" },
      },
    },
  },
});
