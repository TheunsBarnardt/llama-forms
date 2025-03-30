import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// llama-forms/lib/date-helpers.ts

export function formatDate(dateString: string | Date): string {
  let date: Date;

  if (typeof dateString === 'string') {
    date = new Date(dateString);
  } else {
    date = dateString;
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Handle invalid date strings
  }

  return date.toDateString();
}