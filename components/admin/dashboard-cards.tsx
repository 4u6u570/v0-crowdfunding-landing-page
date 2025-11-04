"use client"

import { Card } from "@/components/ui/card"

export function DashboardCards({ stats }: any) {
  const cards = [
    {
      title: "Campañas activas",
      value: stats.activeCampaigns,
      icon: "📦",
      trend: "+12%",
      color: "#FF7B5F",
    },
    {
      title: "Campañas completadas",
      value: stats.completedCampaigns,
      icon: "✅",
      trend: "+8%",
      color: "#2ECC71",
    },
    {
      title: "Proveedores activos",
      value: stats.activeProviders,
      icon: "🏭",
      trend: "+5%",
      color: "#FF3D8A",
    },
    {
      title: "Comerciantes",
      value: stats.activeMerchants,
      icon: "🏪",
      trend: "+24%",
      color: "#4169E1",
    },
    {
      title: "Volumen mensual",
      value: `$${(stats.monthlyVolume / 1000000).toFixed(1)}M`,
      icon: "💰",
      trend: "+15%",
      color: "#FFB84D",
    },
    {
      title: "Usuarios nuevos",
      value: stats.newUsers,
      icon: "👥",
      trend: "+18%",
      color: "#9B59B6",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <Card key={i} className="p-6 rounded-xl border-2" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
          <div className="flex items-start justify-between mb-4">
            <div className="text-3xl">{card.icon}</div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-lg">{card.trend}</span>
          </div>
          <p className="text-muted-foreground text-sm mb-1">{card.title}</p>
          <h3 className="text-2xl font-bold font-heading">{card.value}</h3>
        </Card>
      ))}
    </div>
  )
}
