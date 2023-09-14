import React, { FC, useEffect } from "react";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";

const PortfolioPage: FC = () => {
  const { portfolioStore } = useStore();

  useEffect(() => {
    async function getData() {
      await portfolioStore.loadAssetsTree();
    }
    getData();
  }, []);

  console.log("assets", portfolioStore.assetsTree);

  return <div>PortfolioPage</div>;
};

export default observer(PortfolioPage);
