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

/* Function */
export const GetOutletAdminByIdRequest = (
  adminId: string
): Promise<ApiResponse> => {
  return axiosInstance
    .get(
      ADMIN_DASHBOARD_ENDPOINTS.SUPERADMIN_DASHBOARD_ENDPOINTS.GET_OUTLET_ADMIN_BY_ID.replace(
        ":outletAdminId",
        adminId
      )
    )
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */
export interface createOutletAdminApiRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  status: string;
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
export interface updateOutletAdminApiRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  status?: string;
}

/* Function */
export const updateOutletAdminRequest = (
  adminId: string,
  reqData: updateOutletAdminApiRequest
): Promise<ApiResponse> => {
  return axiosInstance
    .patch(
      ADMIN_DASHBOARD_ENDPOINTS.SUPERADMIN_DASHBOARD_ENDPOINTS.UPDATE_OUTLET_ADMIN.replace(
        ":outletAdminId",
        adminId
      ),
      reqData
    )
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */

/* Function */

// ----------------------------------------------------------------------
