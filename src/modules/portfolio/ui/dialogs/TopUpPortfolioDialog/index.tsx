import { createPortal } from "react-dom";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IDialogComponentProps } from "../../../../../shared/components/Dialog/interfaces";
import { useDialog } from "../../../../../shared/components/Dialog/hooks";
import { AddAssetDialogPayload, TopUpPortfolioValues } from "../interfaces";
import { Formik } from "formik";
import useStore from "../../../../../shared/hooks/useStore";

export const TopUpPortfolioDialog: FC<IDialogComponentProps> = ({
  open,
  onClose,
}) => {
  const dialog = useDialog();

  const { portfolioStore } = useStore();
  const { assetsTree, getAssetsForTopUp } = portfolioStore;

  const { initialValues, assetItems } = useMemo(
    () => getAssetsForTopUp(),
    [assetsTree]
  );

  const handleSubmit = (values: Record<string, number>) => {
    console.log("values", values);

    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Пополнить портфель
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
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
          {({ values, errors, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit} id="form1">
                <Box
                  sx={{
                    "& > *:not(:last-child)": {
                      marginBottom: "20px",
                    },
                  }}
                >
                  {true && <Alert severity="error">Кастомная ошибка</Alert>}
                  <Alert severity="info">
                    По умолчанию даны рекомендованные значения к пополнению
                    портфеля. Вы можете отредактировать их при желании.
                  </Alert>
                  {assetItems.map((asset) => {
                    return (
                      <Box>
                        <TextField
                          id={`${asset.name}-id`}
                          label={asset.name}
                          variant="outlined"
                          type="number"
                          onChange={handleChange}
                          value={values[asset.value]}
                          name={asset.name}
                          sx={{ width: "100%" }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="form1" variant="contained">
          Пополнить
        </Button>
      </DialogActions>
    </Dialog>
  );
};
