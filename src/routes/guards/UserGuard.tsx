/* Imports */

import { useContext, type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

/* Relative Imports */
import SessionContext from "@/context/SessionContext";
import {
  PAGE_OUTLET_ADMIN_DASHBOARD,
  PAGE_SUPER_ADMIN_DASHBOARD,
} from "../paths";

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create component to define protection layout for pages, which are not accessible after login.
 *
 * @interface UserGuardProps
 * @property {node} children - contains the child components.
 */
export interface UserGuardProps {
  children: React.ReactElement;
}

// ----------------------------------------------------------------------
/**
 * Component to define protection layout for pages, which are not accessible after login
 *
 * @component
 * @param {node} children - contains the child components
 * @returns {JSX.Element}
 */

const UserGuard: React.FC<UserGuardProps> = ({ children }): JSX.Element => {
  /* Hooks */
  const { isAuthenticated, user } = useContext(SessionContext);
  const location = useLocation();
  const returnUrl = new URLSearchParams(location.search).get("returnurl");

  /* Output */
  if (isAuthenticated && user) {
    let redirectPath = "";
    if (user.outlet.id) {
      redirectPath = PAGE_SUPER_ADMIN_DASHBOARD.analytics.absolutePath;
    } else {
      redirectPath = PAGE_OUTLET_ADMIN_DASHBOARD.analytics.absolutePath;
    }
    return <Navigate to={returnUrl || redirectPath} state={location.state} />;
  }

  return children;
};

export default UserGuard;
