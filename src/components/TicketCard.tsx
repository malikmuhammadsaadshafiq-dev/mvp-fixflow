'use client'

import { useState } from 'react'
import { cn, formatDate } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'

interface Ticket {
  id: string
  title: string
  description: string
  unit: string
  tenant: string
  status: 'submitted' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'emergency'
  category: string
  createdAt: string
  estimatedCost: number
  contractor: string | null
  photos: number
}

interface TicketCardProps {
  ticket: Ticket
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Ticket['status']) => void
  deletingId: string | null
}

export function TicketCard({ ticket, onDelete, onStatusChange, deletingId }: TicketCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const isDeleting = deletingId === ticket.id
  
  return (
    <article 
      className={cn(
        "bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] transition-all duration-300",
        "hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover:translate-x-1",
        isDeleting && "opacity-0 -translate-x-full scale-95",
        "fade-in-up"
      )}
      style={{ animationDelay: `${Math.random() * 0.3}s` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-black text-xl mb-1 leading-tight">{ticket.title}</h3>
          <p className="text-sm font-medium text-gray-600">{ticket.unit} • {ticket.tenant}</p>
        </div>
        <StatusBadge status={ticket.status} priority={ticket.priority} />
      </div>
      
      <p className="text-sm mb-4 line-clamp-2 font-medium text-gray-800">
        {ticket.description}
      </p>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="bg-gray-50 border-2 border-black p-2">
          <span className="block text-xs font-bold uppercase text-gray-500">Category</span>
          <span className="font-bold capitalize">{ticket.category}</span>
        </div>
        <div className="bg-gray-50 border-2 border-black p-2">
          <span className="block text-xs font-bold uppercase text-gray-500">Est. Cost</span>
          <span className="font-bold">${ticket.estimatedCost}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-4">
        <span>Submitted {formatDate(ticket.createdAt)}</span>
        {ticket.photos > 0 && (
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {ticket.photos} photos
          </span>
        )}
      </div>
      
      {isExpanded && (
        <div className="mb-4 p-3 bg-[#FFFEF0] border-2 border-black">
          <p className="text-sm font-medium">{ticket.description}</p>
          {ticket.contractor && (
            <p className="mt-2 text-sm font-bold">Assigned: {ticket.contractor}</p>
          )}
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 bg-gray-100 border-4 border-black font-bold text-sm uppercase py-2 hover:bg-gray-200 transition-colors active:scale-95"
        >
          {isExpanded ? 'Less' : 'Details'}
        </button>
        
        {ticket.status !== 'completed' && ticket.status !== 'cancelled' && (
          <button
            onClick={() => onStatusChange(ticket.id, ticket.status === 'submitted' ? 'in-progress' : 'completed')}
            className="flex-1 bg-green-400 border-4 border-black font-bold text-sm uppercase py-2 hover:bg-green-500 transition-colors active:scale-95"
          >
            {ticket.status === 'submitted' ? 'Start' : 'Complete'}
          </button>
        )}
        
        <button
          onClick={() => onDelete(ticket.id)}
          className="px-3 bg-red-400 border-4 border-black font-bold text-sm uppercase hover:bg-red-500 transition-colors active:scale-95"
          aria-label="Delete ticket"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </article>
  )
}