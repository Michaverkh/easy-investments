import PortfolioPage from "../modules/portfolio/ui/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { RouterPath } from "../shared/router/enums";
import { CalculatorPage } from "../modules/calculator/ui";
import { DialogSelector } from "../shared/components/Dialog/components/DialogSelector";
import { AuthPage } from "../modules/user/ui";
import { DARK1, LIGHT1 } from "./themes/colors";
import { SideBar } from "./components/SideBar";

const appWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: LIGHT1,
  borderRadius: "30px",
  flexGrow: "1",
  marginLeft: "82px",
};

const appShell = {
  display: "flex",
  justifyContent: "space-between",
  minHeight: "100vh",
  padding: "16px 16px 16px 0",
  backgroundColor: DARK1,
  position: "relative",
};

export const App = () => {
  return (
    <BrowserRouter>
      <Box sx={appShell}>
        <SideBar />
        <Box sx={appWrapper}>
          <Box
            sx={{
              flexGrow: "1",
              padding: "16px",
            }}
          >
            <Routes>
              <Route path={RouterPath.PORTFOLIO} element={<PortfolioPage />} />
              <Route
                path={RouterPath.CALCULATOR}
                element={<CalculatorPage />}
              />
              <Route path={RouterPath.AUTH} element={<AuthPage />} />
            </Routes>
          </Box>
          <DialogSelector />
        </Box>
      </Box>
    </BrowserRouter>
  );
};
