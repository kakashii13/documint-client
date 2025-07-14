import { Container, Box } from "@mui/material";
import FormularioDocumint from "../components/formulario";
import logoClient from "../assets/logo_client.png";
export const FormLayout = () => {
  return (
    <Container maxWidth="md">
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
};
