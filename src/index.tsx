import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./app/index.css";
import App from "./app/App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Store } from "./shared/store";
import { theme } from "./app/themes/theme";

const store = new Store();
export const StoreContext = createContext(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StoreContext.Provider>
  </React.StrictMode>
);
