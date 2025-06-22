import { Box, Button } from "@mui/material";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface FirmaProps {
  onFirmaChange: (dataUrl: string) => void;
  removeOnClick?: () => void;
}

export const Firma = ({ onFirmaChange, removeOnClick }: FirmaProps) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const guardarFirma = () => {
    if (sigCanvasRef.current) {
      const dataUrl = sigCanvasRef.current.toDataURL("image/png");
      onFirmaChange(dataUrl);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <SignatureCanvas
        ref={sigCanvasRef}
        penColor="black"
        backgroundColor="white"
        canvasProps={{
          width: 400,
          height: 150,
          style: {
            border: "1px solid #ccc",
            borderRadius: 4,
          },
        }}
      />
      <Button onClick={guardarFirma} variant="contained">
        Guardar firma
      </Button>
      <Button
        onClick={() => {
          if (sigCanvasRef.current) {
            sigCanvasRef.current.clear();
          }
          if (removeOnClick) {
            removeOnClick();
          }
        }}
        variant="outlined"
        color="primary"
      >
        Limpiar firma
      </Button>
    </Box>
  );
};
