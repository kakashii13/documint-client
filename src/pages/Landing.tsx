import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmailIcon from "@mui/icons-material/Email";
import { TopBar } from "../components/TopBar";
import { Link as RouterLink } from "react-router-dom";
import formTemplate from "../assets/form_template.png";

export const Landing = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />

      {/* Hero */}
      <Box
        sx={{
          flexGrow: 1,
          background: {
            xs: "linear-gradient(180deg, #f5f7fa 0%, #fff 100%)",
          },
          py: { xs: 6, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={8}
            alignItems="center"
            justifyContent="center"
          >
            {/* Copy */}
            <Grid>
              <Stack
                spacing={4}
                alignItems={{ xs: "center", md: "flex-start" }}
                textAlign={{ xs: "center", md: "left" }}
              >
                <Typography component="h1" variant="h3" fontWeight={700}>
                  Gestioná usuarios, asesores y formularios en un solo lugar
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Documint te permite crear usuarios y asesores, generar links
                  únicos y recibir declaraciones juradas firmadas directamente
                  en tu correo. ¡Simplificá tu flujo de trabajo hoy mismo!
                </Typography>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="center"
                  width="100%"
                >
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/login"
                  >
                    Iniciar sesión
                  </Button>
                  {/* <Button
                    variant="outlined"
                    size="large"
                    component={RouterLink}
                    to="/signup"
                  >
                    Crear cuenta
                  </Button> */}
                </Stack>
              </Stack>
            </Grid>

            {/* Illustration */}
            <Grid textAlign="center">
              <Box
                component="img"
                src={formTemplate}
                alt="Vista previa del formulario de declaración jurada"
                sx={{
                  width: { xs: "100%", sm: "80%", md: 500 },
                  maxHeight: 700,
                  objectFit: "cover",
                  borderRadius: 4,
                  boxShadow: 3,
                  mb: 2,
                  mx: "auto",
                }}
              />
              <Typography variant="subtitle1" color="text.secondary">
                Vista previa del formulario que completarán tus afiliados
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" textAlign="center" fontWeight={600} mb={6}>
            ¿Por qué Documint?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <PeopleAltIcon fontSize="large" color="primary" />,
                title: "Gestión de Usuarios y Asesores",
                desc: "Centralizá la creación, edición y seguimiento de tus usuarios y asesores de forma intuitiva.",
              },
              {
                icon: <LinkIcon fontSize="large" color="primary" />,
                title: "Links únicos y seguros",
                desc: "Generá un enlace por cada asesor para que los afiliados completen y firmen la declaración sin complicaciones.",
              },
              {
                icon: <EmailIcon fontSize="large" color="primary" />,
                title: "Notificaciones automáticas",
                desc: "Recibí las declaraciones juradas directamente en tu correo y en el del asesor correspondiente.",
              },
            ].map((f, idx) => (
              <Grid key={idx}>
                <Card elevation={2} sx={{ height: "100%", maxWidth: "600px" }}>
                  <CardContent>
                    <Stack spacing={2} alignItems="flex-start">
                      {f.icon}
                      <Typography variant="h6" fontWeight={600}>
                        {f.title}
                      </Typography>
                      <Typography color="text.secondary">{f.desc}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to action */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: "primary.main",
          color: "primary.contrastText",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Empezá a simplificar tus procesos hoy mismo
          </Typography>
          <Typography variant="h6" mb={4}>
            Solicita una cuenta y descubrí todo lo que Documint puede hacer por
            tu equipo.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
