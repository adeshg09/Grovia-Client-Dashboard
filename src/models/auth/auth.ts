import { z } from "zod";

export const EnterPhoneNumberFormSchema = z.object({
  txtPhoneNumber: z
    .string("Phone number is required")
    .min(10, "Phone number must be exactly 10 digits")
    .max(10, "Phone number must be exactly 10 digits")
    .regex(/^\d{10}$/, "Phone number must contain only digits"),
});

export const EnterOtpFormSchema = z.object({
  txtOtp: z
    .string("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export type EnterPhoneNumberFormValues = z.infer<
  typeof EnterPhoneNumberFormSchema
>;
export type EnterOtpFormValues = z.infer<typeof EnterOtpFormSchema>;
