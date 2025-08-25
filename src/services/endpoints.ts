export const AUTH_ENDPOINTS = {
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify-otp",
  SELECT_LOGIN_OPTION: "/auth/select-login-option",
};

export const ACCOUNT_ENDPOINTS = {
  GET_USER_PROFILE: "/admin/get-profile",
};

export const ADMIN_DASHBOARD_ENDPOINTS = {
  SUPERADMIN_DASHBOARD_ENDPOINTS: {
    CREATE_OUTLET_ADMIN: "/admin/create-outlet-admin-profile",
    UPDATE_OUTLET_ADMIN: "/admin/update-outlet-admin-profile/:outletAdminId",
    DELETE_OUTLET_ADMIN: "/admin/delete-outlet-admin-profile/:outletAdminId",
    GET_OUTLET_ADMIN_BY_ID:
      "/admin/get-outlet-admin-profile-by-id/:outletAdminId",
    GET_ALL_OUTLET_ADMINS: "/admin/get-all-outlet-admins-profile",
  },
};
