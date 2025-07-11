import { Box } from "@mui/material";
import { TopBar } from "../components/TopBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <TopBar />
      {children}
    </Box>
  );
};
