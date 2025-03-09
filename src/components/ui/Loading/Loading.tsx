import { alpha, Backdrop, CircularProgress } from "@mui/material";

import { defaultTheme } from "maalum/styles/themes";

interface LoadingProps {
  isLoading: boolean;
  backgroundColor?: string;
  position?: "absolute" | "relative" | "static" | "fixed";
  opacity?: number;
  width?: string | number;
  height?: string | number;
}

export function Loading({
  isLoading,
  backgroundColor = defaultTheme.palette.white,
  position = "absolute",
  opacity = 1,
  width = "100%",
  height = "100%",
}: LoadingProps) {
  return (
    <Backdrop
      sx={{
        color: defaultTheme.palette.beige.bold,
        backgroundColor: opacity
          ? alpha(backgroundColor, opacity)
          : backgroundColor,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: position,
        width,
        height,
      }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
