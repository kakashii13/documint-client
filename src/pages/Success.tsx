import { useLocation } from "react-router-dom";
import { Success } from "../components/success";

export const SuccessPage = () => {
  const { text, buttonText, url } = useLocation().state as {
    text: string;
    buttonText?: string;
    url?: string;
  };

  return (
    <Success success={true} text={text} buttonText={buttonText} url={url} />
  );
};
