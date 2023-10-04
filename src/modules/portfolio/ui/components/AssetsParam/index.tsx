import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { isEmptyChildren } from "formik";
import { Children, FC } from "react";

interface IProps {
  valueName: string;
  value: number;
  isPercent?: boolean;
  isAssets?: boolean;
}

export const AssetsParam: FC<IProps> = ({
  valueName,
  value,
  isPercent,
  isAssets,
}) => {
  const theme = useTheme();

  const valueStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "66px",
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
              <Typography variant="body1">{value} %</Typography>
            ) : (
              <Typography variant="body1">{value}</Typography>
            )}
          </Box>
        </>
      ) : (
        <Tooltip title={valueName} placement="top">
          <Box sx={valueStyle}>
            {isPercent ? (
              <Typography variant="body1">{value} %</Typography>
            ) : (
              <Typography variant="body1">{value}</Typography>
            )}
          </Box>
        </Tooltip>
      )}
    </Box>
  );
};

/*
Предыдущая реализация

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "45px",
        backgroundColor: theme.palette.primary.main,
        borderRadius: "10px",
        padding: "5px",

        "& .assetHead": {
          display: isAssets ? "none" : "block",
          transition: "display 500ms ease",
        },
        "&:hover .assetHead": {
          display: "block",
          transition: "display 500ms ease",
        },
      }}
    >
      <Box mr="5px" className="assetHead">
        <Typography variant="body2">{valueName}</Typography>
      </Box>
      <Box sx={valueStyle}>
        {isPercent ? (
          <Typography variant="body1">{value} %</Typography>
        ) : (
          <Typography variant="body1">{value}</Typography>
        )}
      </Box>
    </Box>
  );
*/
