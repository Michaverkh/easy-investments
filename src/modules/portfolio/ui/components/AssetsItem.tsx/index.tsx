import { Box, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { EAssetsType, IAssetsItem } from "../../../store/interfaces";
import AddIcon from "@mui/icons-material/Add";
import { AssetsParam } from "../AssetsParam";

/*
  type: EAssetsType;
  name: string;
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
  parent?: string;
*/

interface IProps extends IAssetsItem {}

export const AssetsItem: FC<IProps> = ({
  type,
  name,
  valueInPortfolio,
  factualShare,
  targetShare,
  paymentPerMonth,
}) => {
  const isAsets: boolean = type === EAssetsType.ASSETS;
  const theme = useTheme();

  const assetsItemHeader = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  };

  const assetsItemBody = {
    "& > div:not(:last-child)": {
      marginBottom: "10px",
    },
  };

  return (
    <Box
      sx={{
        width: "500px",
        display: isAsets ? "flex" : "block",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "10px",
        padding: "16px",
      }}
    >
      <Box sx={assetsItemHeader}>
        <Typography>{name}</Typography>
        {!isAsets && <AddIcon />}
      </Box>
      <Box sx={assetsItemBody}>
        <AssetsParam valueName="объем в портфеле" value={valueInPortfolio} />
        <AssetsParam valueName="доля в портфеле" value={factualShare} />
        <AssetsParam valueName="целевая доля" value={targetShare} />
        {paymentPerMonth && (
          <AssetsParam valueName="взнос" value={paymentPerMonth} />
        )}
      </Box>
    </Box>
  );
};
