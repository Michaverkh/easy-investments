import React from "react";
import useStore from "../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { PortfolioPage } from "../modules/portfolio/ui";

const App = () => {
  const store = useStore();

  return (
    <div>
      <p>My app</p>
      <PortfolioPage />
    </div>
  );
};

export default observer(App);
