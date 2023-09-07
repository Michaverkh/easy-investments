import { createTheme } from "@mui/material";
import { DARK1, FLAME1, LIGHT1, SKY1, MOUNTAIN4, MOUNTAIN1 } from "./colors";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: DARK1,
      light: MOUNTAIN4,
    },
    secondary: {
      main: SKY1,
    },
    info: {
      main: LIGHT1,
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
      color: SKY1,
    },
    h3: {
      fontSize: 20,
      fontWeight: "500",
    },
    h4: { fontSize: 16, fontWeight: "400", color: MOUNTAIN1 },
    h5: { fontSize: 14, fontWeight: "400", color: MOUNTAIN1 },
    h6: { fontSize: 14, fontWeight: "400", color: FLAME1 },
    body1: { fontSize: 16 },
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
          props: { variant: "dashed" },
          style: {
            textTransform: "none",
            border: `2px dashed black`,
            color: "red",
          },
        },
        {
          props: { variant: "dashed", color: "secondary" },
          style: {
            border: `4px dashed red`,
            color: "red",
          },
        },
      ],
    },
  },
});
