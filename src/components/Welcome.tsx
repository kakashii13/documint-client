import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../hooks/useAuthStore";

type Props = {
  title?: string;
  subtitle?: string;
};

export const Welcome = ({ title, subtitle }: Props) => {
  const user = useAuthStore((state: any) => state.user);
  const displayTitle = title ?? `Hola, ${user?.name}`;

  return (
    <Box py={3} mb={1}>
      <Typography variant="h5" fontWeight={700} color="text.primary">
        {displayTitle}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
