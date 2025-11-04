"use client"

import { useState } from "react"

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <div className="h-16 bg-white border-b border-border px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-[#F5F5F5] rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-sm font-semibold">Admin</h1>
          <p className="text-xs text-muted-foreground">Crowdfunding Platform</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-[#F5F5F5] rounded-lg px-4 py-2">
          <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input type="text" placeholder="Buscar..." className="bg-transparent ml-2 text-sm outline-none w-40" />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-border p-4 z-50">
              <h3 className="font-semibold mb-3">Notificaciones</h3>
              <div className="space-y-2">
                <div className="p-3 bg-[#F5F5F5] rounded-lg text-sm">Nueva campaña completada: Café artesanal</div>
                <div className="p-3 bg-[#F5F5F5] rounded-lg text-sm">Proveedor requiere verificación</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-6 border-l border-border">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF7B5F] to-[#FF3D8A]" />
          <div className="text-sm">
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">Administrador</p>
          </div>
        </div>
      </div>
    </div>
  )
}
