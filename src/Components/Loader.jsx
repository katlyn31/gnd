import React from 'react'

export default function Loader() {
  return (
   <div className="flex justify-center items-center">
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-red-500 border-b-red-500 rounded-full animate-spin"></div>
        {/* Inner pulsing dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-red-200 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-red-300 rounded-full animate-pulse delay-150"></div>
          <div className="w-4 h-4 bg-red-400 rounded-full animate-pulse delay-300"></div>
        </div>
        {/* Rotating gradient arc */}
        <div className="absolute inset-0 border-4 border-transparent border-l-red-600 border-r-red-600 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  )
}
