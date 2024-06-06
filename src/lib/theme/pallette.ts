import { PaletteMode } from "@mui/material";
import { Palette } from "@mui/material/styles";

const getDesignTokens = (mode: PaletteMode) => {
  if (mode === "light") {
    return {
      palette: {
        primary: {
          main: "#121212",
        },
        secondary: {
          main: "#529c62",
        },
      } as Palette,
    };
  }
  return {
    palette: {
      mode: "dark",
      primary: {
        main: "#E9E003",
      },
      background: {
        default: "#2C2C2C",
      },
      secondary: {
        main: "#1D1D1D",
      },
    } as Palette,
  };
};

export { getDesignTokens as ImmortalColorsGetter };
