/* Imports */
import React, { useContext, type JSX } from "react";

/* Relative Imports */
import { ChevronsUpDown, Shield, Building2, User } from "lucide-react";
import SessionContext from "@/context/SessionContext";

/* Local Imports */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import clsx from "clsx";
import { typography } from "@/theme/typography";
import { selectLoginOptionRequest } from "@/services/auth/auth";

// ----------------------------------------------------------------------

/* Interface */
export interface AccountSwitcherProps {
  onAccountSwitch: (token: string, selectedLoginOption: any) => void;
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({
  onAccountSwitch,
}): JSX.Element => {
  const { isMobile } = useSidebar();
  const { currentAccount, availableAccounts } = useContext(SessionContext);

  // Helper function to get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case "super-admin":
        return Shield;
      case "outlet-admin":
        return Building2;
      default:
        return User;
    }
  };

  // Helper function to get role label
  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super-admin":
        return "Super Admin";
      case "outlet-admin":
        return "Outlet Admin";
      default:
        return role;
    }
  };

  // Helper function to get account display name (person's name)
  const getAccountName = (account: any) => {
    if (account?.profile) {
      return `${account.profile.firstName} ${account.profile.lastName}`;
    }
    return "Unknown User";
  };

  // Helper function to get organization name
  const getOrganizationName = (account: any) => {
    if (account?.role === "super-admin") {
      return "Grovia";
    } else if (account?.outlet?.name) {
      return account.outlet.name;
    }
    return "Unknown Organization";
  };

  // Handle account switching
  const handleAccountSwitch = async (selectedAccount: any) => {
    const isSameAccount =
      selectedAccount.id === currentAccount?.id &&
      selectedAccount.role === currentAccount?.role &&
      selectedAccount.outlet?.id === currentAccount?.outlet?.id;

    if (!isSameAccount) {
      try {
        // Call select-login-option API
        const response = await selectLoginOptionRequest({
          userId: selectedAccount.id,
          selectedRole: selectedAccount.role,
          selectedOutletId: selectedAccount.outlet?.id || "",
          clientType: "web",
        });

        if (
          response?.status.response_code === 200 &&
          response.data?.tokens?.accessToken
        ) {
          // Call SwitchAccount from SessionContext with new token and selected account
          onAccountSwitch(response.data?.tokens?.accessToken, selectedAccount);
        } else {
          console.error("Failed to get token for account switch");
          // You might want to show a toast notification here
        }
      } catch (error) {
        console.error("Failed to switch account:", error);
        // You might want to show a toast notification here
      }
    }
  };

  // Don't render if no current account or only one account available
  // if (!currentAccount || availableAccounts.length <= 1) {
  //   return null;
  // }

  const ActiveIcon = getRoleIcon(currentAccount.role);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-primary-0 dark:bg-secondary-600 border-2 border-secondary-100 dark:border-secondary-500 rounded-[10px] gap-2 cursor-pointer px-3 py-7"
              // disabled={isSwitchingAccount}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-full">
                {/* {isSwitchingAccount ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : ( */}
                <ActiveIcon className="size-4" />
                {/* )} */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {/* Person's Name */}
                <span className={clsx(typography.semibold14, "truncate")}>
                  {getAccountName(currentAccount)}
                </span>
                {/* Role */}
                <span
                  className={clsx(
                    typography.regular12,
                    "truncate text-secondary-300"
                  )}
                >
                  {getRoleLabel(currentAccount.role)}
                </span>
                {/* Organization Name */}
                <span
                  className={clsx(
                    typography.regular12,
                    "truncate text-secondary-400"
                  )}
                >
                  {getOrganizationName(currentAccount)}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Switch account ({availableAccounts.length})
            </DropdownMenuLabel>
            {availableAccounts.map((account, index) => {
              const AccountIcon = getRoleIcon(account.role);
              const isCurrentAccount =
                account.id === currentAccount?.id &&
                account.role === currentAccount?.role &&
                account.outlet?.id === currentAccount?.outlet?.id;

              return (
                <DropdownMenuItem
                  key={`${account.id}-${account.role}-${
                    account.outlet?.id || "no-outlet"
                  }-${index}`}
                  onClick={() => handleAccountSwitch(account)}
                  className={clsx(
                    "gap-2 p-2 cursor-pointer",
                    isCurrentAccount && "bg-accent"
                    // isSwitchingAccount && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isCurrentAccount}
                >
                  <div
                    className={clsx(
                      "flex size-6 items-center justify-center rounded-md border",
                      isCurrentAccount && "bg-primary text-primary-foreground"
                    )}
                  >
                    <AccountIcon className="size-3.5 shrink-0" />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    {/* Person's Name */}
                    <span
                      className={clsx(
                        typography.semibold12,
                        "truncate",
                        isCurrentAccount && "text-primary"
                      )}
                    >
                      {getAccountName(account)}
                    </span>
                    {/* Role */}
                    <span
                      className={clsx(
                        typography.regular12,
                        "truncate text-muted-foreground"
                      )}
                    >
                      {getRoleLabel(account.role)}
                    </span>
                    {/* Organization Name */}
                    <span
                      className={clsx(
                        typography.regular12,
                        "truncate text-muted-foreground"
                      )}
                    >
                      {getOrganizationName(account)}
                      {account.outlet?.city && ` • ${account.outlet.city}`}
                    </span>
                  </div>
                  {!isCurrentAccount && (
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  )}
                  {isCurrentAccount && <div className="text-primary">✓</div>}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default AccountSwitcher;
