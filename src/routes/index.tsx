/* Imports */
import { Suspense, useContext, type JSX } from "react";
import { useRoutes } from "react-router-dom";

/* Local Imports */
import SessionContext from "@/context/SessionContext";
import { NotFoundRoutes, RootRoutes } from "./rootRoutes";
import FullScreenLoader from "@/components/Loader/FullScreenLoader";
import getSuperAdminDashboardRoutes from "./superAdminDashboard";
import getOutletAdminDashboardRoutes from "./outletAdminDashboard";

// ----------------------------------------------------------------------

/**
 * Create routing with the routes
 *
 * @return {JSX.Element}
 */

const Routing: React.FC = (): JSX.Element => {
  const {
    isAuthenticated,
    authToken,
    currentAccount,
    user,
    availableAccounts,
    isPageLoaded,
    isSwitchingAccount,
  } = useContext(SessionContext);

  if (isSwitchingAccount || isPageLoaded) {
    return <FullScreenLoader />;
  }
  console.log(
    "isAuthenticated",
    isAuthenticated,
    "authToken",
    authToken,
    "currentAccount",
    currentAccount,
    "user",
    user,
    "availableAccounts",
    availableAccounts,
    "isPageLoaded",
    isPageLoaded,
    "isSwitchingAccount",
    isSwitchingAccount
  );
  let dashboardRoutes: Array<object> = [];
  // const dashboardRoutes: Array<object> = SuperAdminDashboardRoutes;
  console.log("dashboardRoutes", dashboardRoutes);

  if (currentAccount) {
    console.log("currentAccount role", currentAccount?.role);

    dashboardRoutes =
      currentAccount?.role === "outlet-admin"
        ? getOutletAdminDashboardRoutes()
        : getSuperAdminDashboardRoutes();

    console.log("dashboardRoutes", dashboardRoutes);
  } else {
    // Include both route sets when user is not authenticated
    // so AuthGuard can handle the redirection
    dashboardRoutes = [
      ...getSuperAdminDashboardRoutes(),
      ...getOutletAdminDashboardRoutes(),
    ];
  }

  const routes = [...RootRoutes, ...dashboardRoutes, ...NotFoundRoutes];
  // const routes = [...dashboardRoutes, ...NotFoundRoutes];
  console.log("routes", routes);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const content = useRoutes(routes);
  console.log("content", content);

  // return <Suspense fallback={<LoadingScreen />}>{content}</Suspense>;
  return <Suspense fallback={<FullScreenLoader />}>{content}</Suspense>;
};

export default Routing;
