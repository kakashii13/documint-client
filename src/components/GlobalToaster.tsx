import { useAlertStore } from "../hooks/useAlertStore";
import { ToasterAlert } from "./ToastAlert";

export const GlobalToaster = () => {
  const { alert, closeAlert } = useAlertStore();

  return (
    <ToasterAlert
      open={alert.open}
      type={alert.type}
      message={alert.message}
      onClose={closeAlert}
    />
  );
};
