import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Grid,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmailIcon from "@mui/icons-material/Email";
import { TopBar } from "../components/TopBar";
import { Link as RouterLink } from "react-router-dom";
import formTemplate from "../assets/form_template.png";

const features = [
  {
    icon: <PeopleAltIcon sx={{ color: "primary.main", fontSize: 26 }} />,
    title: "Gestión de usuarios y asesores",
    desc: "Centralizá la creación, edición y seguimiento de tus usuarios y asesores de forma intuitiva.",
  },
  {
    icon: <LinkIcon sx={{ color: "primary.main", fontSize: 26 }} />,
    title: "Links únicos y seguros",
    desc: "Generá un enlace por cada asesor para que los afiliados completen y firmen la declaración sin complicaciones.",
  },
  {
    icon: <EmailIcon sx={{ color: "primary.main", fontSize: 26 }} />,
    title: "Notificaciones automáticas",
    desc: "Recibí las declaraciones juradas directamente en tu correo y en el del asesor correspondiente.",
  },
];

export const Landing = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />

      {/* Hero */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1565C0 60%, #1E88E5 100%)",
          py: { xs: 10, md: 16 },
          color: "#fff",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4}>
                <Box>
                  <Typography
                    component="h1"
                    variant="h3"
                    fontWeight={700}
                    lineHeight={1.2}
                    mb={2}
                  >
                    Gestioná declaraciones juradas de afiliados en un solo lugar
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "rgba(255,255,255,0.75)", fontWeight: 400 }}
                  >
                    Documint te permite crear asesores, generar links únicos y
                    recibir formularios firmados directamente en tu correo.
                  </Typography>
                </Box>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/login"
                    sx={{
                      bgcolor: "#fff",
                      color: "primary.dark",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                      px: 4,
                      py: 1.5,
                    }}
                  >
                    Iniciar sesión
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }} textAlign="center">
              <Box
                component="img"
                src={formTemplate}
                alt="Vista previa del formulario de declaración jurada"
                sx={{
                  width: { xs: "100%", sm: "85%", md: "100%" },
                  maxHeight: 520,
                  objectFit: "cover",
                  borderRadius: 3,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h4" fontWeight={700} mb={1.5}>
              ¿Por qué Documint?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 520, mx: "auto" }}
            >
              Todo lo que necesitás para gestionar tus afiliaciones de forma
              simple y segura.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {features.map((f, idx) => (
              <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 3,
                    height: "100%",
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    transition: "box-shadow 0.2s, transform 0.2s",
                    "&:hover": {
                      boxShadow: "0 8px 32px rgba(21,101,192,0.12)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                    }}
                  >
                    {/* White icon */}
                    <Box sx={{ "& svg": { color: "#fff !important" } }}>
                      {f.icon}
                    </Box>
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1}>
                    {f.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {f.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          background:
            "linear-gradient(135deg, #0f172a 0%, #1565C0 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={700} mb={1.5}>
            Simplificá tus procesos hoy mismo
          </Typography>
          <Typography
            variant="body1"
            mb={4}
            sx={{ color: "rgba(255,255,255,0.75)" }}
          >
            Solicitá una cuenta y descubrí todo lo que Documint puede hacer por
            tu equipo.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/login"
            sx={{
              bgcolor: "#fff",
              color: "primary.dark",
              "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              px: 5,
              py: 1.5,
            }}
          >
            Comenzar
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          bgcolor: "#0f172a",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} Documint. Todos los derechos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default Landing;
