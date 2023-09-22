import { FC, useEffect, useMemo } from "react";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { IAssetsItem } from "../store/interfaces";
import { AssetsItem } from "./components/AssetsItem.tsx";

interface IAssetsItemWithChildren extends IAssetsItem {
  children?: IAssetsItemWithChildren[];
}

const getAssetsWithChildren = (
  assets: IAssetsItemWithChildren[]
): IAssetsItemWithChildren[] => {
  assets.forEach((asset) => {
    if (asset.parent) {
      const targetItem = assets.find((item) => item.name === asset.parent);

      if (targetItem) {
        targetItem.children = targetItem.children || [];
        if (
          targetItem.children.findIndex((item) => item.name === asset.name) ===
          -1
        ) {
          targetItem.children.push(asset);
        }
      }
    }
  });

  return assets;
};

const PortfolioPage: FC = () => {
  const { portfolioStore } = useStore();
  const { assetsTree } = portfolioStore;

  useEffect(() => {
    async function getData() {
      await portfolioStore.loadAssetsTree();
    }
    getData();
  }, []);

  const updatedAssets = useMemo(
    () => getAssetsWithChildren(assetsTree),
    [assetsTree]
  );

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: "16px" }}>
      <Box></Box>
      <Box
        sx={{
          "& > *:not(:last-child)": {
            marginBottom: "10px",
          },
        }}
      >
        {updatedAssets.map(
          (asset) => !asset.parent && <AssetsItem key={asset.name} {...asset} />
        )}
      </Box>
    </Box>
  );
};

export default observer(PortfolioPage);
