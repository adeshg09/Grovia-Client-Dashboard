/* Imports */
import { Suspense, useContext, type JSX } from "react";
import { useRoutes } from "react-router-dom";

/* Local Imports */
import SessionContext from "@/context/SessionContext";
import OutletAdminDashboardRoutes from "./outletAdminDashboard";
import SuperAdminDashboardRoutes from "./superAdminDashboard";
import { NotFoundRoutes, RootRoutes } from "./rootRoutes";

// ----------------------------------------------------------------------

/**
 * Create routing with the routes
 *
 * @return {JSX.Element}
 */

const Routing: React.FC = (): JSX.Element => {
  const { user } = useContext(SessionContext);
  let dashboardRoutes: Array<object> = [];

  if (user) {
    dashboardRoutes = user?.outlet.id
      ? OutletAdminDashboardRoutes
      : SuperAdminDashboardRoutes;
  }

  const routes = [...RootRoutes, ...dashboardRoutes, ...NotFoundRoutes];

  const content = useRoutes(routes);

  // return <Suspense fallback={<LoadingScreen />}>{content}</Suspense>;
  return <Suspense fallback={<div>loading...</div>}>{content}</Suspense>;
};

export default Routing;
