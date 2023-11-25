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
} from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IDialogComponentProps } from "../../../../../shared/components/Dialog/interfaces";
import { useDialog } from "../../../../../shared/components/Dialog/hooks";
import { AddAssetDialogPayload } from "../interfaces";
import { Formik } from "formik";
import useStore from "../../../../../shared/hooks/useStore";
import { IAddAssetValues } from "../../../store/interfaces";
import { observer } from "mobx-react-lite";

const DialogStandardComponent: FC<IDialogComponentProps> = ({
  open,
  onClose,
}) => {
  const dialog = useDialog();
  const { parentName } = dialog.getState()?.payload as AddAssetDialogPayload;
  const { portfolioStore } = useStore();

  const addAssetInitialValues: IAddAssetValues = {
    name: "",
    parent: parentName,
    isAsset: true,
    valueInPortfolio: 0,
    targetShare: 0,
  };

  const handleSubmit = async (values: IAddAssetValues) => {
    await portfolioStore.addAsset(values);

    !portfolioStore.portfolioErrorMessage && onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Добавить актив / категорию в {parentName}
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
        <Formik onSubmit={handleSubmit} initialValues={addAssetInitialValues}>
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
                  {portfolioStore.portfolioErrorMessage && (
                    <Alert severity="error">
                      {portfolioStore.portfolioErrorMessage}
                    </Alert>
                  )}
                  <FormControlLabel
                    control={
                      <Switch
                        color="default"
                        checked={values.isAsset}
                        onChange={handleChange}
                      />
                    }
                    label={values.isAsset ? "Актив" : "Категория"}
                    id="isAsset-id"
                    name="isAsset"
                  />
                  <Box>
                    <TextField
                      id="name-id"
                      label="имя"
                      variant="outlined"
                      type="text"
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="valueInPortfolio-id"
                      label="объем в портфеле"
                      variant="outlined"
                      type="number"
                      onChange={handleChange}
                      value={values.valueInPortfolio}
                      name="valueInPortfolio"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                  <Box>
                    <TextField
                      id="targetShare-id"
                      label="целевая доля"
                      variant="outlined"
                      type="number"
                      onChange={handleChange}
                      value={values.targetShare}
                      name="targetShare"
                      sx={{ width: "100%" }}
                    />
                  </Box>
                </Box>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button type="submit" form="form1" variant="contained">
          Сохранить
        </Button>
        ,
      </DialogActions>
    </Dialog>
  );
};

export const DialogStandard = observer(DialogStandardComponent);
