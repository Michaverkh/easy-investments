import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";

interface IProps {
  onClick: () => void;
  tooltipText?: string;
}

export const AddItemButton: FC<IProps> = ({ tooltipText, onClick }) => {
  const buttonStyles = {
    minWidth: "32px",
  };

  return tooltipText ? (
    <Tooltip title={tooltipText} placement="top">
      <Button variant="text" onClick={onClick} sx={buttonStyles}>
        <AddIcon fontSize="small" />
      </Button>
    </Tooltip>
  ) : (
    <Button variant="text" onClick={onClick} sx={buttonStyles}>
      <AddIcon fontSize="small" />
    </Button>
  );
};
