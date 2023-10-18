import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { FC } from "react";

interface IProps {
  valueName: string;
  renderValue: number;
  isPercent?: boolean;
  isAssets?: boolean;
}

export const AssetsReadonlyParam: FC<IProps> = ({
  valueName,
  renderValue,
  isPercent,
  isAssets,
}) => {
  const theme = useTheme();

  const valueStyle = {
    display: "flex",
    alignItems: "center",
    width: "66px",
    minHeight: "40px",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "5px",
    padding: "5px",
    "& > p": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "5px",
      }}
    >
      {!isAssets ? (
        <>
          <Box mr="5px" className="assetHead">
            <Typography variant="body2">{valueName}</Typography>
          </Box>
          <Box sx={valueStyle}>
            {isPercent ? (
              <Typography variant="body1">{renderValue} %</Typography>
            ) : (
              <Typography variant="body1">{renderValue}</Typography>
            )}
          </Box>
        </>
      ) : (
        <Tooltip title={valueName} placement="top">
          <Box sx={valueStyle}>
            {isPercent ? (
              <Typography variant="body1">{renderValue} %</Typography>
            ) : (
              <Typography variant="body1">{renderValue}</Typography>
            )}
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};
