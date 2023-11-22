import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { FC, useMemo, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IDialogComponentProps } from "../../../../../shared/components/Dialog/interfaces";
import { Formik } from "formik";
import useStore from "../../../../../shared/hooks/useStore";
import { getTopUpPortfolioFormSchema } from "./validationSchema";
import { observer } from "mobx-react-lite";

export const TopUpPortfolioDialogComponent: FC<IDialogComponentProps> = ({
  open,
  onClose,
}) => {
  const { portfolioStore } = useStore();
  const { assetsTree, getAssetsForTopUp, topUpPortfolio } = portfolioStore;

  const [serverError, setServerError] = useState<boolean>(false);

  const header = useRef<HTMLElement | null>();

  const { initialValues, assetItems } = useMemo(
    () => getAssetsForTopUp(),
    [assetsTree]
  );

  const validationSchema = getTopUpPortfolioFormSchema(initialValues);

  const handleSubmit = async (values: Record<string, number>) => {
    // console.log("values", values);
    try {
      await topUpPortfolio(values);
      onClose();
    } catch (err) {
      setServerError(true);
      header.current?.scrollIntoView();
    }
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
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values, errors, handleChange, handleSubmit, touched }) => {
            return (
              <form onSubmit={handleSubmit} id="form1">
                <Box
                  sx={{
                    "& > *:not(:last-child)": {
                      marginBottom: "20px",
                    },
                  }}
                >
                  <Alert severity="info">
                    {/*@ts-ignore */}
                    <span ref={header}>
                      По умолчанию даны рекомендованные значения к пополнению
                      портфеля. Вы можете отредактировать их при желании.
                    </span>
                  </Alert>
                  {serverError && (
                    <Alert severity="error">
                      Что-то пошло не так. Закройте окно и повторите попытку
                      позднее
                    </Alert>
                  )}
                  {assetItems.map((asset) => {
                    return (
                      <Box>
                        <TextField
                          key={asset.name}
                          id={`${asset.name}-id`}
                          label={asset.name}
                          variant="outlined"
                          type="number"
                          onChange={handleChange}
                          value={values[asset.name]}
                          name={asset.name}
                          sx={{ width: "100%" }}
                          error={!!touched[asset.name] && !!errors[asset.name]}
                          helperText={touched[asset.name] && errors[asset.name]}
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

export const TopUpPortfolioDialog = observer(TopUpPortfolioDialogComponent);
