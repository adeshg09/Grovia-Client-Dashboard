/* Imports */
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

/* Local Imports */
import { PAGE_SUPER_ADMIN_DASHBOARD } from "./paths";
import AuthGuard from "./guards/AuthGuard";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";

// ----------------------------------------------------------------------

/* Super Admin Dashboard Module Imports */

const MyAccountPage = lazy(
  () => import("@/views/super-admin-dashboard/my-account/MyAccount")
);

const ManageAnalyticPage = lazy(
  () =>
    import("@/views/super-admin-dashboard/dashboard/analytics/ManageAnalytic")
);

const ManageAdminPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/admins/ManageAdmin")
);

const CreateAdminPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/admins/CreateAdmin")
);

const ManageOutletPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/outlets/ManageOutlet")
);

const CreateOutletPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/outlets/CreateOutlet")
);

const ManageProductPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/products/ManageProduct")
);

const CreateProductPage = lazy(
  () => import("@/views/super-admin-dashboard/dashboard/products/CreateProduct")
);

const ManageCategoryPage = lazy(
  () =>
    import("@/views/super-admin-dashboard/dashboard/categories/ManageCategory")
);

const CreateCategoryPage = lazy(
  () =>
    import("@/views/super-admin-dashboard/dashboard/categories/CreateCategory")
);

const ManageInventoryPage = lazy(
  () =>
    import(
      "@/views/super-admin-dashboard/dashboard/inventories/ManageInventory"
    )
);

const CreateInventoryPage = lazy(
  () =>
    import(
      "@/views/super-admin-dashboard/dashboard/inventories/CreateInventory"
    )
);

const ManageProductRequestPage = lazy(
  () =>
    import(
      "@/views/super-admin-dashboard/dashboard/product-requests/ManageProductRequest"
    )
);

const NotAllowedPage = lazy(() => import("@/views/page-not-allowed"));

// ----------------------------------------------------------------------

const SuperAdminDashboardRoutes: Array<object> = [
  {
    path: PAGE_SUPER_ADMIN_DASHBOARD.root.relativePath,
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
          <Navigate to={PAGE_SUPER_ADMIN_DASHBOARD.analytics.relativePath} />
        ),
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.account.relativePath,
        element: <MyAccountPage />,
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.analytics.relativePath,
        element: <ManageAnalyticPage />,
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.admins.relativePath,
        children: [
          {
            index: true,
            element: <ManageAdminPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.admins.create.relativePath,
            element: <CreateAdminPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.admins.edit.relativePath,
            element: <CreateAdminPage />,
          },
        ],
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.outlets.relativePath,
        children: [
          {
            index: true,
            element: <ManageOutletPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.outlets.create.relativePath,
            element: <CreateOutletPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.outlets.edit.relativePath,
            element: <CreateOutletPage />,
          },
        ],
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.products.relativePath,
        children: [
          {
            index: true,
            element: <ManageProductPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.products.create.relativePath,
            element: <CreateProductPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.products.edit.relativePath,
            element: <CreateProductPage />,
          },
        ],
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.categories.relativePath,
        children: [
          {
            index: true,
            element: <ManageCategoryPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.categories.create.relativePath,
            element: <CreateCategoryPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.categories.edit.relativePath,
            element: <CreateCategoryPage />,
          },
        ],
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.inventories.relativePath,
        children: [
          {
            index: true,
            element: <ManageInventoryPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.inventories.create.relativePath,
            element: <CreateInventoryPage />,
          },
          {
            path: PAGE_SUPER_ADMIN_DASHBOARD.inventories.edit.relativePath,
            element: <CreateInventoryPage />,
          },
        ],
      },
      {
        path: PAGE_SUPER_ADMIN_DASHBOARD.productRequests.relativePath,
        element: <ManageProductRequestPage />,
      },
    ],
  },
];

export default SuperAdminDashboardRoutes;
