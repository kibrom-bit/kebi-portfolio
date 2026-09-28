import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes with clsx logic — prevents duplicate utility conflicts */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
