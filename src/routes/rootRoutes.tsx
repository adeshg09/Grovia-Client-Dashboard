/* Imports */
import { lazy } from "react";

/* Local Imports */
import { PAGE_ROOT, ROOT_PATH } from "./paths";
import UserGuard from "./guards/UserGuard";
import AuthLayout from "@/layout/AuthLayout";
import AuthGuard from "./guards/AuthGuard";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import MyAccount from "@/views/auth/my-account/MyAccount";

// ----------------------------------------------------------------------

/* Auth Module Imports */
const SignInPage = lazy(() => import("@/views/auth/SignIn"));

const NotFoundPage = lazy(() => import("@/views/page-not-found"));

// ----------------------------------------------------------------------

/**
 * assign components to routes
 *
 * @return {array}
 */
const RootRoutes: Array<object> = [
  {
    path: ROOT_PATH,
    element: (
      <UserGuard>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </UserGuard>
    ),
  },
  {
    path: PAGE_ROOT.signIn.relativePath,
    element: (
      <UserGuard>
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      </UserGuard>
    ),
  },
  {
    path: PAGE_ROOT.account.relativePath,
    element: (
      <AuthGuard>
        <AdminDashboardLayout>
          <MyAccount />
        </AdminDashboardLayout>
      </AuthGuard>
    ),
  },
];

/**
 * assign component to no found routes
 *
 * @return {array}
 */
const NotFoundRoutes: Array<object> = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export { RootRoutes, NotFoundRoutes };
