import { FC } from "react";
import useStore from "../../../shared/hooks/useStore";
import { RouterPath } from "../../../shared/router/enums";
import { Navigate } from "react-router-dom";
import { PortfolioPage } from "../../../modules/portfolio/ui";

export const MainPage: FC = () => {
  const { userStore } = useStore();
  const { isAuth } = userStore;

  return (
    <>
      {!isAuth ? (
        <Navigate to={RouterPath.AUTH} replace={true} />
      ) : (
        <PortfolioPage />
      )}
    </>
  );
};
