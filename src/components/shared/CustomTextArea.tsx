import { cn } from "@/lib/utils";
import { ChangeEvent, FC, ReactNode } from "react";
import { Textarea } from "../ui/textarea"; 

interface CustomTextAreaProps {
  label?: string;
  value?: string | number;
  inputClassName?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string | boolean | any;
  type?: "text" | "number" | "password" | "email" | "tel" | "checkbox" | "date";
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  onBlur?: any;
  name?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  maxLength?: any;
  readOnly?: boolean;
  rows?: number; // Add rows for textarea
  cols?: number; // Add cols for textarea
}

const CustomTextArea: FC<CustomTextAreaProps> = ({
  label,
  value,
  name,
  onChange,
  error,
  min,
  maxLength,
  max,
  labelClassName,
  className,
  type = "text",
  inputClassName,
  rightIcon,
  leftIcon,
  required,
  disabled,
  onBlur,
  readOnly,
  placeholder = label,
  rows = 4, // Default row count for text area
  cols = 50, // Default column count for text area
}) => {
  return (
    <div className={cn("flex flex-col gap-[4px]", className)}>
      <label
        className={cn("input-label capitalize", labelClassName)}
      >
        {label}
      </label>
      <Textarea
        disabled={disabled}
        value={value}
        required={required}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={cn(
          `block w-full p-2 border placeholder:capitalize focus-within:outline-gray-3/80 rounded shadow-sm ${
            error ? "border-red-500" : "border-gray-300"
          }`,
          inputClassName
        )}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
      />
      {error && <span className="text-red-600 text-left text-sm">{error}</span>}
    </div>
  );
};

export default CustomTextArea;
