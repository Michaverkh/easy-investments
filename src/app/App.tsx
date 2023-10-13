import React from "react";
import PortfolioPage from "../modules/portfolio/ui/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { AppHeader } from "./components/AppHeader";
import { RoterPath } from "../shared/router/enums";
import { CalculatorPage } from "../modules/calculator/ui";
import { AppFooter } from "./components/AppFooter";
import { DialogStandard } from "../shared/components/Dialog";

const appWrapper = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

export const App = () => {
  return (
    <BrowserRouter>
      <Box sx={appWrapper}>
        <AppHeader />
        <Box
          sx={{
            flexGrow: "1",
            padding: "16px",
          }}
        >
          <Routes>
            <Route path={RoterPath.PORTFOLIO} element={<PortfolioPage />} />
            <Route path={RoterPath.CALCULATOR} element={<CalculatorPage />} />
          </Routes>
        </Box>
        <AppFooter />
        <DialogStandard open={false} onClose={() => console.log("close")} />
      </Box>
    </BrowserRouter>
  );
};
