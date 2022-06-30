import { createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#111827",
      paper: "#111827", // muistaticdatepicker background
    },
    text: {
      primary: "#f5f5f5",
      disabled: "#737373",
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          background: "#0f172a",
          border: "1px solid #94a3b8",
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          textTransform: "capitalize",
          color: "white",
        },
        outlinedPrimary: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default darkTheme;
