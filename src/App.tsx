import "./app/styles/App.scss";
import ROUTES, { RenderRoutes } from "./app/features/utils/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <RenderRoutes routes={ROUTES} />
      <ToastContainer />
    </>
  );
};

export default App;
