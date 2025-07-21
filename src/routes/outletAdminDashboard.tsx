/* Imports */
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

/* Local Imports */
import { PAGE_OUTLET_ADMIN_DASHBOARD } from "./paths";
import AuthGuard from "./guards/AuthGuard";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";

// ----------------------------------------------------------------------

/* Outlet Admin Dashboard Module Imports */

const MyAccountPage = lazy(
  () => import("@/views/outlet-admin-dashboard/my-account/MyAccount")
);

const ManageAnalyticPage = lazy(
  () =>
    import("@/views/outlet-admin-dashboard/dashboard/analytics/ManageAnalytic")
);

const NotAllowedPage = lazy(() => import("@/views/page-not-allowed"));

// ----------------------------------------------------------------------

const OutletAdminDashboardRoutes: Array<object> = [
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
        path: PAGE_OUTLET_ADMIN_DASHBOARD.account.relativePath,
        element: <MyAccountPage />,
      },
      {
        path: PAGE_OUTLET_ADMIN_DASHBOARD.analytics.relativePath,
        element: <ManageAnalyticPage />,
      },
    ],
  },
];

export default OutletAdminDashboardRoutes;
