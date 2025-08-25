/* Imports */
import React, { type JSX } from "react";

/* Relative Imports */

/* Local Imports */
import { typography } from "@/theme/typography";
import AuthLayoutBg from "@/assets/images/authLayoutBg.png";
import clsx from "clsx";

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
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2 bg-secondary-100 overflow-hidden">
      {/* Left Section (Login Form Children) */}
      <div className="flex items-center justify-center bg-primary-0 dark:bg-secondary-900 min-h-screen p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Right Section with background image and headlines */}
      <div
        className="hidden lg:flex bg-secondary-700 items-center justify-center px-20 py-20 bg-center bg-contain"
        style={{ backgroundImage: `url(${AuthLayoutBg})` }}
      >
        {/* <img src={DashboardMockup} alt="Dashboard Mockup" /> */}
        <div
          className="flex flex-col gap-4 items-center justify-center"
          style={{ backgroundImage: `url(${AuthLayoutBg})` }}
        >
          <h1
            className={clsx(
              typography.semibold32,
              "text-primary-0 text-center"
            )}
          >
            Take Full Control of Grocery Business Operations.
          </h1>
          <p
            className={clsx(
              typography.regular14,
              "text-secondary-300 text-center"
            )}
          >
            Empowering admins with insights, tools, and control for a smoother
            grocery delivery experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
