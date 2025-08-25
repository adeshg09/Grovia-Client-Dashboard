/* Imports */
import React, { forwardRef, memo, type JSX } from "react";
import { Helmet } from "react-helmet-async";

// ----------------------------------------------------------------------
export interface AuthPageProps {
  title?: string;
  children?: React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * displays title, Layout for Auth components.
 *
 * @component
 * @param {string} title - contains page title in tab bar.
 * @param {node} children - contains data or component.
 * @returns {JSX.Element}
 */

const AuthPage = forwardRef<HTMLDivElement, AuthPageProps>(
  (
    { title = "Grovia Admin Dashboard", children = <></> },
    ref
  ): JSX.Element => {
    return (
      <div className="relative w-full h-full" ref={ref}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        {children}
      </div>
    );
  }
);

export default memo(AuthPage);
