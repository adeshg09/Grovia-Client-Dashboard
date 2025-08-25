/* Imports */
import React, { forwardRef, memo, type JSX } from "react";
import { Helmet } from "react-helmet-async";

/* Relative Imports */
import clsx from "clsx";

/* Local Imports */
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { typography } from "@/theme/typography";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, SettingsIcon, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ROOT_PATH } from "@/routes/paths";
import AppLogo from "@/assets/images/appLogo.png";

// ----------------------------------------------------------------------
export interface AdminDashboardPageProps {
  title?: string;
  children?: React.ReactNode;
  headerActions?: React.ReactNode;
  addButtonTitle?: string;
  onAddButtonClick?: () => void;
}

// ----------------------------------------------------------------------

/**
 * displays title, Layout for Admin Dashboard components.
 *
 * @component
 * @param {string} title - contains page title in tab bar.
 * @param {node} children - contains data or component.
 * @returns {JSX.Element}
 */

const AdminDashboardPage = forwardRef<HTMLDivElement, AdminDashboardPageProps>(
  (
    { title = "Grovia Admin Dashboard", children = <></>, headerActions } = {},
    ref
  ): JSX.Element => {
    /* Hooks */
    const { isMobile } = useSidebar();
    const location = useLocation();

    /* Constants */
    const currentYear = new Date().getFullYear();
    // const pathnames = location.pathname.split("/").filter(Boolean);
    // const breadcrumbs = [
    //   { label: "Dashboard", href: "/" },
    //   ...pathnames.map((segment, idx) => {
    //     const href = "/" + pathnames.slice(0, idx + 1).join("/");
    //     return {
    //       label: segment.charAt(0).toUpperCase() + segment.slice(1),
    //       href: idx === pathnames.length - 1 ? undefined : href, // last one is page
    //     };
    //   }),
    // ];

    /* Output */
    return (
      <div className="relative w-full h-full overflow-hidden" ref={ref}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Card className="flex flex-col h-full rounded-none bg-primary-0 dark:bg-secondary-700 p-0 gap-0">
          {/* Sticky header */}
          <CardHeader className="shrink-0 sticky top-0 z-10 border-b-2 border-b-secondary-100 dark:border-b-secondary-600 px-4 sm:px-6 py-2 flex w-full items-center bg-sidebar">
            {/* Left (Mobile only trigger OR Search on desktop) */}
            {isMobile ? (
              <div className="flex items-center gap-2 w-auto">
                <SidebarTrigger className="h-10 w-10 rounded-md bg-muted/50 hover:bg-muted" />
                <Link to={ROOT_PATH}>
                  <img src={AppLogo} alt="App Logo" className="h-10" />
                </Link>
              </div>
            ) : (
              <div className="flex-1 max-w-md lg:max-w-xl pr-4  ">
                <div className="relative w-full cursor-pointer h-full ">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10  border-0 focus-visible:ring-0 w-full bg-primary-0 dark:bg-secondary-700"
                  />
                </div>
              </div>
            )}

            {/* Middle: Search (only visible on mobile, centered) */}
            {isMobile && (
              <div className="flex-1 max-w-xs px-2">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-10  border-0 focus-visible:ring-0 w-full bg-primary-0 dark:bg-secondary-700"
                  />
                </div>
              </div>
            )}

            {/* Right section (Actions) */}
            <div className="flex items-center gap-2 sm:gap-3 w-auto ml-auto">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
              >
                <BellIcon className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
              >
                <SettingsIcon className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>

              {headerActions ? headerActions : null}
            </div>
          </CardHeader>

          {/* Scrollable content */}
          <CardContent className="flex-1 overflow-auto p-0">
            {location?.pathname?.match(/\/(analytics)/) ? (
              children
            ) : (
              <Card className="flex flex-col h-full rounded-none p-0 gap-4 bg-transparent border-none border-0 px-6 py-4">
                {/* Section Title */}
                <CardHeader className="p-0">
                  <CardTitle className={clsx(typography.regular24)}>
                    {title}
                  </CardTitle>
                </CardHeader>

                {/* Actions Row */}
                {/* {!location?.pathname?.match(/\/(create|edit)/) ? (
                  <CardHeader className="dark:border-b-secondary-600 flex w-full items-center p-0">
                    <div className="flex-1 max-w-md lg:max-w-xl pr-4  ">
                      <div className="relative w-full cursor-pointer h-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search..."
                          className="pl-10 bg-muted/50 border-0 focus-visible:ring-0 w-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 w-auto ml-auto">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
                      >
                        <SortAscIcon className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
                      >
                        <Filter className="h-5 w-5" />
                      </Button>

                      <Button
                        onClick={onAddButtonClick}
                        className="flex items-center whitespace-nowrap"
                        leftIcon={<Plus className="h-4 w-4" />}
                        size="medium"
                      >
                        Add New {addButtonTitle}
                      </Button>

                      {headerActions ? headerActions : null}
                    </div>
                  </CardHeader>
                ) : null} */}

                {/* Main children */}
                {children}
              </Card>
            )}
          </CardContent>

          {/* Sticky footer */}
          <CardFooter className="shrink-0 sticky bottom-0 z-10 border-t-2 border-t-secondary-100 dark:border-t-secondary-600 px-6 py-4 flex w-full items-center justify-between bg-sidebar">
            <CardTitle className={clsx(typography.regular12)}>
              {currentYear} Grovia. All rights reserved.
            </CardTitle>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Support</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

export default memo(AdminDashboardPage);
