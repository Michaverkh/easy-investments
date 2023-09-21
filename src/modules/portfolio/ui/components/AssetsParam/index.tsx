import { Box, useTheme } from "@mui/material";
import { isEmptyChildren } from "formik";
import { Children, FC } from "react";

interface IProps {
  valueName: string;
  value: number;
  isPercent?: boolean;
}

export const AssetsParam: FC<IProps> = ({ valueName, value, isPercent }) => {
  const theme = useTheme();

  const valueStyle = {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "5px",
    padding: "5px",
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        columnGap: "5px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      <Box sx={valueStyle}>{valueName}</Box>
      <Box sx={valueStyle}>{isPercent ? `${value} %` : value}</Box>
    </Box>
  );
};
