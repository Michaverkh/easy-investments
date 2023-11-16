import { Box } from "@mui/material";
import { FC, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CalculatorPage } from "../../../modules/calculator/ui";
import { AuthPage } from "../../../modules/user/ui";
import { DialogSelector } from "../../../shared/components/Dialog/components/DialogSelector";
import { RouterPath } from "../../../shared/router/enums";
import { LIGHT1, DARK1 } from "../../themes/colors";
import { MainPage } from "../MainPage";
import { SideBar } from "../SideBar";
import useStore from "../../../shared/hooks/useStore";

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

export const Layout: FC = () => {
  const { userStore } = useStore();
  const { checkAuth } = userStore;

  /*
    Проверка авторизован ли пользователь
    если токен есть, то вызываем запрос
  */

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth(token);
    }
  }, []);

  return (
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
            <Route path={RouterPath.PORTFOLIO} element={<MainPage />} />
            <Route path={RouterPath.CALCULATOR} element={<CalculatorPage />} />
            <Route path={RouterPath.AUTH} element={<AuthPage />} />
          </Routes>
        </Box>
        <DialogSelector />
      </Box>
    </Box>
  );
};
