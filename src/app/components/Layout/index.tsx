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
  backgroundColor: LIGHT1,
  marginLeft: "82px",
  padding: "16px",
  overflowX: "scroll",
  minHeight: "100vh",
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
    <>
      <SideBar />
      <Box sx={appWrapper}>
        <Box
          sx={{
            flexGrow: "1",
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
    </>
  );
};
