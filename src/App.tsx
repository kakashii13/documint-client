import { Box, Container } from "@mui/material";
import FormularioDocumint from "./components/formulario";
import logoClient from "../assets/logo_client.png";

function App() {
  return (
    <Container>
      <Box
        component="img"
        src={logoClient}
        alt="Logo Documint"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: 2,
        }}
      />
      <FormularioDocumint />
    </Container>
  );
}

export default App;
