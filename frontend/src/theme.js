import { createTheme } from "@mui/material/styles";
import { createContext, useState, useMemo } from "react";
import {
  amber,
  blue,
  green,
  grey,
  lightGreen,
  red,
  teal,
} from "@mui/material/colors";

export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              light: blue[400],
              main: blue[500],
              dark: blue[600],
              contrast: blue[100],
              contrastText: "#fff",
            },
            secondary: {
              light: teal[100],
              main: teal[200],
              dark: teal[300],
              contrast: teal[700],
              contrastText: "#fff",
            },
            extra: {
              light: green[100],
              main: green[200],
              dark: green[300],
              contrast: green[700],
              contrastText: "#000",
            },
            background: {
              light: "#fcfcfc",
              main: "#fafcfe",
              dark: "#f5f5f5",
              contrast: "#f3f3f3",
              contrastText: "#191919",
            },
            text: {
              light: "#4e4f51",
              main: "#3a3b3e",
              dark: "#343538",
              contrast: "#cacaca",
            },
            soft: {
              warning: {
                light: amber[50],
                main: amber[700],
              },
              success: {
                light: lightGreen[50],
                main: lightGreen[700],
              },
              info: {
                light: blue[50],
                main: blue[700],
              },
              error: {
                light: red[50],
                main: red[700],
              },
              default: {
                light: grey[200],
                main: grey[700],
              },
            },
          }
        : {
            primary: {
              light: blue[400],
              main: blue[500],
              dark: blue[600],
              contrast: blue[100],
              contrastText: "#504b4b",
            },
            secondary: {
              light: teal[100],
              main: teal[200],
              dark: teal[300],
              contrast: teal[700],
              contrastText: "#e4e4e4",
            },
            background: {
              light: "#3d3d3d",
              main: "#272727",
              dark: "#333333",
              contrast: "#555555",
              contrastText: "#fafcfe",
            },
            text: {
              light: "#e4e4e4",
              main: "#cacaca",
              dark: "#b1b1b1",
              contrast: "#3a3b3e",
            },
            soft: {
              warning: {
                light: amber[50] + "10",
                main: amber[700],
              },
              success: {
                light: lightGreen[50] + "10",
                main: lightGreen[700],
              },
              info: {
                light: blue[50] + "10",
                main: blue[700],
              },
              error: {
                light: red[50] + "10",
                main: red[700],
              },
              default: {
                light: grey[700] + "52",
                main: grey[200] + "ff",
              },
            },
          }),
    },
    components: {
      /*MuiChip: {
              styleOverrides: {
                root: ({ ownerState, theme }) =>
                  ownerState.variant === "soft" && {
                    backgroundColor:
                      ownerState.color === "success"
                        ? theme.palette.soft.success.light
                        : ownerState.color === "info"
                        ? theme.palette.soft.info.light
                        : ownerState.color === "warning"
                        ? theme.palette.soft.warning.light
                        : ownerState.color === "error"
                        ? theme.palette.soft.error.light
                        : theme.palette.soft.default.light,
                    color:
                      ownerState.color === "success"
                        ? theme.palette.soft.success.main
                        : ownerState.color === "info"
                        ? theme.palette.soft.info.main
                        : ownerState.color === "warning"
                        ? theme.palette.soft.warning.main
                        : ownerState.color === "error"
                        ? theme.palette.soft.error.main
                        : theme.palette.soft.default.main,
                  },
              },
            },*/
      MuiPaper: {
        /*styleOverrides: {
                  root: ({ ownerState, theme }) => ({
                    backgroundColor: theme.palette.background.light,
                  }),
                },*/
      },
      MuiTypography: {
        /*styleOverrides: {
                  root: ({ ownerState, theme }) => ({
                    color: theme.palette.text.main,
                  }),
                },*/
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
