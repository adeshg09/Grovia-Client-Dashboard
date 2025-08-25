import { memo, type JSX, useState } from "react";
import clsx from "clsx";

import { Crown, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ButtonLoader from "@/components/Loader";
import { typography } from "@/theme/typography";

// Updated Types to match backend response
export interface LoginOption {
  id: string;
  phoneNumber: string;
  role: string;
  profile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  isActivated: boolean;
  isPhoneVerified: boolean;
  outlet: {
    id?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    location?: {
      type: string;
      coordinates: [number, number];
    };
    contactNumber?: string;
    status?: string;
    isActive?: boolean;
  };
  status: string;
}

interface ProcessedLoginOption {
  optionId: string;
  userId: string;
  type: "super-admin" | "outlet-admin";
  displayName: string;
  description: string;
  outletName: string;
  icon: JSX.Element;
  originalOption: LoginOption;
  outletInfo?: {
    id: string;
    name: string;
  };
}

export interface selectedLoginOption {
  userId: string;
  selectedRole: string;
  selectedOutletId?: string;
}

interface SelectLoginOptionsFormProps {
  isOpen: boolean;
  options: LoginOption[];
  onSelectOption: (selectedOption: selectedLoginOption) => void;
  isLoading?: boolean;
}

const SelectLoginOptionsForm = ({
  isOpen,
  options,
  onSelectOption,
  isLoading = false,
}: SelectLoginOptionsFormProps): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const getLoginOptionIcon = (
    type: "super-admin" | "outlet-admin"
  ): JSX.Element => {
    return type === "super-admin" ? (
      <Crown className="h-8 w-8" />
    ) : (
      <Store className="h-8 w-8" />
    );
  };

  const getLoginOptionName = (type: "super-admin" | "outlet-admin"): string => {
    return type === "super-admin" ? "Super Admin" : "Outlet Admin";
  };

  const getLoginOptionDescription = (
    type: "super-admin" | "outlet-admin"
  ): string => {
    if (type === "super-admin") {
      return "Complete system control and management";
    }
    return "Manage daily operations and inventory";
  };

  const getOutletDisplayName = (option: LoginOption): string => {
    if (option.role === "super-admin") {
      return "Grovia";
    }
    return option.outlet?.name || "Outlet";
  };

  const processLoginOptions = (
    options: LoginOption[]
  ): ProcessedLoginOption[] => {
    return options.map((option) => {
      const type =
        option.role === "super-admin" ? "super-admin" : "outlet-admin";

      return {
        optionId: `${option.id}-${type}-${option.outlet?.id}-${option.outlet?.name}`,
        userId: option.id,
        type,
        displayName: getLoginOptionName(type),
        description: getLoginOptionDescription(type),
        outletName: getOutletDisplayName(option),
        icon: getLoginOptionIcon(type),
        originalOption: option,
        outletInfo: option.outlet?.id
          ? {
              id: option.outlet.id,
              name: option.outlet.name || "Outlet",
            }
          : undefined,
      };
    });
  };

  const processedOptions = processLoginOptions(options);

  const handleOptionSelect = (optionId: string): void => {
    if (isLoading) return;
    setSelectedOption(optionId);
  };

  const handleContinue = (): void => {
    if (!selectedOption || isLoading) return;

    const selected = processedOptions.find(
      (opt) => opt.optionId === selectedOption
    );
    if (selected) {
      const selectedData: selectedLoginOption = {
        userId: selected.originalOption.id,
        selectedRole: selected.type,
        selectedOutletId: selected.outletInfo?.id || "",
      };
      onSelectOption(selectedData);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] lg:max-w-[75vw] xl:max-w-[70vw] 2xl:max-w-[65vw] max-h-[90vh] w-full border-0 bg-background dark:bg-background overflow-hidden p-0 flex flex-col rounded-lg">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 sm:px-8 lg:px-10 pt-8 pb-6 text-center border-b border-border/50">
          <DialogTitle
            className={clsx(
              typography.semibold36,
              "text-2xl sm:text-3xl lg:text-4xl mb-3"
            )}
          >
            Please select your role
          </DialogTitle>
          <DialogDescription
            className={clsx(
              typography.regular14,
              "text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto"
            )}
          >
            Choose the role you want to use for this session
          </DialogDescription>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden py-6 sm:py-8">
          {/* Desktop: Grid Layout */}
          <div className="hidden lg:block px-6 sm:px-8 lg:px-10 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center max-w-6xl mx-auto">
              {processedOptions.map((option, index) => (
                <Card
                  key={`${option.optionId}-${index}`}
                  className={clsx(
                    "cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105",
                    "border-2 w-full max-w-[280px] h-[240px]",
                    selectedOption === option.optionId
                      ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg ring-2 ring-primary/20"
                      : "border-border dark:border-border hover:border-primary/50 dark:hover:border-primary/50"
                  )}
                  onClick={() => handleOptionSelect(option.optionId)}
                >
                  <CardContent className="p-6 text-center h-full flex flex-col relative">
                    {/* Selection Indicator */}
                    {selectedOption === option.optionId && (
                      <div className="absolute top-4 right-4">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div className="mb-4">
                      <div
                        className={clsx(
                          "w-16 h-16 mx-auto rounded-xl flex items-center justify-center transition-all duration-200",
                          selectedOption === option.optionId
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground"
                        )}
                      >
                        {option.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                        {option.displayName}
                      </h3>

                      <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4 flex-1 leading-relaxed">
                        {option.description}
                      </p>

                      <Badge
                        variant={
                          selectedOption === option.optionId
                            ? "default"
                            : "secondary"
                        }
                        className="mx-auto"
                      >
                        {option.outletName}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Mobile & Tablet: Horizontal Scroll */}
          <div className="lg:hidden h-full">
            <div className="overflow-x-auto h-full px-6 sm:px-8">
              <div
                className="flex gap-4 sm:gap-6 h-full items-center pb-4"
                style={{ width: "max-content" }}
              >
                {processedOptions.map((option, index) => (
                  <Card
                    key={`${option.optionId}-${index}`}
                    className={clsx(
                      "cursor-pointer transition-all duration-300 hover:shadow-lg flex-shrink-0",
                      "border-2 w-64 sm:w-72 h-56 sm:h-64",
                      selectedOption === option.optionId
                        ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-lg"
                        : "border-border dark:border-border hover:border-primary/50 dark:hover:border-primary/50"
                    )}
                    onClick={() => handleOptionSelect(option.optionId)}
                  >
                    <CardContent className="p-5 sm:p-6 text-center h-full flex flex-col relative">
                      {/* Selection Indicator */}
                      {selectedOption === option.optionId && (
                        <div className="absolute top-4 right-4">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-foreground rounded-full"></div>
                          </div>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="mb-3 sm:mb-4">
                        <div
                          className={clsx(
                            "w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-200",
                            selectedOption === option.optionId
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted dark:bg-muted text-muted-foreground dark:text-muted-foreground"
                          )}
                        >
                          <div className="scale-75 sm:scale-100">
                            {option.icon}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground dark:text-foreground mb-2">
                          {option.displayName}
                        </h3>

                        <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground mb-3 sm:mb-4 flex-1 leading-relaxed">
                          {option.description}
                        </p>

                        <Badge
                          variant={
                            selectedOption === option.optionId
                              ? "default"
                              : "secondary"
                          }
                          className="mx-auto text-xs sm:text-sm"
                        >
                          {option.outletName}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Footer */}
        <div className="flex-shrink-0 px-6 sm:px-8 lg:px-10 pb-8 pt-6 border-t border-border/50">
          <div className="flex justify-center">
            <Button
              onClick={handleContinue}
              disabled={!selectedOption || isLoading}
              size="lg"
              className="px-12 sm:px-16 py-3 rounded-full font-medium text-base min-w-[160px] transition-all duration-200 hover:scale-105"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <ButtonLoader />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(SelectLoginOptionsForm);
