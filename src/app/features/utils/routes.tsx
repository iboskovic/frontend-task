import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import MainScreen from "../pages/MainScreen";

export enum PATHS {
  MAIN_SCREEN = "/",
  USER_PREVIEW = ":userId",
}

const ROUTES: any = [
  {
    path: PATHS.MAIN_SCREEN,
    key: "MAIN_SCREEN",
    exact: true,
    isPublic: true,
    component: () => <MainScreen />,
  },
];

export default ROUTES;

function RouteWithSubRoutes(route: any) {
  return (
    <Route
      key={route.key}
      path={route.path}
      exact={route.exact}
      render={(props: any) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export function RenderRoutes(routesObj: any) {
  const { routes } = routesObj;
  return (
    <Switch>
      {routes.map((route: any) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
    </Switch>
  );
}
