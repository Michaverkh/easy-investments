import { FC } from "react";
import useStore from "../../../shared/hooks/useStore";
import { RouterPath } from "../../../shared/router/enums";
import { Navigate } from "react-router-dom";
import { PortfolioPage } from "../../../modules/portfolio/ui";
import { observer } from "mobx-react-lite";

const MainPageComponent: FC = () => {
  const { userStore } = useStore();
  const { isAuth } = userStore;

  // ToDo: Устранить эффект дергания компонентов

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

export const MainPage = observer(MainPageComponent);
