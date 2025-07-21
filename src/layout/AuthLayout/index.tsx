/* Imports */
import React, { type JSX } from "react";

/* Relative Imports */

/* Local Imports */

// ----------------------------------------------------------------------

/* Interface */

/**
 * Interface used to create outer design layout for all auth pages.
 *
 * @interface AuthLayoutProps
 * @property {node} children - contains the child components.
 */
export interface AuthLayoutProps {
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Outer design layout for all auth pages
 *
 * @component
 * @param {node} children - contains the child components
 */

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }): JSX.Element => {
  /* Output */
  return <div>{children}</div>;
};

export default AuthLayout;
