import React, { FC, useEffect } from "react";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { EAssetsType } from "../store/interfaces";
import { AssetsItem } from "./components/AssetsItem.tsx";

const PortfolioPage: FC = () => {
  const { portfolioStore } = useStore();

  useEffect(() => {
    async function getData() {
      await portfolioStore.loadAssetsTree();
    }
    getData();
  }, []);

  console.log("assets", portfolioStore.assetsTree);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px" }}>
      <Box sx={{ height: "100px" }}></Box>
      <Box sx={{ height: "100px" }}>
        <AssetsItem
          name="Фондовый рынок"
          type={EAssetsType.CATHEGORY}
          valueInPortfolio={100}
          factualShare={100}
          targetShare={100}
          paymentPerMonth={2000}
        />
      </Box>
    </Box>
  );
};

export default observer(PortfolioPage);
