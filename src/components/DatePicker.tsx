import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es"; // Español
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type DatePickerProps = {
  value: string | Date | null;
  onChange: (value: string | Date | null) => void;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean | undefined;
};

export default function DatePickerCustom({
  value,
  onChange,
  label,
  disabled,
  error,
  helperText,
  required,
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        format="DD/MM/YYYY"
        value={value ? dayjs(value, "DD/MM/YYYY") : null}
        onChange={(date) =>
          onChange(date ? dayjs(date).format("DD/MM/YYYY") : "")
        }
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            error,
            helperText,
            required: required,
          },
        }}
      />
    </LocalizationProvider>
  );
}
