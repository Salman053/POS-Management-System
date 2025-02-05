
const Logo = ({ 
  isExpanded = true, 
  initials = "EP", 
  fullName = "EazyPOS",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  expandedTextColor = "text-slate-900"
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex h-8 w-8 items-center justify-center rounded-sm ${bgColor} ${textColor}`}>
        {initials}
      </div>
      {isExpanded && (
        <span className={`font-semibold ${expandedTextColor}`}>
          {fullName}
        </span>
      )}
    </div>
  );
};

export default Logo;