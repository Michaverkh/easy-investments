import { Box, Button, Tooltip } from "@mui/material";
import { FC } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface IProps {
  isEdit: boolean;
  onClickEdit: () => void;
  onClickSave: () => void;
}

export const EditButton: FC<IProps> = ({
  isEdit,
  onClickEdit,
  onClickSave,
}) => {
  const buttonStyles = {
    minWidth: "32px",
  };

  return isEdit ? (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Сохранить" placement="top">
        <Button variant="text" onClick={onClickSave} sx={buttonStyles}>
          <CheckCircleOutlineIcon fontSize="small" color="success" />
        </Button>
      </Tooltip>
      <Tooltip title="Отменить" placement="top">
        <Button variant="text" onClick={onClickEdit} sx={buttonStyles}>
          <CloseIcon fontSize="small" />
        </Button>
      </Tooltip>
    </Box>
  ) : (
    <Tooltip title="Редактировать" placement="top" sx={buttonStyles}>
      <Button variant="text" onClick={onClickEdit}>
        <EditIcon fontSize="small" />
      </Button>
    </Tooltip>
  );
};
