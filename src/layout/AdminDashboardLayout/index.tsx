/* Imports */
import React, { type JSX } from "react";

/* Relative Imports */

/* Local Imports */

// ----------------------------------------------------------------------

/* Interface */

/**
 * Interface used to create outer design layout for all admin dashboard pages.
 *
 * @interface AdminDashboardLayoutProps
 * @property {node} children - contains the child components.
 */
export interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Outer design layout for all admin dashboard pages
 *
 * @component
 * @param {node} children - contains the child components
 */
const AdminDashboardLayout: React.FC<AdminDashboardLayoutProps> = ({
  children,
}): JSX.Element => {
  /* Output */
  return <div>{children}</div>;
};

export default AdminDashboardLayout;
