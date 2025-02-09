import { FocusEventHandler } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

type OptionType = { label: string; value: string } | string;

type CustomSelectProps = {
  name?: string;
  value?: string;
  options: OptionType[];
  onChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  error?: string | boolean|any;
  touched?: boolean;
  label?: string;
  placeholder?: string;
  triggerClassName?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
};

const CustomSelect = ({
  name,
  value,
  options = [],
  onChange,
  onBlur,
  error,
  touched,
  label,
  placeholder = "Select option",
  required = false,
  className = "",
  triggerClassName,
  disabled = false,
}: CustomSelectProps) => {
  const getOptionLabel = (option: OptionType) =>
    typeof option === "string" ? option : option.label;
  const getOptionValue = (option: OptionType) =>
    typeof option === "string" ? option : option.value;

  return (
    <div className={cn("flex  flex-col gap-[5px]", className)}>
      {label && (
        <label htmlFor={name} className="input-label  capitalize">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Select
      
      value={value}
        onValueChange={(selectedValue) => {
          if (onChange) onChange(selectedValue);
        }}
        disabled={disabled}
        
      >
        <SelectTrigger  value={value} className={cn(`${error && "border-red-500"} py-[7px] h-fit border-gray-2/40  rounded capitalize`,triggerClassName)}>
          <SelectValue  className=""  defaultValue={value}  placeholder={placeholder} />
          
        </SelectTrigger>
        <SelectContent className="mt-1 rounded-[10px] ">
          {options.map((option) => (
            <SelectItem
              className="capitalize hover:bg-[#F6F8FA] "
              key={getOptionValue(option)}
              value={getOptionValue(option)}
            >
              {getOptionLabel(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Display error message if the field is touched and has an error */}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelect;
