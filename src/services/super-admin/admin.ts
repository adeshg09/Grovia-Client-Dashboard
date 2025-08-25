/* Imports */

/* Relative Imports */

/* Local Imports */
import { axiosInstance } from "@/config/axiosConfig";
import { ADMIN_DASHBOARD_ENDPOINTS } from "../endpoints";

// ----------------------------------------------------------------------

/* Interface */
interface ApiResponse {
  status: {
    response_code: number;
    response_message: string;
  };
  message: string;
  data: any;
}

// ----------------------------------------------------------------------

/* Interface */

/* Function */
export const GetAllOutletAdminsRequest = (): Promise<ApiResponse> => {
  return axiosInstance
    .get(
      ADMIN_DASHBOARD_ENDPOINTS.SUPERADMIN_DASHBOARD_ENDPOINTS
        .GET_ALL_OUTLET_ADMINS
    )
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */
interface createOutletAdminApiRequest {
  name: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  role: string;
  password: string;
  outletId: string;
}

/* Function */
export const createOutletAdminRequest = (
  reqData: createOutletAdminApiRequest
): Promise<ApiResponse> => {
  return axiosInstance
    .post(
      ADMIN_DASHBOARD_ENDPOINTS.SUPERADMIN_DASHBOARD_ENDPOINTS
        .CREATE_OUTLET_ADMIN,
      reqData
    )
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */

/* Function */

// ----------------------------------------------------------------------
