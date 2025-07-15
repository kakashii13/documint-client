import { Success } from "../components/Success";
import { useParams } from "react-router-dom";

export const FormSendedPage = () => {
  const { referenceNumber } = useParams();
  const response = "Su número de referencia es: " + referenceNumber;
  const title = "Formulario enviado correctamente";
  return <Success title={title} message={response} />;
};
