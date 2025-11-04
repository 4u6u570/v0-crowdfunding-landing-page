"use client"

import { DashboardCards } from "@/components/admin/dashboard-cards"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    activeCampaigns: 24,
    completedCampaigns: 156,
    activeProviders: 47,
    activeMerchants: 312,
    monthlyVolume: 5200000,
    newUsers: 189,
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Resumen general del ecosistema de compras colectivas</p>
      </div>

      <DashboardCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h3 className="text-lg font-semibold mb-4 font-heading">Actividad reciente</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Nueva campaña activada</p>
                  <p className="text-sm text-muted-foreground">Hace 2 horas</p>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF7B5F" }} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <h3 className="text-lg font-semibold mb-4 font-heading">Alertas logísticas</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 py-3 border-b border-border">
                <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: "#FFB84D" }} />
                <div className="flex-1">
                  <p className="font-medium text-sm">Pedido #12345 en tránsito</p>
                  <p className="text-xs text-muted-foreground">Llegada esperada: Mañana</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
