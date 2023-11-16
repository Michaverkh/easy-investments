import { Button, CircularProgress } from "@mui/material";
import { FC } from "react";

interface IProps {
  actionName: string;
  isLoading?: boolean;
  isSubmit?: boolean;
  onClick?: () => void;
}

export const ButtonWithLoader: FC<IProps> = ({
  isLoading = false,
  isSubmit = false,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick ? onClick : undefined}
      type={isSubmit ? "submit" : "button"}
      sx={{
        width: "100%",
        minHeight: "25px",
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={20}
          sx={{
            color: "white",
            marginLeft: "16px",
          }}
        />
      ) : (
        <span>Войти</span>
      )}
    </Button>
  );
};
