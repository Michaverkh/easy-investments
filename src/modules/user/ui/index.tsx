import { Alert, Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { RegistrationForm } from "./components/RegistrationForm";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";

const AuthPageComponent: FC = () => {
  const { userStore } = useStore();
  const { isLoading, login, isAuth, authErrorMessage } = userStore;
  const [tabNumber, setTabNumber] = useState<number>(0);

  const handleTabNumberChange = (
    event: SyntheticEvent,
    newValue: number
  ): void => {
    setTabNumber(newValue);
  };

  return (
    <>
      <Typography variant="h2" mb={8}>
        Войдите или зарегистрируйтесь
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: "500px", padding: "16px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Tabs value={tabNumber} onChange={handleTabNumberChange}>
              <Tab label="Войти" />
              <Tab label="Зерегистрироваться" />
            </Tabs>
          </Box>
          {authErrorMessage && (
            <Alert
              severity="error"
              sx={{
                marginBottom: "16px",
              }}
            >
              {authErrorMessage}
            </Alert>
          )}
          {tabNumber === 0 ? <LoginForm /> : <RegistrationForm />}
        </Card>
      </Box>
    </>
  );
};

export const AuthPage = observer(AuthPageComponent);
