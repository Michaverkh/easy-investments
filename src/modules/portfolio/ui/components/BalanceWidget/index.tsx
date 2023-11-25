import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";
import { MOUNTAIN2 } from "../../../../../app/themes/colors";
import { useDialog } from "../../../../../shared/components/Dialog/hooks";

interface IProps {
  totalBalance: number;
  isLoading?: boolean;
}

export const BalanceWidget: FC<IProps> = ({ isLoading, totalBalance }) => {
  const dialog = useDialog();

  return (
    <Box
      sx={{
        border: `5px solid	${MOUNTAIN2}`,
        borderRadius: "20px",
        height: "min-content",
        padding: "16px",
      }}
    >
      <Box mb={2}>
        {!isLoading ? (
          <Typography variant="h2">Баланс {totalBalance}</Typography>
        ) : (
          <CircularProgress size={20} />
        )}
      </Box>

      <Button
        variant="contained"
        onClick={() => dialog.setState("topUpPortfolio", {})}
        sx={{
          width: "100%",
        }}
      >
        Пополнить
      </Button>
    </Box>
  );
};
