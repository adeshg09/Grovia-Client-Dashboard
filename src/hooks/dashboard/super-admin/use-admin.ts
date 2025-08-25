/* Imports */
import {
  createOutletAdminRequest,
  GetAllOutletAdminsRequest,
  GetOutletAdminByIdRequest,
  updateOutletAdminRequest,
  type createOutletAdminApiRequest,
  type updateOutletAdminApiRequest,
} from "@/services/super-admin/admin";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "@/components/Toast";

// ----------------------------------------------------------------------

export const useAdmin = (): any => {
  const createOutletAdminMutation = useMutation({
    mutationFn: async ({
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      status,
    }: createOutletAdminApiRequest) => {
      const response = await createOutletAdminRequest({
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        status,
      });

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("data", response);
      Toast.success({
        message: "Success",
        description: "Outlet admin created successfully",
      });
    },
    onError: (error: any) => {
      console.log("Create outlet admin error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  const updateOutletAdminMutation = useMutation({
    mutationFn: async ({
      adminId,
      reqData,
    }: {
      adminId: string;
      reqData: updateOutletAdminApiRequest;
    }) => {
      const response = await updateOutletAdminRequest(adminId, reqData);

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("data", response);
      Toast.success({
        message: "Success",
        description: "Outlet admin updated successfully",
      });
    },
    onError: (error: any) => {
      console.log("Update outlet admin error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  const getAllOutletAdminsMutation = useMutation({
    mutationFn: async () => {
      const response = await GetAllOutletAdminsRequest();

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("data", response);
    },
    onError: (error: any) => {
      console.log("Send OTP error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  const GetOutletAdminByIdMutation = useMutation({
    mutationFn: async (outletAdminId: string) => {
      const response = await GetOutletAdminByIdRequest(outletAdminId);

      if (response.status.response_code === 200) {
        return response;
      }
    },
    onSuccess: (response: any) => {
      console.log("data", response);
    },
    onError: (error: any) => {
      console.log("Send OTP error", error?.response?.data?.message);
      Toast.error({
        message: "Error",
        description: error?.response?.data?.message,
      });
    },
  });

  // const selectLoginOptionMutation = useMutation({
  //   mutationFn: async ({
  //     userId,
  //     selectedRole,
  //     selectedOutletId,
  //   }: {
  //     userId: string;
  //     selectedRole: string;
  //     selectedOutletId: string;
  //   }) => {
  //     const response = await selectLoginOptionRequest({
  //       userId: userId,
  //       selectedRole: selectedRole,
  //       selectedOutletId: selectedOutletId,
  //       clientType: "web",
  //     });

  //     if (response.status.response_code === 200) {
  //       return response;
  //     }
  //   },
  //   onSuccess: (response: any) => {
  //     console.log("res is", response);
  //   },
  //   onError: (error: any) => {
  //     toast.error("Role selection failed. Please try again.", error);
  //   },
  // });

  return {
    createOutletAdminMutation,
    updateOutletAdminMutation,
    getAllOutletAdminsMutation,
    GetOutletAdminByIdMutation,
  };
};
