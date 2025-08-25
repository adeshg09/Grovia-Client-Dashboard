import { Crown, Building2 } from "lucide-react";

export const USER_ROLES = {
  SUPER_ADMIN: "super-admin",
  OUTLET_ADMIN: "outlet-admin",
};

export const USER_STATUS = {
  ACTIVE: "active",
  PENDING: "pending",
  BLOCKED: "blocked",
};

export const OUTLET_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
  UNDER_MAINTENANCE: "under-maintenance",
};

export const LOGIN_OPTION_CONFIG = {
  [USER_ROLES.SUPER_ADMIN]: {
    icon: Crown,
    displayName: "Super Admin",
    description: "Access all features and manage the entire system",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  [USER_ROLES.OUTLET_ADMIN]: {
    icon: Building2,
    displayName: "Outlet Admin",
    description: "Manage operations for this outlet",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
};

export const localStorageKeys = {
  account: {
    USER_PROFILE_KEY: "user-profile",
    AVAILABLE_ACCOUNTS_KEY: "available-accounts",
    ACTIVE_ACCOUNT_KEY: "active-account",
  },
};
