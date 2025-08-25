import {
  selectLoginOptionRequest,
  sendOtpRequest,
  verifyOtpRequest,
} from "@/services/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "@/components/Toast";
import { toast } from "sonner";

export const useAuth = (): any => {
  const sendOtpMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const response = await sendOtpRequest({
        phoneNumber: phoneNumber,
        countryCode: "+91",
        channel: "sms",
        clientType: "web",
      });

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("data", response);
      Toast.success({ message: "Success", description: response.message });
    },
    onError: (error: any) => {
      console.log("Send OTP error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async ({
      phoneNumber,
      otp,
    }: {
      phoneNumber: string;
      otp: string;
    }) => {
      const response = await verifyOtpRequest({
        phoneNumber: phoneNumber,
        countryCode: "+91",
        otp: otp,
        clientType: "web",
      });

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("OTP verified successfully", response);
      Toast.success({ message: "Success", description: response.message });
    },
    onError: (error: any) => {
      console.log("Verify OTP error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  const selectLoginOptionMutation = useMutation({
    mutationFn: async ({
      userId,
      selectedRole,
      selectedOutletId,
    }: {
      userId: string;
      selectedRole: string;
      selectedOutletId: string;
    }) => {
      const response = await selectLoginOptionRequest({
        userId: userId,
        selectedRole: selectedRole,
        selectedOutletId: selectedOutletId,
        clientType: "web",
      });

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("res is", response);
    },
    onError: (error: any) => {
      toast.error("Role selection failed. Please try again.", error);
    },
  });

  return {
    sendOtpMutation,
    verifyOtpMutation,
    selectLoginOptionMutation,
  };
};
