/* Imports */
import { memo, useEffect, useState, type JSX } from "react";

/* Relative Imports */

/* Local Imports */
import { useAuth } from "@/hooks/auth/useAuth";
import EnterPhoneNumberForm from "./EnterPhoneNumberForm";
import EnterOtpForm from "./EnterOtpForm";
import type {
  LoginOption,
  selectedLoginOption,
} from "./SelectLoginOptionsForm";
import SelectLoginOptionsForm from "./SelectLoginOptionsForm";
import {
  getTempToken,
  isValidTempToken,
  removeTempToken,
  setTempToken,
} from "@/utilities/auth";
import { Toast } from "@/components/Toast";

// ----------------------------------------------------------------------

/* Interface */
export interface SignInFormProps {
  onSubmitSuccess: (
    token: string,
    rememberMe?: boolean,
    selectedLoginOption?: any
  ) => void;
}

// ----------------------------------------------------------------------

/**
 * Sign In form with OTP-based authentication
 *
 * @component
 * @param {function} onSubmitSuccess - callback function on successful submission of sign in form
 * @returns {JSX.Element}
 */
const SignInForm = ({ onSubmitSuccess }: SignInFormProps): JSX.Element => {
  /* States */
  const [currentStep, setCurrentStep] = useState<
    "phone" | "otp" | "selectLoginOption"
  >("phone");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [availableOptions, setAvailableOptions] = useState<LoginOption[]>([]);

  /* Hooks */
  const { sendOtpMutation, verifyOtpMutation, selectLoginOptionMutation } =
    useAuth();

  /* Functions */
  const handleSendOtp = async (phone: string) => {
    setPhoneNumber(phone);
    await sendOtpMutation.mutateAsync(phone);
    setCurrentStep("otp");
  };

  const handleVerifyOtp = async (otp: string) => {
    const response = await verifyOtpMutation.mutateAsync({
      phoneNumber,
      otp,
    });

    console.log("response", response);

    // Check if login option selection is required
    if (response?.data?.requireLoginOptionsSelection) {
      setAvailableOptions(response?.data?.options);

      // Store temp token in cookies
      if (response?.data?.tempToken) {
        setTempToken(response.data.tempToken);
      }

      setCurrentStep("selectLoginOption");
    } else {
      // Auto-login case
      onSubmitSuccess(response?.data?.tokens?.accessToken, false);
    }
  };

  const handleSelectLoginOption = async (option: selectedLoginOption) => {
    console.log("option", option);
    const response = await selectLoginOptionMutation.mutateAsync({
      userId: option.userId,
      selectedRole: option.selectedRole,
      selectedOutletId: option.selectedOutletId,
    });

    console.log("response", response);

    if (
      response?.data?.tokens?.accessToken &&
      response?.data?.selectedAccount
    ) {
      onSubmitSuccess(
        response?.data?.tokens?.accessToken,
        false,
        response?.data?.selectedAccount
      );
      // removeTempToken();
    }
  };

  const handleBackToPhone = () => {
    setCurrentStep("phone");
    setPhoneNumber("");
    setAvailableOptions([]);

    // Clear temp token from cookies
    // removeTempToken();
  };

  const handleResendOtp = () => {
    sendOtpMutation.mutate(phoneNumber);
  };

  const checkExistingTempToken = () => {
    const existingTempToken = getTempToken();

    if (existingTempToken) {
      const tokenPayload = isValidTempToken(existingTempToken);

      if (tokenPayload) {
        setCurrentStep("selectLoginOption");
      } else {
        // Token is invalid or expired
        removeTempToken();
        Toast.error({
          message: "Error",
          description: "Session expired, please login again",
        });
        handleBackToPhone();
      }
    }
  };

  /* Side-Effects */
  useEffect(() => {
    checkExistingTempToken();
  }, []);

  /* Output */
  return (
    <>
      {currentStep === "phone" && (
        <EnterPhoneNumberForm
          onSubmit={handleSendOtp}
          isLoading={sendOtpMutation.isPending}
        />
      )}

      <EnterOtpForm
        isOpen={currentStep === "otp"}
        phoneNumber={phoneNumber}
        onVerify={handleVerifyOtp}
        onBack={handleBackToPhone}
        onResendOtp={handleResendOtp}
        isVerifying={verifyOtpMutation.isPending}
        isResending={sendOtpMutation.isPending}
      />

      <SelectLoginOptionsForm
        isOpen={currentStep === "selectLoginOption"}
        options={availableOptions}
        onSelectOption={handleSelectLoginOption}
        isLoading={selectLoginOptionMutation?.isPending}
      />
    </>
  );
};

export default memo(SignInForm);
