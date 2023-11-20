import { FC, useEffect, useMemo } from "react";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";
import { AssetsItem } from "./components/AssetsItem.tsx";
import { getAssetsWithChildren } from "./utils/utils";
import { MOUNTAIN2 } from "../../../app/themes/colors";
import { BalanceWidget } from "./components/BalanceWidget";

const PortfolioPageComponent: FC = () => {
  const { portfolioStore } = useStore();
  const { assetsTree, isLoading, isAssetsTreeUpdated, totalBalance } =
    portfolioStore;

  useEffect(() => {
    async function getData() {
      await portfolioStore.loadAssetsTree();
    }
    getData();
  }, []);

  const updatedAssets = useMemo(
    () => getAssetsWithChildren(assetsTree),
    [assetsTree, isAssetsTreeUpdated]
  );

  const portfolioPage = {
    display: "grid",
    gridTemplateColumns: "200px auto",
    gap: "16px",
    height: "100%",
  };

  return (
    <>
      <Box sx={portfolioPage}>
        <BalanceWidget totalBalance={totalBalance} isLoading={isLoading} />
        <Box
          sx={{
            border: `5px solid	${MOUNTAIN2}`,
            borderRadius: "20px",
            padding: "16px",
          }}
        >
          <Box
            sx={{
              "& > *:not(:last-child)": {
                marginBottom: "10px",
              },
            }}
          >
            {updatedAssets.map(
              (asset) =>
                !asset.parent && <AssetsItem key={asset.name} {...asset} />
            )}
          </Box>
          {isLoading && (
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
          )}
        </Box>
      </Box>
    </>
  );
};

export const PortfolioPage = observer(PortfolioPageComponent);
