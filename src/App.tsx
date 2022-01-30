import "./app/styles/App.scss";
import ROUTES, { RenderRoutes } from "./app/features/utils/routes";

const App = () => {
  return <RenderRoutes routes={ROUTES} />;
};

export default App;
