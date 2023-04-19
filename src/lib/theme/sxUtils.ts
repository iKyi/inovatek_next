import { SxProps, Theme } from "@mui/material";

export const centerFlex: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const flexColumn: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

export const flexBetween: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export const propertyMargin: SxProps<Theme> = {
  mr: 0.65,
};
export const propertyFont: SxProps<Theme> = {
  fontSize: "18px",
  fontWeight: "500",
};
