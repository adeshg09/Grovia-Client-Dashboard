import { memo, type JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { typography } from "@/theme/typography";
import ButtonLoader from "@/components/Loader";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  EnterOtpFormSchema,
  type EnterOtpFormValues,
} from "@/models/auth/auth";
import { cn } from "@/lib/utils";

interface EnterOtpFormProps {
  isOpen: boolean;
  phoneNumber: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  onResendOtp: () => void;
  isVerifying?: boolean;
  isResending?: boolean;
}

const EnterOtpForm = ({
  isOpen,
  phoneNumber,
  onVerify,
  onBack,
  isVerifying = false,
}: EnterOtpFormProps): JSX.Element => {
  const form = useForm<EnterOtpFormValues>({
    resolver: zodResolver(EnterOtpFormSchema),
    defaultValues: {
      txtOtp: "",
    },
  });

  const handleOtpChange = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 6);
    form.setValue("txtOtp", numbersOnly);
  };

  const handleSubmit = (values: EnterOtpFormValues) => {
    onVerify(values.txtOtp);
  };

  const handleBack = () => {
    form.reset();
    onBack();
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1****$3");
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-background border-2 rounded-[10px] shadow-lg">
        <DialogHeader className="space-y-0 pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-8 w-8 p-0 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <h2 className={clsx(typography.semibold16, "text-foreground")}>
                Verify Phone Number
              </h2>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <p className={clsx(typography.regular14, "text-muted-foreground")}>
              Enter the one time password sent to
            </p>
            <p className={clsx(typography.semibold14, "text-foreground mt-1")}>
              +91 {formatPhoneNumber(phoneNumber)}
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="txtOtp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center w-full">
                        <InputOTP
                          maxLength={6}
                          inputMode="numeric"
                          value={field.value}
                          onChange={handleOtpChange}
                          containerClassName="flex justify-center w-full"
                        >
                          <InputOTPGroup className="gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot
                                key={index}
                                index={index}
                                className={cn(
                                  form.formState.errors.txtOtp &&
                                    "border-destructive"
                                )}
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage
                      className={clsx(typography.regular14, "text-center")}
                    />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <Button type="submit" className="w-full" disabled={isVerifying}>
                  {isVerifying ? (
                    <ButtonLoader text="Verifying OTP..." />
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                {/* <div className="text-center">
                  <p
                    className={clsx(
                      typography.regular12,
                      "text-muted-foreground"
                    )}
                  >
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={onResendOtp}
                      disabled={isResending}
                      className={clsx(
                        typography.semibold12,
                        "text-information-500 hover:text-information-600 underline-offset-4 hover:underline transition-colors",
                        isResending && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isResending ? "Sending..." : "Resend OTP"}
                    </button>
                  </p>
                </div> */}
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(EnterOtpForm);
