import { FC } from "react";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

// Define the prop types
interface CustomCheckboxInputProps {
  label: string;
  onChange: (value: boolean) => void;
  className?: string;
  labelClassName?: string;
  description?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
}

const CustomCheckboxInput: FC<CustomCheckboxInputProps> = ({
  label,
  onChange,
  checked,
  className,
  name,
  labelClassName,
  disabled = false,
  description,
}) => {
  return (
    <div className={cn("flex items-stretch select-none", className)}>
      <Checkbox
        id="label"
        name={name}
        disabled={disabled}
        checked={checked}
        className="mr-2 rounded-md"
        onCheckedChange={onChange}
      />
      <div className="inline-flex flex-col gap-[1px]">
        <label
          htmlFor="label"
          className={cn("text-sm font-normal", labelClassName)}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-gray-2 font-normal">{description}</span>
        )}
      </div>
    </div>
  );
};

export default CustomCheckboxInput;
