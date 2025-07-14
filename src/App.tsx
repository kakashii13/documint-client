import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";
import "./app.css";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
