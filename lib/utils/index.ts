import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));
}

export function getScoreColor(score: number): string {
  if (score >= 71) return "text-green-600";
  if (score >= 41) return "text-amber-500";
  return "text-red-500";
}

export function getScoreBg(score: number): string {
  if (score >= 71) return "bg-green-50 border-green-200";
  if (score >= 41) return "bg-amber-50 border-amber-200";
  return "bg-red-50 border-red-200";
}
