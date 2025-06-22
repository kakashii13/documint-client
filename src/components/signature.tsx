import { Button } from "@mui/material";
import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

interface FirmaProps {
  onFirmaChange: (dataUrl: string) => void;
}

export const Firma = ({ onFirmaChange }: FirmaProps) => {
  const sigCanvasRef = useRef<SignatureCanvas | null>(null);

  const guardarFirma = () => {
    if (sigCanvasRef.current) {
      const dataUrl = sigCanvasRef.current.toDataURL("image/png");
      onFirmaChange(dataUrl);
    }
  };

  return (
    <>
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
      <Button onClick={guardarFirma} sx={{ mt: 2 }} variant="outlined">
        Guardar firma
      </Button>
    </>
  );
};
