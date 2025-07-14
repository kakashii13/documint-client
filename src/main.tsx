import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.ts";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalToaster } from "./components/GlobalToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
      <GlobalToaster />
    </ThemeProvider>
  </StrictMode>
);
