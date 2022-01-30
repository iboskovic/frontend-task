import "./app/styles/App.scss";
import ROUTES, { RenderRoutes } from "./app/features/utils/routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <RenderRoutes routes={ROUTES} />
      <ToastContainer />
    </div>
  );
};

export default App;
