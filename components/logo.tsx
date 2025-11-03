"use client"

import { useState } from "react"

export function Logo({ className = "" }: { className?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${isHovered ? "translate-y-[-2px]" : ""}`}
      >
        <defs>
          <linearGradient id="chalanaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7B5F" />
            <stop offset="100%" stopColor="#FF3D8A" />
          </linearGradient>
        </defs>
        {/* Chalana boat body - simplified geometric shape */}
        <path
          d="M8 24 L12 18 L28 18 L32 24 L30 28 L10 28 Z"
          fill="url(#chalanaGradient)"
          style={{ borderRadius: "4px" }}
        />
        {/* Boat deck */}
        <rect x="10" y="16" width="20" height="3" rx="1.5" fill="url(#chalanaGradient)" opacity="0.8" />
        {/* Two abstract figures representing cooperation */}
        <circle cx="16" cy="14" r="2.5" fill="url(#chalanaGradient)" />
        <path
          d="M16 16.5 L16 21 M14 19 L18 19"
          stroke="url(#chalanaGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="14" r="2.5" fill="url(#chalanaGradient)" />
        <path
          d="M24 16.5 L24 21 M22 19 L26 19"
          stroke="url(#chalanaGradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-medium text-[#1E1E1E]" style={{ fontFamily: "Poppins, sans-serif" }}>
        Crowdfund
      </span>
    </div>
  )
}
