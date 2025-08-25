/* Imports */

/* Relative Imports */

/* Local Imports */
import { axiosInstance } from "@/config/axiosConfig";
import { AUTH_ENDPOINTS } from "../endpoints";

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
interface SendOtpApiRequest {
  phoneNumber: string;
  countryCode: string;
  channel?: string;
  clientType: string;
}

/* Function */
export const sendOtpRequest = (
  reqData: SendOtpApiRequest
): Promise<ApiResponse> => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.SEND_OTP, reqData)
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */
interface VerifyOtpApiRequest {
  phoneNumber: string;
  countryCode: string;
  otp: string;
  clientType: string;
}

/* Function */
export const verifyOtpRequest = (
  reqData: VerifyOtpApiRequest
): Promise<ApiResponse> => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.VERIFY_OTP, reqData)
    .then((response) => response.data);
};

// ----------------------------------------------------------------------

/* Interface */
interface SelectLoginOptionApiRequest {
  userId: string;
  selectedRole: string;
  selectedOutletId?: string;
  clientType: string;
}

/* Function */
export const selectLoginOptionRequest = (
  reqData: SelectLoginOptionApiRequest
): Promise<ApiResponse> => {
  return axiosInstance
    .post(AUTH_ENDPOINTS.SELECT_LOGIN_OPTION, reqData)
    .then((response) => response.data);
};

// ----------------------------------------------------------------------
