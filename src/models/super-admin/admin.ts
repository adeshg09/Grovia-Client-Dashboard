import { USER_ROLES, USER_STATUS, type OUTLET_STATUS } from "@/constants";
import { z } from "zod";

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

export const OutletAdminProfileFormSchema = z.object({
  txtFirstName: z
    .string({ error: "First name is required" })
    .min(1, { error: "First name must be at least 1 character" })
    .max(50, { error: "First name must be maximum 50 characters" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      error: "Please enter only alphabetics and/or numbers",
    }),

  txtLastName: z
    .string({ error: "Last name is required" })
    .min(1, { error: "Last name must be at least 1 character" })
    .max(50, { error: "Last name must be maximum 50 characters" })
    .regex(/^[a-zA-Z0-9 ]+$/, {
      error: "Please enter only alphabetics and/or numbers",
    }),

  txtEmail: z
    .email({ error: "Please enter a valid email address" })
    .max(100, { error: "Email must be maximum 100 characters" }),

  txtPhoneNumber: z
    .string({ error: "Phone number is required" })
    .length(10, { error: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { error: "Phone number must contain only digits" }),

  ddlRole: z.enum(USER_ROLES as unknown as readonly string[], {
    error: "Please select a role",
  }),

  ddlStatus: z.enum(USER_STATUS as unknown as readonly string[], {
    error: "Please select a status",
  }),
});

export type OutletAdminProfileFormValues = z.infer<
  typeof OutletAdminProfileFormSchema
>;
