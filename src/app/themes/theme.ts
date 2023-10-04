import { createTheme } from "@mui/material";
import {
  DARK1,
  FLAME1,
  LIGHT1,
  SKY1,
  MOUNTAIN4,
  MOUNTAIN1,
  SKY2,
  FOREST2,
  FLAME2,
} from "./colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: DARK1,
      light: LIGHT1,
    },
    secondary: {
      main: SKY1,
    },
    info: {
      main: SKY2,
    },
  },

  typography: {
    h1: {
      fontSize: 34,
      fontWeight: "400",
      color: DARK1,
    },
    h2: {
      fontSize: 20,
      fontWeight: "bold",
      color: DARK1,
    },
    h3: {
      fontSize: 20,
      fontWeight: "500",
    },
    h4: { fontSize: 16, fontWeight: "400", color: DARK1 },
    h5: { fontSize: 14, fontWeight: "400", color: DARK1 },
    h6: { fontSize: 16, fontWeight: "bold", color: DARK1 },
    body1: { fontSize: 14, fontWeight: "bold", color: DARK1 },
    body2: { fontSize: 12, color: LIGHT1 },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {},
        },
        {
          props: { variant: "h2" },
          style: {},
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained" },
          style: {
            width: "150px",
            textTransform: "none",
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            width: "150px",
            backgroundColor: FLAME2,
          },
        },
        {
          props: { variant: "contained", color: "info" },
          style: {
            width: "150px",
            backgroundColor: FOREST2,
          },
        },
      ],
    },
  },
});
