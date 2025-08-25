/* Imports */
import { useContext } from "react";

/* Local Imports */
import SessionContext from "@/context/SessionContext";
import { 
  superAdminSidebarConfig, 
  outletAdminSidebarConfig 
} from "@/layout/AdminDashboardLayout/helper/sidebarConfig";

// ----------------------------------------------------------------------

/**
 * Custom hook to get the appropriate sidebar configuration based on user role
 *
 * @returns {object} The sidebar configuration for the current user
 */
export const useSidebarConfig = () => {
  const { user } = useContext(SessionContext);

  // Determine which config to use based on user role
  // If user has outlet.id, they are an outlet admin, otherwise super admin
  const isOutletAdmin = user?.outlet?.id;
  
  const sidebarConfig = isOutletAdmin 
    ? outletAdminSidebarConfig 
    : superAdminSidebarConfig;

  return {
    sidebarConfig,
    userRole: isOutletAdmin ? "outlet-admin" : "super-admin",
    isOutletAdmin,
  };
};
