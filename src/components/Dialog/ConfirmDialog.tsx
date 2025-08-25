import React, { memo, type JSX } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ButtonLoader from "../Loader";

/**
 * Interface used to create popup dialog component for confirmation message.
 *
 * @interface ConfirmDialogProps
 * @property {boolean} open - to open and close the dialog
 * @property {string|ReactNode} title - title for the dialog
 * @property {string|ReactNode} description - describing the confirmation message
 * @property {boolean} isSubmitting - to show the loading for button
 * @property {string} agreeText - text for 'Yes' button
 * @property {string} disagreeText - text for 'No' button
 * @property {function} onAgreeAction - action for 'Yes' button
 * @property {function} onDisAgreeAction - action for 'No' button
 * @property {function} onOpenChange - callback for dialog open state change
 */
export interface ConfirmDialogProps {
  open?: boolean;
  title?: string | React.ReactNode;
  description: string | React.ReactNode;
  isSubmitting?: boolean;
  agreeText?: string;
  disagreeText?: string;
  onAgreeAction: () => void;
  onDisAgreeAction: () => void;
  onOpenChange?: (open: boolean) => void;
}

/**
 * Popup dialog component for confirmation message
 *
 * @component
 * @param {boolean} open - to open and close the dialog
 * @param {string|ReactNode} title - title for the dialog
 * @param {string|ReactNode} description - describing the confirmation message
 * @param {boolean} isSubmitting - to show the loading for button
 * @param {string} agreeText - text for 'Yes' button
 * @param {string} disagreeText - text for 'No' button
 * @param {function} onAgreeAction - action for 'Yes' button
 * @param {function} onDisAgreeAction - action for 'No' button
 * @param {function} onOpenChange - callback for dialog open state change
 * @returns {JSX.Element}
 */
const ConfirmDialog = ({
  open = false,
  title,
  description,
  isSubmitting = false,
  agreeText = "Agree",
  disagreeText = "Disagree",
  onAgreeAction,
  onDisAgreeAction,
  onOpenChange,
}: ConfirmDialogProps): JSX.Element => {
  const handleOpenChange = (newOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (!newOpen) {
      onDisAgreeAction();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogDescription className={title ? "" : "pt-2"}>
          {description}
        </DialogDescription>
        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            data-testid="buttonDisagree"
            variant="outline"
            onClick={onDisAgreeAction}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
            size="lg"
          >
            {disagreeText}
          </Button>
          <Button
            data-testid="buttonAgree"
            onClick={onAgreeAction}
            disabled={isSubmitting}
            className="w-full sm:w-auto relative"
            size="lg"
          >
            {isSubmitting ? <ButtonLoader /> : agreeText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ConfirmDialog);
