import { Box, Button } from "@mui/material";
import { useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignatureProps {
  onFirmaChange: (dataUrl: string) => void;
  removeOnClick?: boolean;
}

export const Signature = ({ onFirmaChange, removeOnClick }: SignatureProps) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  const guardarFirma = () => {
    if (sigCanvasRef.current) {
      const dataUrl = sigCanvasRef.current.toDataURL("image/png");
      onFirmaChange(dataUrl);
    }
  };

  // Escalar canvas al montar
  useEffect(() => {
    const canvas = sigCanvasRef.current?.getCanvas();
    const wrapper = canvasWrapperRef.current;

    if (canvas && wrapper) {
      const ratio = window.devicePixelRatio || 1;
      const width = wrapper.offsetWidth;
      const height = wrapper.offsetHeight;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      if (context) context.scale(ratio, ratio);
    }
  }, []);

  // Limpiar la firma si cambia removeOnClick
  useEffect(() => {
    if (removeOnClick && sigCanvasRef.current) {
      sigCanvasRef.current.clear();
    }
  }, [removeOnClick]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        ref={canvasWrapperRef}
        sx={{
          width: "100%",
          maxWidth: 370,
          height: 150,
          border: "1px solid #ccc",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="black"
          backgroundColor="white"
          canvasProps={{
            style: {
              width: "100%",
              height: "100%",
              display: "block",
            },
          }}
        />
      </Box>

      <Button onClick={guardarFirma} variant="contained">
        Guardar firma
      </Button>

      <Button
        onClick={() => sigCanvasRef.current?.clear()}
        variant="outlined"
        color="primary"
      >
        Limpiar firma
      </Button>
    </Box>
  );
};
