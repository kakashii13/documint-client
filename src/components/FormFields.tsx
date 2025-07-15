import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import DatePickerCustom from "./date-picker";
import { PasswordInput } from "./PasswordInput";

type FormFieldsType = {
  name: string;
  label: string;
  type: string;
  options: string[];
  dependsOn: string;
  xs: number;
  sm: number;
  md: number;
  maxLength: string;
  required: boolean;
};

type FormFieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formFields: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  advisorFixed?: boolean;
};

export const FormFields = ({
  formFields,
  control,
  advisorFixed,
}: FormFieldsProps) => {
  const watchedValues = useWatch({ control });

  return (
    <Grid container spacing={2} columns={12}>
      {formFields.map(
        ({
          name,
          label,
          type,
          options,
          dependsOn,
          xs,
          sm,
          md,
          maxLength,
          required,
        }: FormFieldsType) => {
          const watchValue = dependsOn
            ? watchedValues[dependsOn as keyof typeof watchedValues]
            : true;
          const isDisabled =
            (name === "asesor" && advisorFixed) || // ✔
            (dependsOn && !watchValue);

          return (
            <Grid key={name} size={{ xs: xs || 12, sm: sm || 6, md: md || 4 }}>
              <Controller
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                name={name as any}
                control={control}
                render={({ field, fieldState }) =>
                  type === "select" ? (
                    <TextField
                      {...field}
                      select
                      label={label}
                      fullWidth
                      disabled={Boolean(isDisabled)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      required={required || false}
                    >
                      {options?.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : type === "checkbox" ? (
                    <Box>
                      <Typography>{label}</Typography>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === true}
                              onChange={() => field.onChange(true)}
                              required={required || false}
                            />
                          }
                          label="Si"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={field.value === false}
                              onChange={() => field.onChange(false)}
                              required={required || false}
                            />
                          }
                          label="No"
                        />
                        {fieldState.error && (
                          <Typography color="error" variant="caption">
                            {fieldState.error.message}
                          </Typography>
                        )}
                      </FormGroup>
                    </Box>
                  ) : type === "password" ? (
                    <PasswordInput
                      name={name}
                      label={label}
                      required={required}
                      disabled={Boolean(isDisabled)}
                      field={field}
                      fieldState={fieldState}
                    />
                  ) : type === "textarea" ? (
                    <TextField
                      {...field}
                      label={label}
                      fullWidth
                      multiline
                      disabled={Boolean(isDisabled)}
                      rows={3}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputProps={{ maxLength: maxLength || undefined }}
                      required={required || false}
                    />
                  ) : type === "date" ? (
                    <DatePickerCustom
                      value={field.value}
                      onChange={field.onChange}
                      label={label}
                      disabled={Boolean(isDisabled)}
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      required={required || false}
                    />
                  ) : (
                    <TextField
                      {...field}
                      label={label}
                      type={type}
                      disabled={Boolean(isDisabled)}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                      inputProps={{ maxLength: maxLength || undefined }}
                      required={required || false}
                    />
                  )
                }
              />
            </Grid>
          );
        }
      )}
    </Grid>
  );
};
