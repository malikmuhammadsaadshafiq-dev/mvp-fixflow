'use client'

import { Ticket } from '@/app/page'
import { formatCurrency } from '@/lib/utils'

interface DashboardStatsProps {
  tickets: Ticket[]
}

export default function DashboardStats({ tickets }: DashboardStatsProps) {
  const totalTickets = tickets.length
  const completedTickets = tickets.filter(t => t.status === 'completed').length
  const completionRate = totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0
  const totalCost = tickets.reduce((sum, t) => sum + t.estimatedCost, 0)
  const urgentTickets = tickets.filter(t => t.priority === 'urgent' && t.status !== 'completed').length

  const statusCounts = {
    submitted: tickets.filter(t => t.status === 'submitted').length,
    scheduled: tickets.filter(t => t.status === 'scheduled').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    completed: completedTickets,
  }

  const recentActivity = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl border border-white/[.1] p-6 lg:col-span-2">
          <p className="text-white/60 text-sm font-medium mb-2">Total Active Requests</p>
          <p className="text-4xl font-bold text-white tracking-tight">{totalTickets}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-emerald-400 text-sm font-medium">{completionRate}%</span>
            <span className="text-white/50 text-sm">completion rate</span>
          </div>
        </div>

        <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl border border-white/[.1] p-6">
          <p className="text-white/60 text-sm font-medium mb-2">Total Est. Value</p>
          <p className="text-3xl font-bold text-white tracking-tight">{formatCurrency(totalCost)}</p>
          <p className="text-white/40 text-xs mt-2">Across all requests</p>
        </div>

        <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl border border-white/[.1] p-6">
          <p className="text-white/60 text-sm font-medium mb-2">Urgent Issues</p>
          <p className="text-3xl font-bold text-red-400 tracking-tight">{urgentTickets}</p>
          <p className="text-white/40 text-xs mt-2">Require immediate attention</p>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl border border-white/[.1] p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Status Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-4">
            <p className="text-pink-300 text-2xl font-bold">{statusCounts.submitted}</p>
            <p className="text-white/60 text-sm">Submitted</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
            <p className="text-cyan-300 text-2xl font-bold">{statusCounts.scheduled}</p>
            <p className="text-white/60 text-sm">Scheduled</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <p className="text-purple-300 text-2xl font-bold">{statusCounts.inProgress}</p>
            <p className="text-white/60 text-sm">In Progress</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-emerald-300 text-2xl font-bold">{statusCounts.completed}</p>
            <p className="text-white/60 text-sm">Completed</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/[.07] backdrop-blur-xl rounded-2xl border border-white/[.1] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <p className="text-white/50 text-center py-8">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {recentActivity.map((ticket, idx) => (
              <div key={ticket.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white font-medium">{ticket.title}</p>
                  <p className="text-white/50 text-sm">{ticket.tenantName} • Unit {ticket.unitNumber}</p>
                </div>
                <span className="text-white/40 text-sm">{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}