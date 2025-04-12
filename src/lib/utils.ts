import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}




export  const getSeason = (month = new Date().getMonth()): string => {
  if ([11, 0, 1].includes(month)) return "Winter";
  if ([2, 3, 4].includes(month)) return "Spring";
  if ([5, 6, 7].includes(month)) return "Summer";
  if ([8, 9, 10].includes(month)) return "Autumn";
  return "Unknown";
};
