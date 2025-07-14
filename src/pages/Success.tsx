import { useParams } from "react-router-dom";
import { Success } from "../components/success";

export const FormSendedPage = () => {
  const { referenceNumber } = useParams();
  const response = "Su número de referencia es: " + referenceNumber;
  const title = "Formulario enviado correctamente";
  return <Success title={title} message={response} />;
};
