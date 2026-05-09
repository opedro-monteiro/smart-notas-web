import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBrazilPhoneNumber(value: string) {
  const digits = value.replaceAll(/\D/g, "").slice(0, 11)

  if (!digits) return ""
  if (digits.length <= 2) return `(${digits}`

  const ddd = digits.slice(0, 2)
  const remaining = digits.slice(2)

  if (remaining.length <= 4) {
    return `(${ddd}) ${remaining}`
  }

  if (remaining.length <= 8) {
    return `(${ddd}) ${remaining.slice(0, 4)}-${remaining.slice(4)}`
  }

  return `(${ddd}) ${remaining.slice(0, 5)}-${remaining.slice(5)}`
}
