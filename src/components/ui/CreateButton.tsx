import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const CreateButton = ({
  handleCreate,
  text,
}: {
  handleCreate: () => void;
  text: string;
}) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleCreate}
      size="small"
    >
      {text}
    </Button>
  );
};
