import { cn } from "@/lib/utils";
import { ChangeEvent, FC, ReactNode } from "react";
import { Input } from "../ui/input";

interface CustomInputProps {
  label: string;
  value?: string|number;
  inputClassName?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | any;
  type?: "text" | "number" | "password" | "email" | "tel" | "checkbox"|'date'|'file';
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
  maxLength?:any
  readOnly?:boolean
}

const CustomInput: FC<CustomInputProps> = ({
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
}) => {
  return (
    <div className={cn("flex flex-col gap-[5px]", className)}>
      <label
        className={cn(
          "input-label capitalize",
          labelClassName
        )}
    >
        {label}
      </label>
      <Input
        disabled={disabled}
        type={type}
        value={value}
        required={required}
        min={min}
        max={max}
        name={name}
        maxLength={maxLength}
        // rightIcon={rightIcon}
        // leftIcon={leftIcon}
        onChange={onChange}
        onBlur={onBlur}
        readOnly={readOnly}
        className={cn(
          ` block w-full p-2 border  placeholder:capitalize
           focus-within:outline-gray-3 rounded shadow-sm  ${
             error ? "border-red-500" : "border-gray-300"
           }`,
          inputClassName
        )}
        placeholder={placeholder}
      />
      {error && <span className="text-red-600 text-left text-sm">{error}</span>}
    </div>
  );
};

export default CustomInput;
