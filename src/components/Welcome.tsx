import { Box, Typography } from "@mui/material";
import hand from "../assets/hand.png";
import { useAuthStore } from "../hooks/useAuthStore";

export const Welcome = () => {
  const user = useAuthStore((state: any) => state.user);
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      my={2}
      width={"100%"}
    >
      <Typography variant="h5">{`Hola ${user?.name}`}</Typography>

      <img src={hand} alt="Hand icon" style={{ height: 25, marginLeft: 8 }} />
    </Box>
  );
};
