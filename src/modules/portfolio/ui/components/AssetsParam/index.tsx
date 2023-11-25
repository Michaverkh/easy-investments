import { Box, Input, Tooltip, Typography, useTheme } from "@mui/material";
import { ChangeEvent, FC } from "react";

interface IProps {
  valueName: string;
  renderValue: number;
  inputValue: number;
  isEdit: boolean;
  inputName: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isPercent?: boolean;
  isAssets?: boolean;
  error?: string;
}

export const AssetsParam: FC<IProps> = ({
  valueName,
  renderValue,
  inputValue,
  isPercent,
  isAssets,
  isEdit,
  handleChange,
  inputName,
  error,
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
          {isEdit ? (
            <Box sx={valueStyle}>
              <Input
                type="number"
                value={inputValue}
                onChange={handleChange}
                name={inputName}
                id={`${inputName}-id`}
              />
            </Box>
          ) : (
            <Box sx={valueStyle}>
              {isPercent ? (
                <Typography variant="body1">{renderValue} %</Typography>
              ) : (
                <Typography variant="body1">{renderValue}</Typography>
              )}
            </Box>
          )}
        </>
      ) : (
        <Tooltip title={valueName} placement="top">
          {isEdit ? (
            <Box sx={valueStyle}>
              <Input
                type="number"
                value={inputValue}
                onChange={handleChange}
                name={inputName}
                id={`${inputName}-id`}
                error={!!error}
              />
            </Box>
          ) : (
            <Box sx={valueStyle}>
              {isPercent ? (
                <Typography variant="body1">{renderValue} %</Typography>
              ) : (
                <Typography variant="body1">{renderValue}</Typography>
              )}
            </Box>
          )}
        </Tooltip>
      )}
    </Box>
  );
};
