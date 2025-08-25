/* Imports */
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

/* Local Imports */
import { PAGE_OUTLET_ADMIN_DASHBOARD } from "./paths";
import AuthGuard from "./guards/AuthGuard";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";

// ----------------------------------------------------------------------

/* Outlet Admin Dashboard Module Imports */
const ManageAnalyticPage = lazy(
  () =>
    import("@/views/outlet-admin-dashboard/dashboard/analytics/ManageAnalytic")
);

// const NotAllowedPage = lazy(() => import("@/views/page-not-allowed"));

// ----------------------------------------------------------------------

// const OutletAdminDashboardRoutes: Array<object> = [
//   {
//     path: PAGE_OUTLET_ADMIN_DASHBOARD.root.relativePath,
//     element: (
//       <AuthGuard>
//         <AdminDashboardLayout>
//           <Outlet />
//         </AdminDashboardLayout>
//       </AuthGuard>
//     ),
//     children: [
//       {
//         index: true,
//         element: (
//           <Navigate to={PAGE_OUTLET_ADMIN_DASHBOARD.analytics.relativePath} />
//         ),
//       },
//       {
//         path: PAGE_OUTLET_ADMIN_DASHBOARD.account.relativePath,
//         element: <MyAccountPage />,
//       },
//       {
//         path: PAGE_OUTLET_ADMIN_DASHBOARD.analytics.relativePath,
//         element: <ManageAnalyticPage />,
//       },
//     ],
//   },
// ];

/* Functions */
/**
 * function to fetch routes
 * @returns {void}
 */
const getOutletAdminDashboardRoutes = (): Array<object> => {
  console.log("getOutletAdminDashboardRoutes called");
  let dashboardRoutes: Array<object> = [
    {
      path: PAGE_OUTLET_ADMIN_DASHBOARD.root.relativePath,
      element: (
        <AuthGuard>
          <AdminDashboardLayout>
            <></>
          </AdminDashboardLayout>
        </AuthGuard>
      ),
    },
  ];

  dashboardRoutes = [
    {
      path: PAGE_OUTLET_ADMIN_DASHBOARD.root.relativePath,
      element: (
        <AuthGuard>
          <AdminDashboardLayout>
            <Outlet />
          </AdminDashboardLayout>
        </AuthGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <Navigate to={PAGE_OUTLET_ADMIN_DASHBOARD.analytics.relativePath} />
          ),
        },
        {
          path: PAGE_OUTLET_ADMIN_DASHBOARD.analytics.relativePath,
          element: <ManageAnalyticPage />,
        },
      ],
    },
  ];

  return dashboardRoutes;
};

export default getOutletAdminDashboardRoutes;
