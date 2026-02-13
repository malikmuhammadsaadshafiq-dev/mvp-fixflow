'use client'

export function SkeletonCard() {
  return (
    <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
      <div className="flex justify-between items-start mb-4">
        <div className="w-2/3">
          <div className="h-6 bg-gray-200 skeleton-shimmer mb-2 w-full"></div>
          <div className="h-4 bg-gray-200 skeleton-shimmer w-1/2"></div>
        </div>
        <div className="w-16 h-12 bg-gray-200 skeleton-shimmer"></div>
      </div>
      
      <div className="h-4 bg-gray-200 skeleton-shimmer mb-4 w-full"></div>
      <div className="h-4 bg-gray-200 skeleton-shimmer mb-4 w-3/4"></div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="h-12 bg-gray-200 skeleton-shimmer border-2 border-black"></div>
        <div className="h-12 bg-gray-200 skeleton-shimmer border-2 border-black"></div>
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1 h-10 bg-gray-200 skeleton-shimmer border-2 border-black"></div>
        <div className="flex-1 h-10 bg-gray-200 skeleton-shimmer border-2 border-black"></div>
        <div className="w-12 h-10 bg-gray-200 skeleton-shimmer border-2 border-black"></div>
      </div>
    </div>
  )
}