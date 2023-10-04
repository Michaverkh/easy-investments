import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { EAssetsType, IAssetsItem } from "../../../store/interfaces";

import { AssetsParam } from "../AssetsParam";
import { EditButton } from "../../../../../shared/components/EditButton";
import { AddItemButton } from "../../../../../shared/components/AddItemButon";
import { DARK1, SUN2 } from "../../../../../app/themes/colors";

/*
  type: EAssetsType;
  name: string;
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
  parent?: string;
*/

interface IProps extends IAssetsItem {
  children?: IProps[];
}

export const AssetsItem: FC<IProps> = ({
  type,
  name,
  valueInPortfolio,
  factualShare,
  targetShare,
  paymentPerMonth,
  children,
}) => {
  const isAssets: boolean = type === EAssetsType.ASSETS;
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleAddCategory = () => {};
  const handleEdit = () => setIsEdit(!isEdit);
  const handleSave = () => {};

  const assetsItemHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isAssets ? 0 : "10px",
    marginRight: isAssets ? "10px" : 0,
  };

  const assetsItemBody = {
    display: isAssets ? "flex" : "block",
    "& > div:not(:last-child)": {
      marginBottom: isAssets ? 0 : "10px",
      marginRight: isAssets ? "10px" : 0,
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: isAssets ? "flex" : "block",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: isAssets ? "400px" : "230px",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
          padding: "16px",
          marginRight: isAssets ? 0 : "10px",
          border: `1px solid ${isEdit ? SUN2 : DARK1}`,
        }}
      >
        <Box sx={assetsItemHeader}>
          <Typography variant="h6">{name}</Typography>
          {!isAssets && (
            <Box sx={{ display: "flex" }}>
              {!isEdit && (
                <AddItemButton
                  onClick={handleAddCategory}
                  tooltipText="Добавить категорию"
                />
              )}
              <EditButton
                isEdit={isEdit}
                onClickEdit={handleEdit}
                onClickSave={handleSave}
              />
            </Box>
          )}
        </Box>
        <Box sx={assetsItemBody}>
          <AssetsParam
            valueName="объем в портфеле"
            value={valueInPortfolio}
            isAssets={isAssets}
          />
          <AssetsParam
            valueName="доля в портфеле"
            value={factualShare}
            isAssets={isAssets}
          />
          <AssetsParam
            valueName="целевая доля"
            value={targetShare}
            isAssets={isAssets}
          />
          {paymentPerMonth && (
            <AssetsParam valueName="взнос" value={paymentPerMonth} />
          )}
          {isAssets && (
            <EditButton
              isEdit={isEdit}
              onClickEdit={handleEdit}
              onClickSave={handleSave}
            />
          )}
        </Box>
      </Box>
      {children && (
        <Box
          sx={{
            "& > *:not(:last-child)": {
              marginBottom: "10px",
            },
          }}
        >
          {children.map((child) => {
            return <AssetsItem key={child.name} {...child} />;
          })}
        </Box>
      )}
    </Box>
  );
};
