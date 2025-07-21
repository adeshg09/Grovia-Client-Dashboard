/* Imports */
import { lazy } from "react";

/* Local Imports */
import { PAGE_ROOT, ROOT_PATH } from "./paths";
import UserGuard from "./guards/UserGuard";
import AuthLayout from "@/layout/AuthLayout";

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
