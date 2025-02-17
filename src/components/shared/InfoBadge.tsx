import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
const variantStyles = {
  success: "bg-green-100 text-green-800 border-green-300 animate-success",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300 animate-warning",
  error: "bg-red-100 text-red-800 border-red-300 animate-shake",
  info: "bg-blue-100 text-blue-800 border-blue-300 animate-fade",
};

const iconMap = {
  success: <CheckCircle className="w-5 h-5 text-green-600" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-600" />,
  error: <XCircle className="w-5 h-5 text-red-600" />,
  info: <Info className="w-5 h-5 text-blue-600" />,
};

const sizeStyles = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

import { ReactNode } from "react";

type Variant = 'success' | 'warning' | 'error' | 'info';
const InfoBadge = ({ variant = "info", size = "md", children, message, icon = true }: { 
  variant?: Variant, 
  message?: string, 
  size?: keyof typeof sizeStyles, 
  children?: ReactNode, 
  icon?: boolean 
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border text-sm rounded-lg font-medium",
        "transition-all duration-900",
        variantStyles[variant],
        sizeStyles[size]
      )}
    >
      {icon && (
        <span className="animate-bounce-gentle">
          {iconMap[variant]}
        </span>
      )}
      <div className="flex-1">
        {message && <span>{message}</span>}
        <span>{children}</span>
      </div>
    </div>
  );
};

export default InfoBadge;