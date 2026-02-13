'use client'

import { useState, useEffect } from 'react'
import { TicketCard } from '@/components/TicketCard'
import { SkeletonCard } from '@/components/SkeletonCard'
import { cn, calculateCostEstimate } from '@/lib/utils'

type Status = 'submitted' | 'in-progress' | 'completed' | 'cancelled'
type Priority = 'low' | 'medium' | 'high' | 'emergency'

interface Ticket {
  id: string
  title: string
  description: string
  unit: string
  tenant: string
  status: Status
  priority: Priority
  category: string
  createdAt: string
  estimatedCost: number
  contractor: string | null
  photos: number
}

const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Leaky Faucet in Kitchen",
    description: "The kitchen faucet in unit 4A has been dripping constantly for three days. Water is collecting in the sink basin and tenant reports increased water bill. Needs washer replacement or cartridge repair.",
    unit: "4A",
    tenant: "Sarah Chen",
    status: "in-progress",
    priority: "medium",
    category: "plumbing",
    createdAt: "2024-03-15",
    estimatedCost: 150,
    contractor: "Mike's Plumbing",
    photos: 2
  },
  {
    id: "2",
    title: "HVAC Not Cooling",
    description: "Air conditioning unit in building B lobby is blowing warm air. Temperature reached 82°F yesterday afternoon. Needs immediate attention before weekend heat wave expected to hit 95°F.",
    unit: "Lobby-B",
    tenant: "Property Management",
    status: "submitted",
    priority: "high",
    category: "hvac",
    createdAt: "2024-03-18",
    estimatedCost: 450,
    contractor: null,
    photos: 1
  },
  {
    id: "3",
    title: "Broken Elevator Button",
    description: "The 3rd floor call button for elevator A is unresponsive. Residents are having to walk to floor 2 or 4 to call the elevator. Button panel likely needs replacement.",
    unit: "Elevator-A",
    tenant: "James Wilson",
    status: "completed",
    priority: "medium",
    category: "electrical",
    createdAt: "2024-03-10",
    estimatedCost: 320,
    contractor: "Elevator Tech Pro",
    photos: 0
  },
  {
    id: "4",
    title: "Parking Lot Light Repair",
    description: "Three LED floodlights in the south parking area are flickering and one is completely out. Creates safety hazard for residents returning after dark. Bulb and ballast check needed.",
    unit: "Parking-South",
    tenant: "Security Office",
    status: "in-progress",
    priority: "high",
    category: "electrical",
    createdAt: "2024-03-17",
    estimatedCost: 280,
    contractor: "Bright Electric",
    photos: 3
  },
  {
    id: "5",
    title: "Garbage Disposal Jammed",
    description: "Unit 2C disposal is humming but not grinding. Tenant accidentally dropped a metal spoon inside. Need to clear obstruction and check for blade damage before resetting unit.",
    unit: "2C",
    tenant: "Maria Rodriguez",
    status: "submitted",
    priority: "low",
    category: "plumbing",
    createdAt: "2024-03-19",
    estimatedCost: 85,
    contractor: null,
    photos: 0
  },
  {
    id: "6",
    title: "Window Seal Replacement",
    description: "Master bedroom window in unit 5B has broken seal causing condensation between panes. Tenant reports draft and increased heating costs. Full sash replacement recommended.",
    unit: "5B",
    tenant: "David Park",
    status: "submitted",
    priority: "medium",
    category: "carpentry",
    createdAt: "2024-03-14",
    estimatedCost: 425,
    contractor: null,
    photos: 2
  },
  {
    id: "7",
    title: "Carpet Water Damage",
    description: "Water heater leak in unit 3A caused staining on hallway carpet. Area is approximately 4x6 feet. Needs extraction, drying, and potential replacement to prevent mold growth.",
    unit: "3A",
    tenant: "Lisa Thompson",
    status: "in-progress",
    priority: "high",
    category: "general",
    createdAt: "2024-03-16",
    estimatedCost: 650,
    contractor: "CleanPro Restoration",
    photos: 4
  },
  {
    id: "8",
    title: "Electrical Outlet Sparking",
    description: "Kitchen outlet in unit 6C is sparking when plugging in appliances. Burning smell reported. Immediate attention required to prevent fire hazard. Circuit breaker stays tripped.",
    unit: "6C",
    tenant: "Robert Kim",
    status: "submitted",
    priority: "emergency",
    category: "electrical",
    createdAt: "2024-03-19",
    estimatedCost: 200,
    contractor: null,
    photos: 1
  },
  {
    id: "9",
    title: "Toilet Running Continuously",
    description: "Master bath toilet in unit 1B won't stop running. Flapper valve likely needs replacement. Tenant has been turning water off at wall valve between uses to prevent waste.",
    unit: "1B",
    tenant: "Amanda Foster",
    status: "completed",
    priority: "low",
    category: "plumbing",
    createdAt: "2024-03-12",
    estimatedCost: 75,
    contractor: "Mike's Plumbing",
    photos: 0
  },
  {
    id: "10",
    title: "Front Door Lock Replacement",
    description: "Key is sticking in unit 4D deadbolt and tenant is concerned about getting locked out. Lock cylinder needs replacement. Tenant prefers smart lock upgrade if available.",
    unit: "4D",
    tenant: "Kevin O'Brien",
    status: "in-progress",
    priority: "medium",
    category: "carpentry",
    createdAt: "2024-03-17",
    estimatedCost: 180,
    contractor: "Secure Lock Services",
    photos: 1
  },
  {
    id: "11",
    title: "Drywall Repair",
    description: "Tenant accidentally damaged wall while moving furniture. Hole is approximately 8 inches in living room. Needs patch, mud, texture match, and paint to match existing eggshell finish.",
    unit: "2F",
    tenant: "Jessica Lee",
    status: "submitted",
    priority: "low",
    category: "painting",
    createdAt: "2024-03-18",
    estimatedCost: 275,
    contractor: null,
    photos: 2
  },
  {
    id: "12",
    title: "Pest Control Treatment",
    description: "Ants spotted in kitchen and bathroom of unit 7A. Tenant reports trail coming from under baseboard. Needs interior treatment and exterior perimeter spray to prevent entry.",
    unit: "7A",
    tenant: "Michael Brown",
    status: "in-progress",
    priority: "medium",
    category: "general",
    createdAt: "2024-03-16",
    estimatedCost: 145,
    contractor: "Bug Free Pest Control",
    photos: 1
  },
  {
    id: "13",
    title: "Smoke Detector Battery",
    description: "Chirping sound from hallway smoke detector in unit 8B. Battery replacement needed. Tenant cannot reach ceiling with ladder. Also test all detectors while on site.",
    unit: "8B",
    tenant: "Susan Martinez",
    status: "completed",
    priority: "low",
    category: "electrical",
    createdAt: "2024-03-13",
    estimatedCost: 50,
    contractor: "Maintenance Staff",
    photos: 0
  },
  {
    id: "14",
    title: "Balcony Railing Loose",
    description: "Top rail of balcony in unit 5C is wobbling when leaned on. Safety concern for tenant with small children. Bracket bolts appear corroded and need replacement and tightening.",
    unit: "5C",
    tenant: "Christopher Davis",
    status: "submitted",
    priority: "high",
    category: "carpentry",
    createdAt: "2024-03-19",
    estimatedCost: 220,
    contractor: null,
    photos: 2
  },
  {
    id: "15",
    title: "Intercom System Malfunction",
    description: "Lobby intercom not buzzing units when visitors dial. System is 15 years old and may need complete replacement. Several residents reporting they cannot grant entry remotely.",
    unit: "Lobby-A",
    tenant: "Property Management",
    status: "in-progress",
    priority: "high",
    category: "electrical",
    createdAt: "2024-03-15",
    estimatedCost: 1200,
    contractor: "Tech Systems Inc",
    photos: 1
  }
]

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'settings'>('home')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'cost'>('date')
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [userName, setUserName] = useState('Alex Johnson')
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unit: '',
    tenant: '',
    category: 'plumbing',
    priority: 'medium' as Priority
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem('fixflow-tickets')
    const savedDark = localStorage.getItem('fixflow-darkmode')
    const savedName = localStorage.getItem('fixflow-username')
    
    if (saved) {
      try {
        setTickets(JSON.parse(saved))
      } catch {
        setTickets(initialTickets)
      }
    } else {
      setTickets(initialTickets)
    }
    
    if (savedDark) setDarkMode(JSON.parse(savedDark))
    if (savedName) setUserName(savedName)
    
    setTimeout(() => setLoading(false), 800)
  }, [])
  
  useEffect(() => {
    if (tickets.length > 0) {
      localStorage.setItem('fixflow-tickets', JSON.stringify(tickets))
    }
  }, [tickets])
  
  useEffect(() => {
    localStorage.setItem('fixflow-darkmode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  
  useEffect(() => {
    localStorage.setItem('fixflow-username', userName)
  }, [userName])
  
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [toast])
  
  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.unit.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    if (sortBy === 'cost') return b.estimatedCost - a.estimatedCost
    if (sortBy === 'priority') {
      const priorityOrder = { emergency: 4, high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    return 0
  })
  
  const handleDelete = (id: string) => {
    setDeletingId(id)
    setTimeout(() => {
      setTickets(prev => prev.filter(t => t.id !== id))
      setDeletingId(null)
      setToast({ message: 'Ticket deleted successfully', type: 'success' })
    }, 300)
  }
  
  const handleStatusChange = (id: string, newStatus: Status) => {
    setTickets(prev => prev.map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    ))
    setToast({ message: `Status updated to ${newStatus}`, type: 'success' })
  }
  
  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.title.trim()) errors.title = 'Title is required'
    if (!formData.description.trim()) errors.description = 'Description is required'
    if (!formData.unit.trim()) errors.unit = 'Unit is required'
    if (!formData.tenant.trim()) errors.tenant = 'Tenant name is required'
    if (formData.description.length < 10) errors.description = 'Description must be at least 10 characters'
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      const newTicket: Ticket = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        unit: formData.unit,
        tenant: formData.tenant,
        status: 'submitted',
        priority: formData.priority,
        category: formData.category,
        createdAt: new Date().toISOString().split('T')[0],
        estimatedCost: calculateCostEstimate(formData.category, formData.priority),
        contractor: null,
        photos: 0
      }
      
      setTickets(prev => [newTicket, ...prev])
      setFormData({
        title: '',
        description: '',
        unit: '',
        tenant: '',
        category: 'plumbing',
        priority: 'medium'
      })
      setShowForm(false)
      setIsSubmitting(false)
      setToast({ message: 'New ticket created successfully', type: 'success' })
    }, 600)
  }
  
  const handleExport = () => {
    const dataStr = JSON.stringify(tickets, null, 2)
    navigator.clipboard.writeText(dataStr)
    setToast({ message: 'Data copied to clipboard', type: 'success' })
  }
  
  const stats = {
    total: tickets.length,
    completed: tickets.filter(t => t.status === 'completed').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    submitted: tickets.filter(t => t.status === 'submitted').length,
    completionRate: tickets.length > 0 ? Math.round((tickets.filter(t => t.status === 'completed').length / tickets.length) * 100) : 0,
    totalCost: tickets.reduce((sum, t) => sum + t.estimatedCost, 0)
  }
  
  const recentActivity = tickets.slice(0, 5)
  
  return (
    <div className={cn("min-h-screen", darkMode ? "dark bg-gray-900" : "bg-[#FFFEF0]")}>
      <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[4px_4px_0_0_#000]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF6B6B] border-4 border-black flex items-center justify-center">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h1 className="text-2xl font-black tracking-tight">FIXFLOW</h1>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('home')}
                className={cn(
                  "px-4 py-2 font-bold border-4 border-black transition-all",
                  activeTab === 'home' ? "bg-[#FF6B6B] shadow-[4px_4px_0_0_#000]" : "bg-white hover:bg-gray-100"
                )}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  "px-4 py-2 font-bold border-4 border-black transition-all",
                  activeTab === 'dashboard' ? "bg-[#FF6B6B] shadow-[4px_4px_0_0_#000]" : "bg-white hover:bg-gray-100"
                )}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={cn(
                  "px-4 py-2 font-bold border-4 border-black transition-all",
                  activeTab === 'settings' ? "bg-[#FF6B6B] shadow-[4px_4px_0_0_#000]" : "bg-white hover:bg-gray-100"
                )}
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {toast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slide-in">
          <div className={cn(
            "px-6 py-4 border-4 border-black shadow-[8px_8px_0_0_#000] font-bold",
            toast.type === 'success' ? "bg-green-400" : "bg-red-400"
          )}>
            {toast.message}
          </div>
        </div>
      )}
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8 fade-in-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-black mb-2">Maintenance Tickets</h2>
                <p className="text-gray-600 font-medium">Manage and track property maintenance requests</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="btn-brutal bg-[#FF6B6B] text-black"
              >
                {showForm ? 'Cancel' : '+ New Ticket'}
              </button>
            </div>
            
            {showForm && (
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] fade-in-up">
                <h3 className="font-black text-xl mb-6">Create New Ticket</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-2 text-sm uppercase">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Leaky Faucet in Kitchen"
                        className={cn("w-full input-brutal", formErrors.title && "border-red-500")}
                      />
                      {formErrors.title && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.title}</p>}
                    </div>
                    
                    <div>
                      <label className="block font-bold mb-2 text-sm uppercase">Unit Number</label>
                      <input
                        type="text"
                        value={formData.unit}
                        onChange={(e) => setFormData({...formData, unit: e.target.value})}
                        placeholder="e.g., 4A"
                        className={cn("w-full input-brutal", formErrors.unit && "border-red-500")}
                      />
                      {formErrors.unit && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.unit}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block font-bold mb-2 text-sm uppercase">Tenant Name</label>
                    <input
                      type="text"
                      value={formData.tenant}
                      onChange={(e) => setFormData({...formData, tenant: e.target.value})}
                      placeholder="e.g., Sarah Chen"
                      className={cn("w-full input-brutal", formErrors.tenant && "border-red-500")}
                    />
                    {formErrors.tenant && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.tenant}</p>}
                  </div>
                  
                  <div>
                    <label className="block font-bold mb-2 text-sm uppercase">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the issue in detail including location, duration, and any relevant details..."
                      rows={3}
                      className={cn("w-full input-brutal resize-none", formErrors.description && "border-red-500")}
                    />
                    {formErrors.description && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.description}</p>}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold mb-2 text-sm uppercase">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full input-brutal"
                      >
                        <option value="plumbing">Plumbing</option>
                        <option value="electrical">Electrical</option>
                        <option value="hvac">HVAC</option>
                        <option value="carpentry">Carpentry</option>
                        <option value="painting">Painting</option>
                        <option value="general">General</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block font-bold mb-2 text-sm uppercase">Priority</label>
                      <select
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value as Priority})}
                        className="w-full input-brutal"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-brutal bg-[#FF6B6B] text-black disabled:opacity-50"
                    >
                      {isSubmitting ? 'Creating...' : 'Create Ticket'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-3 border-4 border-black font-bold uppercase hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search tickets, tenants, or units..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full input-brutal"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input-brutal sm:w-48"
              >
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="cost">Sort by Cost</option>
              </select>
            </div>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : sortedTickets.length === 0 ? (
              <div className="text-center py-16 bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="font-black text-xl mb-2">No tickets found</h3>
                <p className="text-gray-600 mb-4 font-medium">Get started by creating your first maintenance request</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-brutal bg-[#FF6B6B] text-black"
                >
                  Add Your First Ticket
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    deletingId={deletingId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'dashboard' && (
          <div className="space-y-8 fade-in-up">
            <h2 className="font-black mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
                <p className="text-sm font-bold uppercase text-gray-500 mb-2">Total Tickets</p>
                <p className="text-4xl font-black">{stats.total}</p>
              </div>
              <div className="bg-green-400 border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
                <p className="text-sm font-bold uppercase text-black mb-2">Completion Rate</p>
                <p className="text-4xl font-black">{stats.completionRate}%</p>
              </div>
              <div className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
                <p className="text-sm font-bold uppercase text-black mb-2">In Progress</p>
                <p className="text-4xl font-black">{stats.inProgress}</p>
              </div>
              <div className="bg-[#FF6B6B] border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
                <p className="text-sm font-bold uppercase text-black mb-2">Total Value</p>
                <p className="text-4xl font-black">${stats.totalCost.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
              <h3 className="font-black text-xl mb-6">Status Pipeline</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2 font-bold">
                    <span>Submitted</span>
                    <span>{stats.submitted}</span>
                  </div>
                  <div className="h-8 bg-gray-200 border-2 border-black">
                    <div 
                      className="h-full bg-blue-400 border-r-2 border-black transition-all duration-500"
                      style={{ width: `${stats.total > 0 ? (stats.submitted / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 font-bold">
                    <span>In Progress</span>
                    <span>{stats.inProgress}</span>
                  </div>
                  <div className="h-8 bg-gray-200 border-2 border-black">
                    <div 
                      className="h-full bg-yellow-400 border-r-2 border-black transition-all duration-500"
                      style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 font-bold">
                    <span>Completed</span>
                    <span>{stats.completed}</span>
                  </div>
                  <div className="h-8 bg-gray-200 border-2 border-black">
                    <div 
                      className="h-full bg-green-400 border-r-2 border-black transition-all duration-500"
                      style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
              <h3 className="font-black text-xl mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-[#FFFEF0] border-2 border-black">
                    <div>
                      <p className="font-bold">{ticket.title}</p>
                      <p className="text-sm text-gray-600">{ticket.tenant} • {ticket.unit}</p>
                    </div>
                    <span className={cn(
                      "px-3 py-1 border-2 border-black text-xs font-bold uppercase",
                      ticket.status === 'completed' ? 'bg-green-400' : 
                      ticket.status === 'in-progress' ? 'bg-yellow-400' : 'bg-blue-400'
                    )}>
                      {ticket.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-8 fade-in-up">
            <h2 className="font-black mb-6">Settings</h2>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] space-y-6">
              <div>
                <label className="block font-bold mb-2 text-sm uppercase">Display Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full input-brutal"
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#FFFEF0] border-2 border-black">
                <div>
                  <p className="font-bold">Dark Mode</p>
                  <p className="text-sm text-gray-600">Toggle dark color scheme</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={cn(
                    "w-14 h-8 border-4 border-black relative transition-colors",
                    darkMode ? "bg-[#FF6B6B]" : "bg-gray-300"
                  )}
                >
                  <div className={cn(
                    "absolute top-0.5 w-6 h-6 bg-white border-2 border-black transition-transform",
                    darkMode ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </button>
              </div>
              
              <div className="pt-4 border-t-4 border-black">
                <h3 className="font-bold mb-4">Data Management</h3>
                <button
                  onClick={handleExport}
                  className="btn-brutal bg-blue-400 text-black w-full"
                >
                  Export Data to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}