import { ClassValue, clsx } from "clsx";
import { bg_header } from "reportlab/lib/colors";
import { cls } from "spacy/lang/fr";
import { tailwindMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  // Simple fallback/shim if tailwind-merge has issues or just use standard merge
  return inputs.filter(Boolean).join(" ");
}