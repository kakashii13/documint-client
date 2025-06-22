import { Container, Typography } from "@mui/material";
import FormularioDocumint from "./components/formulario";

function App() {
  return (
    <Container>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center" }}
        pb="10px"
      >
        Solicitud de Asociación - MGN
      </Typography>
      <FormularioDocumint />
    </Container>
  );
}

export default App;
