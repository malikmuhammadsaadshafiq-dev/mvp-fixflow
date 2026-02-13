'use client'

import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: 'submitted' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'emergency'
}

export function StatusBadge({ status, priority }: StatusBadgeProps) {
  const statusColors = {
    submitted: 'bg-blue-400',
    'in-progress': 'bg-yellow-400',
    completed: 'bg-green-400',
    cancelled: 'bg-gray-400'
  }
  
  const priorityColors = {
    low: 'border-gray-400',
    medium: 'border-orange-400',
    high: 'border-red-500',
    emergency: 'border-purple-600'
  }
  
  return (
    <div className="flex flex-col gap-1">
      <span className={cn(
        "px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-wide",
        statusColors[status]
      )}>
        {status.replace('-', ' ')}
      </span>
      <span className={cn(
        "px-3 py-1 border-2 border-black text-xs font-bold uppercase text-center",
        priority === 'emergency' ? 'bg-red-100' : 'bg-white',
        priorityColors[priority]
      )}>
        {priority}
      </span>
    </div>
  )
}