import { Box } from "@mui/material";
import { TopBar } from "../components/TopBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <TopBar />
      <Box flex={1}>{children}</Box>
    </Box>
  );
};
