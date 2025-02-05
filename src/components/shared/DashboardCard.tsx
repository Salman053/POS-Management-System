import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
  trend?: 'up' | 'down';
  className?: string;
  isCurrency?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  label,
  isCurrency = false,
  value,
  description,
  trend,
  className,
}) => {
  // bg-gradient-to-br from-white to-gray-100
  return (
    <div
      className={`md:p-6 p-3 bg-white md:rounded-2xl mt-1.5 rounded-lg shadow-md  hover:shadow-xl transition-all duration-300  dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 ${className}`}
    >
      <div className="flex md:items-center md:flex-row flex-col justify-between">
        <div className="flex items-center md:gap-2">
          <div className="p-4 bg-blue-1 text-white rounded-xl hidden md:block shadow-md">{icon}</div>
          <div>
            <h3 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              {label}
            </h3>
            <p className="md:text-lg text-sm font-bold text-gray-900 dark:text-white mt-1 ">   {isCurrency ? `Rs. ${value}` : value}</p>
          </div>
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 text-sm font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend === 'up' ? '▲' : '▼'} 5%
          </div>
        )}
      </div>
      <p className=" text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 md:mt-3">{description}</p>
    </div>
  );
};

export default DashboardCard;