import { memo, type JSX } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { typography } from "@/theme/typography";
import ButtonLoader from "@/components/Loader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  EnterPhoneNumberFormSchema,
  type EnterPhoneNumberFormValues,
} from "@/models/auth/auth";

interface EnterPhoneNumberFormProps {
  onSubmit: (phoneNumber: string) => void;
  isLoading?: boolean;
}

const EnterPhoneNumberForm = ({
  onSubmit,
  isLoading = false,
}: EnterPhoneNumberFormProps): JSX.Element => {
  const form = useForm<EnterPhoneNumberFormValues>({
    resolver: zodResolver(EnterPhoneNumberFormSchema),
    defaultValues: {
      txtPhoneNumber: "",
    },
  });

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
    form.setValue("txtPhoneNumber", numbersOnly);
  };

  const handleSubmit = (values: EnterPhoneNumberFormValues) => {
    onSubmit(values.txtPhoneNumber);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="txtPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={clsx(typography.regular12)}>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground pointer-events-none z-10">
                      <span className="text-sm font-medium">+91</span>
                    </div>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter 10 digit phone number"
                      onChange={handlePhoneNumberChange}
                      onInput={handlePhoneNumberChange}
                      className={cn(
                        "pl-12",
                        form.formState.errors.txtPhoneNumber &&
                          "border-destructive",
                        "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      )}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full rounded-[10px]"
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader text="Sending OTP..." /> : "Send OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default memo(EnterPhoneNumberForm);
