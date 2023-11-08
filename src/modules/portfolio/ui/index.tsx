import { FC, useEffect, useMemo } from "react";
import useStore from "../../../shared/hooks/useStore";
import { observer } from "mobx-react-lite";
import { Box, CircularProgress } from "@mui/material";
import { AssetsItem } from "./components/AssetsItem.tsx";
import { getAssetsWithChildren } from "./utils/utils";
import { MOUNTAIN2 } from "../../../app/themes/colors";

const PortfolioPage: FC = () => {
  const { portfolioStore } = useStore();
  const { assetsTree, isLoading, isAssetsTreeUpdated } = portfolioStore;

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
    gridTemplateColumns: "1fr 3fr",
    gap: "16px",
    height: "100%",
  };

  return (
    <Box sx={portfolioPage}>
      <Box></Box>
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
  );
};

export default observer(PortfolioPage);

/*
Старая реализация с общим редактированием

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            marginBottom: "16px",
          }}
        >
          {isEdit ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                "& > *:not(:last-child)": {
                  marginRight: "16px",
                },
              }}
            >
              <Button
                variant="contained"
                color="info"
                onClick={handleSaveChanges}
              >
                Сохранить
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                Отменить
              </Button>
            </Box>
          ) : (
            <Button variant="contained" onClick={handleEdit}>
              Редактировать
            </Button>
          )}
        </Box>
*/
