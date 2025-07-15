import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";

type ConfirmForm = {
  isConfirm: boolean | undefined;
  setIsConfirm: (value: boolean | undefined) => void;
};

export const ConfirmForm = ({ isConfirm, setIsConfirm }: ConfirmForm) => {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
        Confirmación importante
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Por favor, confirme que desea realizar su derivación de aportes de obra
        social a <strong>MGN Salud (Magna)</strong> y que ha sido informado/a
        sobre las prestaciones médicas disponibles.
      </Typography>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={isConfirm === true}
              onChange={() => setIsConfirm(true)}
              name="confirmacionDerivacion"
            />
          }
          label="Sí, confirmo"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isConfirm === false}
              onChange={() => setIsConfirm(false)}
              name="confirmacionDerivacion"
            />
          }
          label="No, no confirmo"
        />
      </FormGroup>
      {isConfirm === false && (
        <Typography color="red">
          Por favor contactese con su asesor para mas información.
        </Typography>
      )}
    </Box>
  );
};
