'use client'

import { useState, useEffect } from 'react'
import { Ticket } from '@/app/page'
import { cn } from '@/lib/utils'

interface TicketFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (ticket: Omit<Ticket, 'id' | 'createdAt'> & { id?: string }) => void
  initialData?: Ticket | null
}

const categories = ['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General', 'Structural']
const priorities = ['low', 'medium', 'high', 'urgent']
const statuses = ['submitted', 'scheduled', 'in-progress', 'completed', 'cancelled']

export default function TicketForm({ isOpen, onClose, onSubmit, initialData }: TicketFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'General',
    priority: 'medium' as const,
    status: 'submitted' as const,
    unitNumber: '',
    tenantName: '',
    estimatedCost: 0,
    contractorName: '',
    preferredDate: '',
    timeSlot: '',
    applianceType: '',
    hvacIssue: '',
    plumbingType: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        priority: initialData.priority,
        status: initialData.status,
        unitNumber: initialData.unitNumber,
        tenantName: initialData.tenantName,
        estimatedCost: initialData.estimatedCost,
        contractorName: initialData.contractorName || '',
        preferredDate: '',
        timeSlot: '',
        applianceType: initialData.details?.applianceType || '',
        hvacIssue: initialData.details?.hvacIssue || '',
        plumbingType: initialData.details?.plumbingType || '',
      })
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'General',
        priority: 'medium',
        status: 'submitted',
        unitNumber: '',
        tenantName: '',
        estimatedCost: 0,
        contractorName: '',
        preferredDate: '',
        timeSlot: '',
        applianceType: '',
        hvacIssue: '',
        plumbingType: '',
      })
    }
    setErrors({})
  }, [initialData, isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.unitNumber.trim()) newErrors.unitNumber = 'Unit number is required'
    if (!formData.tenantName.trim()) newErrors.tenantName = 'Tenant name is required'
    if (formData.estimatedCost < 0) newErrors.estimatedCost = 'Cost cannot be negative'
    
    if (formData.category === 'Appliance' && !formData.applianceType) {
      newErrors.applianceType = 'Please specify the appliance type'
    }
    if (formData.category === 'HVAC' && !formData.hvacIssue) {
      newErrors.hvacIssue = 'Please specify the HVAC issue type'
    }
    if (formData.category === 'Plumbing' && !formData.plumbingType) {
      newErrors.plumbingType = 'Please specify the plumbing issue'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setTimeout(() => {
      onSubmit({
        id: initialData?.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        status: formData.status,
        unitNumber: formData.unitNumber,
        tenantName: formData.tenantName,
        estimatedCost: formData.estimatedCost,
        contractorName: formData.contractorName,
        photos: [],
        details: {
          applianceType: formData.applianceType,
          hvacIssue: formData.hvacIssue,
          plumbingType: formData.plumbingType,
        },
        preferredDate: formData.preferredDate,
        timeSlot: formData.timeSlot,
      })
      setIsSubmitting(false)
      onClose()
    }, 500)
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#1e293b] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {initialData ? 'Edit Maintenance Request' : 'New Maintenance Request'}
          </h2>
          <p className="text-white/60 mt-1">Fill in the details below to {initialData ? 'update' : 'submit'} your request</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Request Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g., Leaking faucet in kitchen"
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.title ? 'border-red-500' : 'border-white/10'
                )}
              />
              {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Category <span className="text-red-400">*</span></label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                {categories.map(cat => <option key={cat} value={cat} className="bg-[#1e293b]">{cat}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Unit Number <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.unitNumber}
                onChange={(e) => handleChange('unitNumber', e.target.value)}
                placeholder="e.g., 304"
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.unitNumber ? 'border-red-500' : 'border-white/10'
                )}
              />
              {errors.unitNumber && <p className="text-red-400 text-xs">{errors.unitNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Tenant Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={formData.tenantName}
                onChange={(e) => handleChange('tenantName', e.target.value)}
                placeholder="e.g., Sarah Chen"
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.tenantName ? 'border-red-500' : 'border-white/10'
                )}
              />
              {errors.tenantName && <p className="text-red-400 text-xs">{errors.tenantName}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Priority <span className="text-red-400">*</span></label>
              <select
                value={formData.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                {priorities.map(p => <option key={p} value={p} className="bg-[#1e293b]">{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                {statuses.map(s => <option key={s} value={s} className="bg-[#1e293b]">{s.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Estimated Cost ($)</label>
              <input
                type="number"
                value={formData.estimatedCost}
                onChange={(e) => handleChange('estimatedCost', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                min="0"
                step="0.01"
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.estimatedCost ? 'border-red-500' : 'border-white/10'
                )}
              />
              {errors.estimatedCost && <p className="text-red-400 text-xs">{errors.estimatedCost}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Contractor</label>
              <input
                type="text"
                value={formData.contractorName}
                onChange={(e) => handleChange('contractorName', e.target.value)}
                placeholder="e.g., Mike's Plumbing"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
          </div>

          {/* Category-specific fields */}
          {formData.category === 'Appliance' && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-medium text-white">Appliance Type <span className="text-red-400">*</span></label>
              <select
                value={formData.applianceType}
                onChange={(e) => handleChange('applianceType', e.target.value)}
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.applianceType ? 'border-red-500' : 'border-white/10'
                )}
              >
                <option value="" className="bg-[#1e293b]">Select appliance...</option>
                <option value="refrigerator" className="bg-[#1e293b]">Refrigerator</option>
                <option value="dishwasher" className="bg-[#1e293b]">Dishwasher</option>
                <option value="washer" className="bg-[#1e293b]">Washing Machine</option>
                <option value="dryer" className="bg-[#1e293b]">Dryer</option>
                <option value="oven" className="bg-[#1e293b]">Oven/Range</option>
                <option value="microwave" className="bg-[#1e293b]">Microwave</option>
              </select>
              {errors.applianceType && <p className="text-red-400 text-xs">{errors.applianceType}</p>}
            </div>
          )}

          {formData.category === 'HVAC' && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-medium text-white">HVAC Issue Type <span className="text-red-400">*</span></label>
              <select
                value={formData.hvacIssue}
                onChange={(e) => handleChange('hvacIssue', e.target.value)}
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.hvacIssue ? 'border-red-500' : 'border-white/10'
                )}
              >
                <option value="" className="bg-[#1e293b]">Select issue...</option>
                <option value="no-heat" className="bg-[#1e293b]">No Heat</option>
                <option value="no-cool" className="bg-[#1e293b]">No Cooling</option>
                <option value="noise" className="bg-[#1e293b]">Strange Noise</option>
                <option value="leak" className="bg-[#1e293b]">Water Leak</option>
                <option value="thermostat" className="bg-[#1e293b]">Thermostat Issue</option>
              </select>
              {errors.hvacIssue && <p className="text-red-400 text-xs">{errors.hvacIssue}</p>}
            </div>
          )}

          {formData.category === 'Plumbing' && (
            <div className="space-y-2 animate-fade-in-up">
              <label className="text-sm font-medium text-white">Plumbing Issue <span className="text-red-400">*</span></label>
              <select
                value={formData.plumbingType}
                onChange={(e) => handleChange('plumbingType', e.target.value)}
                className={cn(
                  'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50',
                  errors.plumbingType ? 'border-red-500' : 'border-white/10'
                )}
              >
                <option value="" className="bg-[#1e293b]">Select issue...</option>
                <option value="leak" className="bg-[#1e293b]">Leak</option>
                <option value="clog" className="bg-[#1e293b]">Clog/Backup</option>
                <option value="low-pressure" className="bg-[#1e293b]">Low Water Pressure</option>
                <option value="no-water" className="bg-[#1e293b]">No Water</option>
                <option value="toilet" className="bg-[#1e293b]">Toilet Issue</option>
              </select>
              {errors.plumbingType && <p className="text-red-400 text-xs">{errors.plumbingType}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Description <span className="text-red-400">*</span></label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
              className={cn(
                'w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pink-500/50 resize-none',
                errors.description ? 'border-red-500' : 'border-white/10'
              )}
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Preferred Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleChange('preferredDate', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Preferred Time</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => handleChange('timeSlot', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                <option value="" className="bg-[#1e293b]">Select time...</option>
                <option value="morning" className="bg-[#1e293b]">Morning (8AM - 12PM)</option>
                <option value="afternoon" className="bg-[#1e293b]">Afternoon (12PM - 5PM)</option>
                <option value="evening" className="bg-[#1e293b]">Evening (5PM - 8PM)</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all focus-visible"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium py-3 rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                initialData ? 'Update Request' : 'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}