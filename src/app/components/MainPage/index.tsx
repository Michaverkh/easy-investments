import { FC } from "react";
import useStore from "../../../shared/hooks/useStore";
import { PortfolioPage } from "../../../modules/portfolio/ui";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";
import { AuthPage } from "../../../modules/user/ui";

const MainPageComponent: FC = () => {
  const { userStore } = useStore();
  const { isAuth, isLoading } = userStore;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isAuth) {
    return <PortfolioPage />;
  }

  return <AuthPage />;
};

export const MainPage = observer(MainPageComponent);
