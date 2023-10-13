import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const DialogStandard: FC<IProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Modal title
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.primary.dark,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography>Content</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
