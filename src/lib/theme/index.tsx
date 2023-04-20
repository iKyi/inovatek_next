import { createTheme, CssBaseline, PaletteMode } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/system";
import { createContext, ReactNode, useMemo, useState } from "react";
import { ImmortalColorsGetter } from "./pallette";

export enum FONTS {
  JAKARTA = "Plus Jakarta Sans, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  INTER = "Inter, sans-serif, Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {}
}

let TrueEstateTheme = createTheme({
  typography: {
    fontFamily: FONTS.INTER,
    h1: {
      fontFamily: FONTS.JAKARTA,
    },
    h2: {
      fontFamily: FONTS.JAKARTA,
    },
    h3: {
      fontFamily: FONTS.JAKARTA,
    },
    h4: {
      fontFamily: FONTS.JAKARTA,
    },
    h5: {
      fontFamily: FONTS.JAKARTA,
    },
    h6: {
      fontFamily: FONTS.JAKARTA,
    },
  },
  shape: {},
  spacing: 8,
});

const getOverRides = (theme: Theme) => {
  return {
    components: {
      MuiChip: {
        variants: [
          {
            props: { color: "secondary", variant: "filled" },
            style: {},
          },
        ],
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            [theme.breakpoints.up("lg")]: {
              maxWidth: "1440px",
            },
          },
        },
      },
      MuiButton: {
        variants: [
          // {
          //   props: { variant: "complex" },
          //   style: {
          //     fontSize: "1.35rem",
          //     textTransform: "none",
          //     paddingLeft: 36,
          //     paddingRight: 36,
          //     color: theme.palette.primary.main,
          //     clipPath:
          //       "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%);",
          //     "&:hover": {
          //       backgroundColor: "transparent",
          //       color: theme.palette.secondary.main,
          //     },
          //   },
          // },
        ],
        styleOverrides: {
          root: {
            fontFamily: FONTS.JAKARTA,
            position: "relative",
            borderRadius: 20,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ":root": {
            "--swiper-theme-color": `${theme.palette.primary.main} !important`,
          },
          body: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
          html: {
            height: "100%",
          },
          "& #__next": {
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
          },
          "& #root": {
            flex: 1,
          },
          p: {
            margin: 0,
          },
          ".TP,.color-primary": {
            color: theme.palette.primary.main,
          },
          ".TS,.color-secondary": {
            color: theme.palette.secondary.main,
          },
          ".bg-primary": {
            backgroundColor: theme.palette.primary.main,
            color: "#0B0A0A",
          },
          ".bg-secondary": {
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
          },
        },
      },
    },
  };
};

const ColorModeContext = createContext({ toggleColorMode: () => {} });

const InovatekThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => {
    const palette = ImmortalColorsGetter(mode);
    const themeObj = { ...TrueEstateTheme, ...palette };
    return createTheme(themeObj, getOverRides(themeObj));
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export { InovatekThemeProvider };
