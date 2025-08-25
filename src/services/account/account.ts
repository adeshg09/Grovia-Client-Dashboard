/* Imports */

/* Relative Imports */

/* Local Imports */
import { axiosInstance } from "@/config/axiosConfig";
import { ACCOUNT_ENDPOINTS } from "@/services/endpoints";

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
export const getUserProfileRequest = (): Promise<ApiResponse> => {
  return axiosInstance
    .get(ACCOUNT_ENDPOINTS.GET_USER_PROFILE)
    .then((response) => response.data);
};

// ----------------------------------------------------------------------
