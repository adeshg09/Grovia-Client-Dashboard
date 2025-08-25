/* Imports */
import React, { useContext, type JSX } from "react";

/* Relative Imports */

/* Local Imports */
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AccountSwitcher from "./AccountSwitcher";
import { sidebarOthersConfig } from "../helper/sidebarConfig";
import SidebarConfigRenderer from "./SidebarConfigRenderer";
import { useSidebarConfig } from "../../../hooks/dashboard/useSidebarConfig";

import { Link } from "react-router-dom";
import { ROOT_PATH } from "@/routes/paths";
import AppLogo from "@/assets/images/appLogo.png";
import SessionContext from "@/context/SessionContext";

// ----------------------------------------------------------------------

/* Interface */

// ----------------------------------------------------------------------

/**
 * AppSidebar component using Shadcn Sidebar, with full typing.
 *
 * @component
 * @param props - All props supported by Sidebar
 * @returns JSX.Element
 */
const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}): JSX.Element => {
  /* Hooks */
  const { sidebarConfig } = useSidebarConfig();
  const { SwitchAccount } = useContext(SessionContext);

  /* Functions */
  /**
   * function to set token and user details in session context when account switched.
   * @param {string} token - auth token to set for api validations
   * @param {boolean} rememberMe - flag to remember user for 30 days
   * @returns {void}
   */
  const handleSwitchAccount = (
    token: string,
    selectedLoginOption: any
  ): void => {
    console.log("token", token);
    SwitchAccount(token, selectedLoginOption);
  };
  /* Output */
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="space-y-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-row items-center justify-between ">
            {/* <SidebarMenuButton asChild> */}
            <Link to={ROOT_PATH}>
              <img src={AppLogo} alt="App Logo" className="h-14" />
            </Link>
            {/* </SidebarMenuButton> */}
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
        <AccountSwitcher onAccountSwitch={handleSwitchAccount} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarConfigRenderer config={sidebarConfig} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarConfigRenderer config={sidebarOthersConfig} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
