import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Overlay from "./Overlay";
import { Loader } from "lucide-react";

type ConfirmationDialogProps = {
  message?: string;
  onActionClick?: () => void;
  className?: string;
  messageClassName?: string;
  actionTextClassName?: string;
  isOpen: boolean;
  onOpenChange: () => void;
  contentClassName?: string;
  messageHeading?: string;
  actionText?: string;
  disable?: boolean;
};

const ConfirmationDialog = ({
  message,
  onActionClick,
  isOpen,
  onOpenChange,
  disable=false,
  contentClassName,
  messageHeading = "Are you sure?",
  actionText = "Confirm",
  className,

  messageClassName,
  actionTextClassName,
}: ConfirmationDialogProps) => {
  return (
    <Overlay
      //   variant="fadeInUp"
      isOpen={isOpen}
      onClose={onOpenChange}
      contentClassName={cn(
        "bg-white rounded-lg max-h-auto shadow-lg w-[90%] max-w-md p-6 space-y-4",
        contentClassName
      )}
    >
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center gap-2">
          <h3 className="text-xl select-none font-semibold text-gray-800">
            {messageHeading}
          </h3>
        </div>
        <p
          className={cn(
            "text-gray-600 select-none my-4 text-sm leading-relaxed",
            messageClassName
          )}
        >
          {message}
        </p>
        <div className="flex items-center gap-4 mt-5 justify-end">
          <Button
            disabled={disable}
            variant="outline"
            onClick={onOpenChange}
            className="hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            disabled={disable}
            variant="destructive"
            onClick={onActionClick}
            className={cn(
              "hover:bg-red-600 transition-colors",
              actionTextClassName
            )}
          >
            {actionText} {disable ? <Loader className="animate-spin"/>:""}
          </Button>
        </div>
      </div>
    </Overlay>
  );
};

export default ConfirmationDialog;
