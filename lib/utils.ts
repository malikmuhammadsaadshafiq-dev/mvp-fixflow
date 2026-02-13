import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function calculateCostEstimate(category: string, priority: string) {
  const baseCosts: Record<string, number> = {
    plumbing: 120,
    electrical: 200,
    hvac: 350,
    carpentry: 180,
    painting: 250,
    general: 80
  }
  
  const multipliers: Record<string, number> = {
    low: 1,
    medium: 1.5,
    high: 2.5,
    emergency: 4
  }
  
  return Math.round(baseCosts[category] * multipliers[priority])
}