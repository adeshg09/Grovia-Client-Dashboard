import type { OUTLET_STATUS, USER_ROLES, USER_STATUS } from "@/constants";

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type OutletStatus = (typeof OUTLET_STATUS)[keyof typeof OUTLET_STATUS];

export interface OutletAdminProfileModel {
  id: string;
  phoneNumber: string;
  role: UserRole;
  status: UserStatus;
  isActivated: boolean;
  isPhoneVerified: boolean;
  profile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  outlets: [
    {
      id: string;
      name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      pincode: string;
      location: {
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
      };
      contactNumber: string;
      status: OutletStatus;
      isActive: boolean;
    }
  ];
}
