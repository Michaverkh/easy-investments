import { Box, Card, Tab, Tabs, Typography } from "@mui/material";
import { FC, SyntheticEvent, useState } from "react";

export const AuthPage: FC = () => {
  const [tabNumber, setTabNumber] = useState<number>(0);

  const handleTabNumberChange = (event: SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  return (
    <>
      <Typography variant="h1">Войдите или зарегистрируйтесь</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ minWidth: "500px" }}>
          <Tabs
            value={tabNumber}
            onChange={handleTabNumberChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" />
            <Tab label="Item Two" />
          </Tabs>
          {tabNumber === 0 ? (
            <Typography>Login</Typography>
          ) : (
            <Typography>Registration</Typography>
          )}
        </Card>
      </Box>
    </>
  );
};
