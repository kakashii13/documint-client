import { Box, Container } from "@mui/material";
import FormularioDocumint from "./components/formulario";

function App() {
  return (
    <Container>
      <Box
        component="img"
        src="/src/assets/logo_client.png"
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
