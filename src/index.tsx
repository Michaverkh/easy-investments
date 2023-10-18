import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./app/index.css";
import { App } from "./app/App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Store } from "./shared/store";
import { theme } from "./app/themes/theme";
import ApiService from "./shared/api/apiService";
import { Dialog } from "./shared/components/Dialog/components";
import { dialogConfig } from "./shared/components/Dialog/config";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

export const baseUrl = process.env.REACT_APP_API_URI || "";
export const apiModule = new ApiService(baseUrl);

const store = new Store();
export const StoreContext = createContext(store);

const dialog = new Dialog(dialogConfig);
export const DialogContext = createContext(dialog);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <DialogContext.Provider value={dialog}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </DialogContext.Provider>
    </StoreContext.Provider>
  </React.StrictMode>
);
