import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface IProps {
  value: string;
  label: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  errorText?: string;
  isError?: boolean;
}

export const PasswordInput: FC<IProps> = ({
  value,
  label,
  name,
  onChange,
  errorText = "",
  isError = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel htmlFor={`${name}-id`}>{label}</InputLabel>
      <OutlinedInput
        id={`${name}-id`}
        type={showPassword ? "text" : "password"}
        label={label}
        onChange={onChange}
        value={value}
        name={name}
        error={isError}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {isError && errorText && (
        <Typography
          variant="subtitle1"
          sx={{
            marginTop: "3px",
            marginRight: "14px",
            marginLeft: "14px",
          }}
        >
          {errorText}
        </Typography>
      )}
    </FormControl>
  );
};
