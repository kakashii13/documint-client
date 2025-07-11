import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

interface PasswordInputProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldState: any;
}

export const PasswordInput = ({
  name,
  label,
  required,
  disabled,
  field,
  fieldState,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!fieldState?.error}
      required={required || false}
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        {...field}
        id={name}
        type={showPassword ? "text" : "password"}
        label={label}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={toggleShowPassword}
              edge="end"
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {fieldState?.error && (
        <Typography color="error" variant="caption">
          {fieldState.error.message}
        </Typography>
      )}
    </FormControl>
  );
};
